"use client";

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export default function Reviews() {
  const [activeIdx, setActiveIdx] = useState(0);

  const reviewsList = [
    {
      author: "alexeikusnirov",
      date: "Jan 2022",
      rating: 5,
      title: "Wonderful landscape and amazing staff!",
      text: "The food has a great taste, the staff was very kind, responded to all the requests, the yard, the pool and the beach complete a wonderful landscape. The rooms are very large and clean... towels and sheets are changed every two days... very good wi-fi like I haven't found in any other place on the island... I have only words of appreciation for all that mambo beach villas mean."
    },
    {
      author: "77Dan77",
      date: "Mar 2023",
      rating: 5,
      title: "A super decent place for the price!",
      text: "We have been there for 7 nights in October. We had a very good time, the place was pretty basic but what can you expect since it's a budget hotel in Africa :). The staff was super nice to us and super responsive to our needs. Bed sheets and towels were clean. Beach in front of the bungalows was awesome and when the tide took the ocean away we had some relaxing time in the hotel's pool."
    }
  ];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-24 bg-white border-t border-stone-200">
      <div className="container">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-teal-600 font-bold block mb-3">
            Guest Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl text-stone-800 tracking-tight leading-none mb-4">
            What Our Guests Say
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base">
            Read authentic reviews from TripAdvisor. We are dedicated to providing warm hospitality, clean accommodations, and responsive services.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative px-12">
          
          <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-8 md:p-12 shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              {[...Array(reviewsList[activeIdx].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <h3 className="font-display font-bold text-xl md:text-2xl text-stone-800 mb-4 text-center md:text-left">
              "{reviewsList[activeIdx].title}"
            </h3>

            <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base mb-8 text-center md:text-left">
              {reviewsList[activeIdx].text}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between border-t border-stone-200/60 pt-6 gap-4">
              <div className="text-center md:text-left">
                <span className="font-semibold text-stone-800 block text-sm">
                  {reviewsList[activeIdx].author}
                </span>
                <span className="text-xs text-stone-400 font-light">
                  TripAdvisor Reviewer • {reviewsList[activeIdx].date}
                </span>
              </div>

              <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Verified TripAdvisor Review</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors focus:outline-none"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors focus:outline-none"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
