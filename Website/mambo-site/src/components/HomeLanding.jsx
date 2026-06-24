"use client";

import React from 'react';
import { 
  Waves, 
  Compass, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Trees 
} from 'lucide-react';

export default function HomeLanding({ setActiveTab }) {
  return (
    <div className="w-full pb-24">
      {/* Immersive Welcome Banner Hero */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center py-20 px-6 lg:px-12 overflow-hidden bg-stone-900">
        {/* Full-width background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/mamboBeachHotel/externalview10.jpeg" 
            alt="Mambo Beach Hotel Resort Aerial" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-900/50 to-stone-950/70"></div>
        </div>

        {/* Welcome Card Container */}
        <div className="relative z-10 max-w-4xl w-full bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl text-center">
          <div className="flex flex-col items-center gap-6">
            {/* Elegant brand tag */}
            <span className="text-[11px] uppercase tracking-widest text-ocean-700 font-bold bg-ocean-50 py-1.5 px-4 rounded-full border border-ocean-100/50">
              Karibu Sana &bull; Official Welcome
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-none">
              Mambo Hotel Group
            </h1>
            
            <p className="text-stone-500 font-display italic text-lg sm:text-xl font-medium">
              Exclusive Tanzanian Destinations & Tailored Hospitality
            </p>

            <div className="w-16 h-0.5 bg-gradient-to-r from-ocean-500 to-amber-500 rounded-full my-1"></div>

            <p className="text-stone-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              We manage a premier portfolio of intimate coastal hotels and wilderness safari lodges. Driven by a steadfast commitment to <strong>duty of care</strong>, <strong>personalized guest experiences</strong>, and premium services, we replace mass tourism with absolute serenity and safety.
            </p>

            {/* Core Values grid inside the banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6 text-left border-t border-stone-100 pt-6">
              <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-200/40">
                <h4 className="font-display font-semibold text-xs text-stone-900 uppercase tracking-wider mb-1">
                  Duty of Care
                </h4>
                <p className="text-stone-500 text-xs font-light leading-normal">
                  24/7 on-site hospitality, secure grounds, and medical coordinate support.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-200/40">
                <h4 className="font-display font-semibold text-xs text-stone-900 uppercase tracking-wider mb-1">
                  Personalised Service
                </h4>
                <p className="text-stone-500 text-xs font-light leading-normal">
                  Dedicated staff, custom dining requests, and bespoke local activities.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-200/40">
                <h4 className="font-display font-semibold text-xs text-stone-900 uppercase tracking-wider mb-1">
                  Premium Selection
                </h4>
                <p className="text-stone-500 text-xs font-light leading-normal">
                  A carefully curated range of properties and booking portal channels.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('mambo-beach')}
                className="px-8 py-4 bg-ocean-600 hover:bg-ocean-500 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm"
              >
                <span>Explore Zanzibar Coast</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTab('mambo-safari')}
                className="px-8 py-4 bg-stone-900 hover:bg-stone-850 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm"
              >
                <span>Explore Safari Teaser</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Showcase Directory */}
      <section className="px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-ocean-700 font-bold block mb-3">
            Our Boutique Collection
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 mb-6">
            Two Worlds, One Premium Group
          </h2>
          <p className="text-stone-600 font-light leading-relaxed">
            Whether you seek sunrise over the turquoise Indian Ocean or the raw beauty of the African savannah, Mambo Hotel Group manages every aspect of your stay with flawless hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Card 1: Beach Property */}
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden relative bg-stone-950 flex items-center justify-center p-8">
              <img 
                src="/images/mamboBeachHotel/Mambo beach hotel logo.jpg" 
                alt="Mambo Beach Hotel" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-ocean-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl border border-stone-200/30">
                Zanzibar Beachfront
              </span>
            </div>
            
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-stone-900 mb-3 group-hover:text-ocean-600 transition-colors">
                  Mambo Beach Hotel
                </h3>
                <p className="text-stone-500 text-xs tracking-wider uppercase font-semibold mb-4 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-ocean-600" />
                  <span>Matemwe, Zanzibar</span>
                </p>
                <p className="text-stone-600 font-light text-sm leading-relaxed mb-6">
                  An exclusive 5 double-room beachfront escape overlooking the Mnemba Island islet. The perfect paradise for ocean lovers interested in snorkeling, coastal dining, and complete relaxation without self-catering.
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['5 Cozy Double Rooms', 'Private Bathrooms', 'Mnemba Views', 'Snorkeling Focus', 'Staff Kitchen'].map(badge => (
                    <span key={badge} className="text-xs bg-ocean-50 text-ocean-700 px-2.5 py-1.5 rounded-lg font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('mambo-beach')}
                className="w-full py-4 bg-ocean-600 hover:bg-ocean-500 text-white font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Mambo Beach Hotel</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Safari Property */}
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden relative bg-stone-950 flex items-center justify-center p-8">
              <img 
                src="/images/Mambo Hills Safari Lodge logo.jpg" 
                alt="Mambo Hills Safari Lodge" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-amber-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl border border-stone-200/30">
                Mikumi Wilderness
              </span>
            </div>
            
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
                  Mambo Hills Safari Lodge
                </h3>
                <p className="text-stone-500 text-xs tracking-wider uppercase font-semibold mb-4 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-amber-600" />
                  <span>Mikumi National Park</span>
                </p>
                <p className="text-stone-600 font-light text-sm leading-relaxed mb-6">
                  An exclusive elevated hilltop wilderness sanctuary currently under development in Mikumi National Park. Experience premium accommodations and spectacular natural surroundings.
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Under Development', 'Morogoro, Mikumi', 'Coming Soon', 'Group Teaser'].map(badge => (
                    <span key={badge} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-lg font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('mambo-safari')}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Safari Teaser</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Managing Group Value Pillars */}
      <section className="bg-white border-y border-stone-200 py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-stone-900 mb-4">
              The Mambo Group Standards
            </h2>
            <p className="text-stone-500 font-light text-sm max-w-lg mx-auto">
              Our hospitality promise guarantees a seamless, secure, and fully catered experience across all Tanzanian properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="p-3 bg-ocean-50 rounded-2xl text-ocean-600 h-fit shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-lg mb-2">Dedicated Central Dining</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  We replace the stress of self-catering. Our professional staff kitchens handle gourmet breakfast, lunch, and dinner requests, so you can focus entirely on your experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-ocean-50 rounded-2xl text-ocean-600 h-fit shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-lg mb-2">Peace of Mind Security</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  Enjoy complete peace of mind with 24/7 on-site management, secure grounds, and professional hospitality staff catering to your safety and comfort at all times.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-ocean-50 rounded-2xl text-ocean-600 h-fit shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-lg mb-2">Pristine Curation</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  Our locations are selected for their natural beauty—whether beachfront vistas of Mnemba islet or hilltop lookout decks over Mikumi National Park.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-ocean-50 rounded-2xl text-ocean-600 h-fit shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-stone-900 text-lg mb-2">Local Activity Guidance</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  While we do not host or organize tours directly, our guest services team will gladly connect you with trusted local agencies for snorkeling, boat trips, and wilderness safaris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
