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
- Push can fail but it shouldn't block the user. Notify the user and enqueue the channel manager to push in the background for retries
- Make sure any DB updates are sync calls, we can't continue until we get DB write confirmation

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

**Simple Fix**: Never trust the hold, re-check at commit

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
- This allows retries to happen in case the server crashes

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

# Implementation Plan

Build in thin, testable slices. Each phase ships something we can use and verify before moving on. The trick is to **front-load the riskiest integration (OTA sync) first** by leaning on Booking.com as the source of truth, then gradually bring control in-house.

```mermaid
flowchart LR
    P0["Phase 0<br/>Foundations<br/>routing + CM sandbox"] --> P1["Phase 1<br/>Booking.com<br/>as source of truth"]
    P1 --> P2["Phase 2<br/>Bring truth in-house<br/>Postgres + constraint"]
    P2 --> P3["Phase 3<br/>Reliable sync<br/>outbox + idempotency"]
    P3 --> P4["Phase 4<br/>Website holds<br/>Redis + checkout"]
    P4 --> P5["Phase 5<br/>Front desk<br/>+ availability buffer"]
    P5 --> P6["Phase 6<br/>Payments<br/>reserve → Stripe → M-Pesa"]
```

## Phase 0 — Foundations & spike

- **Goal:** a skeleton we can build on, and a working channel-manager connection.
- **Build:** Next.js app with real routing (replace the `activeTab` state); sign up for a channel manager (Channex / Beds24) sandbox; connect a Booking.com test property to it.
- **Test ✅:** we can read availability and push a test reservation through the channel manager API.

## Phase 1 — Booking.com as the source of truth

- **Goal:** a working end-to-end booking with minimal infrastructure. No Postgres availability engine, no Redis holds yet — the website is a custom front-end onto the channel manager, and **Booking.com (via the channel manager) owns the inventory**.
- **Build:** website reads live availability from the channel manager; a website booking is pushed straight to the channel manager so it appears on Booking.com. Reserve-only (no payment).
- **Test ✅:**
  - Book on the site → it shows up in Booking.com.
  - Book on Booking.com → the site shows that room as unavailable.
- **Why first:** this de-risks the hardest part (OTA sync) immediately and avoids building the availability engine prematurely. Trade-off: we accept sync-lag and have no exclusion-constraint guard yet — acceptable at low volume for a single property.

## Phase 2 — Bring the source of truth in-house

- **Goal:** own our inventory so we get the oversell guarantee.
- **Build:** introduce Postgres as the source of truth with the **exclusion constraint**; channel manager now syncs two-way (push our bookings, pull OTA reservations via webhook).
- **Test ✅:** two concurrent bookings for the same room → exactly one wins; a pulled OTA reservation correctly closes the room on the site.

## Phase 3 — Reliable sync

- **Goal:** never lose a push, never double-count a webhook.
- **Build:** transactional **outbox** + background worker for pushes; **idempotency key** (reservation ID) on incoming webhooks.
- **Test ✅:** kill the server mid-booking → push still delivered on restart; channel manager down → retried until acked; duplicate webhook → no-op.

## Phase 4 — Website holds & checkout UX

- **Goal:** a smooth multi-step checkout that doesn't let two website guests collide.
- **Build:** Redis **holds** (`SET NX EX`); availability = total − booked − held; multi-step checkout page.
- **Test ✅:** a held room can't be held by a second guest; an abandoned checkout auto-frees the room after the TTL; final confirm still re-checks the DB.

## Phase 5 — Front desk & availability buffer

- **Goal:** support walk-ins and protect desk inventory from OTA last-room races.
- **Build:** admin booking screen (instant commit + immediate push); **availability buffer** to hold back the last 1–2 rooms from OTAs.
- **Test ✅:** a desk booking commits instantly and closes the room on OTAs; with a buffer of 1, the OTAs can never sell the final room.

## Phase 6 — Payments (staged)

- **Goal:** take money, rolled out in low-risk stages.
- **Build:** reserve-only → **Stripe** (tourists/cards) → **Pesapal / M-Pesa** (locals); refunds + payment status on bookings.
- **Test ✅:** each provider works end-to-end in sandbox; a failed payment never leaves a confirmed booking.

> TODO: revisit `sync-lag oversell` (see Race Conditions) before relying on Postgres as the sole source of truth in Phase 2 — the buffer in Phase 5 is the main mitigation.
