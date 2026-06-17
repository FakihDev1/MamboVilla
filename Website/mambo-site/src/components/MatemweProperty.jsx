import React, { useState } from 'react';
import { Anchor, Wind, Coffee, Compass, ArrowRight, Eye, ShieldCheck, Waves } from 'lucide-react';

export default function MatemweProperty({ onBookNow }) {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    { src: '/images/0dd0a8a1-6d27-48d0-b50c-6f6b8dc181cc.JPG', title: 'Ocean View Terrace' },
    { src: '/images/5e8517c5-d196-4f2f-b3a5-e85c84719e1d.JPG', title: 'Bungalow Bedroom' },
    { src: '/images/95af4ddd-ddfd-4e74-972c-b3f1b184a57d.JPG', title: 'Modern Bathroom' },
    { src: '/images/1307708f-457e-4089-9f58-14076c4ccc99.JPG', title: 'Beachfront Dining' },
    { src: '/images/ad07fd81-aa5d-4150-b249-168986e4e559.JPG', title: 'Poolside Lounge' },
    { src: '/images/cc31db2a-eb78-4795-be54-c18b17f05aff.JPG', title: 'Path to Bungalows' }
  ];

  const amenities = [
    'Private Kitchen', 'Ocean-Facing Balcony', 'Air Conditioning', 
    'Flat-screen TV', 'Free Premium WiFi', 'Washing Machine', 
    'Outdoor Swimming Pool', 'Beach Access', 'Restaurant & Bar'
  ];

  return (
    <section id="matemwe" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="container">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-teal-600 font-bold block mb-3">
            Zanzibar Beachfront Escape
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-stone-800 tracking-tight leading-none mb-4">
            Mambo Beach Villa - Matemwe
          </h2>
          <p className="text-stone-500 font-light text-base md:text-lg">
            Nestled directly on the turquoise shores of Matemwe Beach, Zanzibar. Experience premium beachfront accommodation, gourmet dining, and direct ocean access.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Gallery View */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-xl bg-stone-200 border border-stone-200">
              <img 
                src={images[activeImage].src} 
                alt={images[activeImage].title} 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10">
                {images[activeImage].title}
              </div>
            </div>
            
            {/* Thumbnail selector */}
            <div className="grid grid-cols-6 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[3/2] rounded-xl overflow-hidden border-2 transition-all focus:outline-none ${
                    activeImage === idx ? 'border-teal-600 scale-[1.02] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Amenities */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-display font-bold text-3xl text-stone-800 tracking-tight mb-4">
              Your Beachfront Sanctuary
            </h3>
            <p className="text-stone-600 font-light mb-6">
              Our beach bungalows offer a blend of luxury and natural tropical aesthetics. Designed with spacious master bedrooms, premium bathrooms featuring modern matte-black fixtures, and private balconies that frame Zanzibar’s famous sunrise over the Indian Ocean.
            </p>

            {/* List of amenities */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-stone-700 text-sm">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookNow}
                className="px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Book Direct & Save</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="https://www.tripadvisor.co.uk/Hotel_Review-g616017-d23831648-Reviews-Mambo_Beach_Villas-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-semibold rounded-full text-center transition-colors"
              >
                View on TripAdvisor
              </a>
            </div>
          </div>
        </div>

        {/* Local Attractions */}
        <div className="bg-white rounded-3xl border border-stone-200/60 p-8 md:p-12 shadow-sm">
          <h3 className="font-display font-bold text-2xl text-stone-800 mb-8 flex items-center gap-3">
            <Compass className="w-6 h-6 text-teal-600" />
            <span>Local Attractions & Excursions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-teal-500 pl-6">
              <h4 className="font-display font-semibold text-lg text-stone-800 mb-2">Mnemba Island Snorkeling & Diving</h4>
              <p className="text-stone-500 font-light text-sm">
                Located just 3.1 miles (5 km) off the coast, Mnemba Island is renowned as Zanzibar's premier marine reserve. Dive with dolphins, swim along pristine coral reefs, and explore diverse marine life. Boats launch directly from Matemwe beach.
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-6">
              <h4 className="font-display font-semibold text-lg text-stone-800 mb-2">Muyuni Beach & Local Villages</h4>
              <p className="text-stone-500 font-light text-sm">
                Located 3.7 miles from the property, Muyuni Beach offers untouched white sands and high seclusion, ideal for romantic getaways. We also guide cultural walks through Matemwe village to support the local community.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
