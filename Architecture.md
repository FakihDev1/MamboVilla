Definitions

- OTAs - Online Travel Agencies such as Booking.com, Airbnb
- Channel Manager - a piece of software that sits between your hotel and all the online travel agencies. Keeps your availability, rates, and reservations in sync across all of them automatically
- Commit - the moment a database makes all the changes in a transaction permanent and visible to everyone.
- Outbox table - just a regular database table where you store "messages you still need to send" — instead of sending them immediately. It's your to-do list for external calls (like notifying the channel manager), living right inside your own database.

# Higher Level

```mermaid
flowchart TB
    subgraph Channels["👤 Booking Channels"]
        Web["Website Guest"]
        OTA["OTAs<br/>Booking.com · Airbnb"]
        Desk["Front Desk<br/>(walk-ins)"]
    end

    subgraph Core["⚙️ Booking System"]
        API["Booking API"]
        Avail["Availability + Hold Engine"]
        Pay["Payment Service"]
        Notify["Notifications<br/>Email / SMS"]
    end

    subgraph Data["🗄️ Data"]
        PG[("Postgres<br/>SOURCE OF TRUTH")]
        Redis[("Redis<br/>holds")]
    end

    CM["🔁 Channel Manager"]
    Stripe["💳 Stripe"]
    Local["📱 Pesapal / M-Pesa"]

    Web --> API
    Desk --> API
    OTA <--> CM
    CM <-->|push availability<br/>pull reservations| API

    API --> Avail
    API --> Pay
    API --> Notify
    Avail --> PG
    Avail --> Redis
    Pay --> Stripe
    Pay --> Local
    API --> PG
```

# Availability + Hold Engine (Our Website Only)

```mermaid
sequenceDiagram
    participant G as Guest
    participant AV as Availability + Hold Engine
    participant R as Redis (holds)
    participant DB as Postgres (truth)

    Note over G,DB: 1️⃣ SEARCH — what's actually free?
    G->>AV: Rooms for 12–15 Jul?
    AV->>DB: booked rooms for those dates
    AV->>R: active holds for those dates
    AV-->>G: free = all − booked − held ✅

    Note over G,DB: 2️⃣ SELECT — soft-lock while they checkout
    G->>AV: I'll take Room 4
    AV->>R: SET hold Room4 NX EX 900 ✅
    AV-->>G: held for 15 min — go pay

    Note over G,DB: 3️⃣ CONFIRM — DB is the real gate
    G->>AV: Payment done, confirm
    AV->>DB: BEGIN · insert Room4 (exclusion constraint) · COMMIT ✅
    AV->>R: DEL hold Room4 (no longer needed)
    AV-->>G: 🎉 Booking confirmed

    Note over R: ⏰ If guest never confirms,<br/>hold auto-expires → room free again
```

- holds could live in Postgres, but Redis is a much better fit for this specific job. The key reason: a hold is temporary, high-churn, throwaway data — and Redis is built exactly for that
- OTAs don't use this mechanism, we only receive from the OTAs once the place is booked. So we skip the hold entirely and go straight to writing the confirmed booking into Postgres
- **This means OTA bookings win every time, since they have already been confirmed.**

# Booking Flows

**Push Availability to OTA**

```mermaid
sequenceDiagram
    participant Guest as Website / Front Desk
    participant API as Booking API
    participant DB as Postgres (truth)
    participant CM as Channel Manager
    participant OTA as Booking.com · Airbnb

    Guest->>API: Book Room 4, 12–15 Jul
    API->>DB: Confirm booking, decrement availability
    API->>CM: PUSH "Room 4 unavailable 12–15 Jul"
    CM->>OTA: Update availability/rates
    OTA-->>CM: Acknowledged
    Note over OTA: Room 4 now closed on all OTAs
```

**Pull Availability from OTA**

```mermaid
sequenceDiagram
    participant OTA as Booking.com · Airbnb
    participant CM as Channel Manager
    participant API as Booking API
    participant DB as Postgres (truth)

    OTA->>CM: Guest books Room 7, 20–22 Jul
    CM->>API: POST /webhooks/reservation
    API->>DB: Insert booking, decrement Room 7
    API->>CM: PUSH "Room 7 unavailable" (close on other OTAs)
    DB-->>API: Done
```

**Notes**

- Update the database first, then notify the channel manager
- Push can fail but it shouldn't block the user. Notify the user and enqueue the channel manager to push in the background for retires
- Make sure any DB updates are sync calls, we can't continue until we get DB write confirmation

```mermaid
flowchart LR
    P0["Phase 0<br/>Foundations<br/>routing · DB · CMS"] --> P1["Phase 1<br/>Booking Engine<br/>reserve-only"]
    P1 --> P2["Phase 2<br/>Admin + Walk-ins"]
    P2 --> P3["Phase 3<br/>OTA Sync"]
    P3 --> P4["Phase 4<br/>Payments<br/>Stripe → M-Pesa"]
    P4 --> P5["Phase 5<br/>Accounts · Reviews · SMS"]
```

# Race Conditions

**Two bookings, same room, same instant**

```mermaid
sequenceDiagram
    participant A as Guest A
    participant B as Guest B
    participant API as Booking API
    participant DB as Postgres

    Note over A,DB: Problem: Read then write
    A->>API: Book Room 4
    B->>API: Book Room 4
    API->>DB: Room 4 free? ✅ (for A)
    API->>DB: Room 4 free? ✅ (for B)
    API->>DB: Insert A
    API->>DB: Insert B
    Note over DB: 💥 Both booked — OVERSELL
```

```mermaid
sequenceDiagram
    participant A as Guest A
    participant B as Guest B
    participant DB as Postgres

    Note over A,DB: Fix: Add a DB constraint
    A->>DB: BEGIN · insert Room 4 12–15 Jul
    B->>DB: BEGIN · insert Room 4 12–15 Jul
    DB-->>A: ✅ committed
    DB-->>B: ❌ exclusion constraint error
    Note over DB: Only ONE can exist.<br/>App turns B's error into<br/>"room just taken"
```

Main fixes for the above:

- Add a DB constraint to stop the overwrite happening twice
- Ensure that DB writes are awaited for before sending off confirmation emails

**Hold Race**

```mermaid
sequenceDiagram
    participant A as Guest A
    participant R as Redis (hold timer)
    participant DB as Postgres (real booking)
    participant B as Guest B

    A->>R: Hold Room 4 (15 min) ✅
    Note over A: slowly typing card details…

    Note over R: ⏰ 15 min pass — hold EXPIRES
    R-->>R: Room 4 hold released

    B->>R: Hold Room 4 ✅ (it's free now!)
    B->>DB: Pay + CONFIRM → Room 4 booked ✅
    Note over DB: B now truly owns Room 4

    Note over A: finally clicks "Pay"
    A->>DB: CONFIRM Room 4…
    Note over A,DB: ⚠️ A *thinks* they still hold it!
```

**Simple Fix**: Never trust the hold, re check at commit

- The hold is only for UX — it stops two people racing into the same checkout at the same moment.
- The database is the only real proof of a booking. At commit time, you always re-check against the DB, never the hold.
- **Problem is how can we can handle this when we don't own the DB for OTAs. If it two users booked** - TODO: BIGGEST THING WE NEED TO LOOK AT ITS CALLED `sync-lag oversell`

**Push failure → transactional outbox**

```mermaid
sequenceDiagram
    participant API as Booking API
    participant DB as Postgres
    participant CM as Channel Manager
    participant OTA as OTAs

    Note over API,OTA: ❌ WITHOUT an outbox (direct call)
    API->>DB: Insert booking ✅
    Note over API: 💥 crash / CM down right here
    API--xCM: PUSH never sent
    Note over OTA: OTAs still show Room 4 free → later oversell
```

```mermaid
sequenceDiagram
    participant API as Booking API
    participant OB as Outbox table
    participant W as Background Worker
    participant CM as Channel Manager

    Note over API,OB: Write the message as a ROW (not a live call)
    API->>OB: INSERT row {type: push, room: 4, status: pending}

    loop worker drains pending rows
        W->>OB: SELECT * WHERE status = pending
        W->>CM: deliver message
        CM-->>W: ✅ ack
        W->>OB: UPDATE row → status = sent
    end
    Note over OB,W: Row survives crashes · retried until sent
```

- The idea is that instead of directly writing to the Database and then sending the push event to channel manager
- We create an outbox table (see def above)
- This allow for retries to happen incase the server crashes

**Duplicate / out-of-order webhooks**

```mermaid
sequenceDiagram
    participant CM as Channel Manager
    participant API as Booking API

    CM->>API: webhook reservation #R123
    API->>API: processes it (slow…)
    API--xCM: 200 response lost / times out
    Note over CM: "No ack? Must have failed."
    CM->>API: webhook reservation #R123 (RETRY)
    Note over API: same booking arrives AGAIN
```

- The channel manager didn't hear back in time, so it assumes failure and resends
- The catch is we've processed it but not sent a 200 back.
- This can cause duplication of bookings

The Fix is simple just add an idempotency key

```mermaid
sequenceDiagram
    participant CM as Channel Manager
    participant API as Booking API
    participant DB as Postgres

    CM->>API: webhook reservation #R123
    API->>DB: insert WHERE id=R123 not exists ✅
    CM->>API: webhook reservation #R123 (retry)
    API->>DB: insert WHERE id=R123 not exists
    DB-->>API: already exists → ignore
    Note over DB: Idempotency key = reservation ID<br/>Duplicate = no-op
```
