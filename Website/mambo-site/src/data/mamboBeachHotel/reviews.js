/**
 * Guest reviews for Mambo Beach Hotel.
 * To add a new review, append an object to this array.
 *
 * Fields:
 *   name        {string}  - Reviewer's name
 *   meta        {string}  - Source / date / details line shown below the name
 *   review      {string}  - The review text (in English)
 *   highlights  {string}  - Optional short highlights line (e.g. "Great view, Quiet, Great value")
 *   response    {string}  - Optional hotel response text
 *   ratings     {{ rooms, service, location }} - Scores shown in the card footer
 */
const REVIEWS = [
  {
    name: "Leigh Kendall",
    meta: "Local Guide • 42 reviews • 37 weeks ago",
    review:
      "This is a quiet gem right on Matemwe beach. Azizi and his staff made me feel so welcome and catered to our every need. The rooms were clean and serviced daily by a wonderful lady. My massage came to my room and so did my meals when I wanted. Tours and travel was booked as needed. Reasonable rates. Highly recommend.",
    highlights: null,
    response: null,
    ratings: { rooms: "5/5", service: "5/5", location: "5/5" },
  },
  {
    name: "Ava Irwin",
    meta: "Holiday · Family • 9 reviews • 48 weeks ago",
    review:
      "Lovely hotel, very welcoming and helpful staff. The hotel is right on the beach with a great view from the balconies. The cost was very reasonable, I would definitely stay here again.",
    highlights: "Great view, Quiet, Great value",
    response: null,
    ratings: { rooms: "5/5", service: "5/5", location: "5/5" },
  },
  {
    name: "Moza",
    meta: "Guest Review",
    review:
      "Perfect spot for a special night out. Mambo Villa gave us amazing food — the lobster and grilled fish were cooked to perfection, and the tamara rice/chips had so much flavour. Romantic setting and service that made us feel so welcome. Felt like a mini honeymoon dinner all over again. Thank you for the great experience! Definitely will go back again.",
    highlights: "Amazing food, Romantic setting, Great service",
    response: null,
    ratings: { rooms: "5/5", service: "5/5", location: "5/5" },
  },
  {
    name: "Mieke Vermeulen",
    meta: "Facebook Recommendation • 3 February 2025",
    review:
      "A wonderful place to stay!!! This is how you discover the real Zanzibar — without the hustle and bustle of the big hotels!! Absolutely recommended! We couldn't have wished for a better stay!!! 👍👍👍👍",
    highlights: null,
    response:
      "Asante sana — we are truly honoured to hear that you enjoyed all the hakuna matata of Mambo Villa... Thank you so much for staying with us.",
    ratings: { rooms: "5/5", service: "5/5", location: "5/5" },
  },
];

export default REVIEWS;
