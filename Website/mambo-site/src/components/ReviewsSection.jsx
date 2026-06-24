"use client";

import React from "react";
import { Star } from "lucide-react";
import REVIEWS from "../data/mamboBeachHotel/reviews";

function ReviewCard({ name, meta, review, highlights, response, ratings }) {
  return (
    <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-3xl text-left border border-stone-800 flex flex-col justify-between">
      <div>
        {/* Stars */}
        <div className="flex text-amber-400 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        {/* Reviewer name & meta */}
        <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">
          {name}
        </p>
        <p className="text-stone-500 text-[10px] mb-4">{meta}</p>

        {/* Review body */}
        <p className="text-stone-300 text-sm leading-relaxed mb-4 font-light">
          &ldquo;{review}&rdquo;
        </p>
      </div>

      <div>
        {/* Optional highlights */}
        {highlights && (
          <p className="text-[10px] text-amber-400 font-semibold mb-3">
            Highlights: {highlights}
          </p>
        )}

        {/* Optional hotel response */}
        {response && (
          <div className="bg-stone-900/60 rounded-xl p-3 mb-4 border border-stone-700/40">
            <p className="text-[10px] text-ocean-400 font-semibold uppercase tracking-wider mb-1">
              Mambo Villa responded:
            </p>
            <p className="text-stone-400 text-xs font-light italic leading-relaxed">
              &ldquo;{response}&rdquo;
            </p>
          </div>
        )}

        {/* Ratings footer */}
        <div className="border-t border-stone-700/60 pt-4 text-[10px] text-stone-400 flex justify-between font-medium">
          <span>Rooms: {ratings.rooms}</span>
          <span>Service: {ratings.service}</span>
          <span>Location: {ratings.location}</span>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="reveal-section bg-stone-900 text-white py-24 mb-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-16">
          Real Guest Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
