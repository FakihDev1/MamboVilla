import React from 'react';
import { Compass, Sparkles, Coffee, Trees, Sunset, Map, ArrowRight } from 'lucide-react';

export default function MikumiProperty({ onBookNow }) {
  const highlights = [
    {
      icon: <Trees className="w-6 h-6 text-amber-600" />,
      title: "Mikumi National Park",
      desc: "Prime wildlife viewing location in Tanzania, famous for lion prides, elephants, giraffes, zebras, and spectacular birdlife."
    },
    {
      icon: <Sunset className="w-6 h-6 text-amber-600" />,
      title: "Hills Tented Chalets",
      desc: "Luxury safari accommodations elevated on the hills, offering sweeping, panoramic views of the savannah valleys below."
    },
    {
      icon: <Coffee className="w-6 h-6 text-amber-600" />,
      title: "Bush Dining & Boma",
      desc: "Enjoy traditional bush dinners under the African stars and share safari tales around our bonfire circle (Boma)."
    },
    {
      icon: <Map className="w-6 h-6 text-amber-600" />,
      title: "Guided Game Drives",
      desc: "Custom open 4x4 safari vehicles guided by expert naturalists to track and capture spectacular wildlife moments."
    }
  ];

  return (
    <section id="mikumi" className="py-24 bg-stone-950 text-white relative overflow-hidden">
      {/* Background SVG abstract savannah decoration for premium feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 40 40 L 80 10 M 0 30 L 40 60 L 80 30" fill="none" stroke="#d97706" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block mb-3">
            Tanzanian Wilderness Escape
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-stone-100 tracking-tight leading-none mb-4">
            Mambo Hills Safari Lodge - Mikumi
          </h2>
          <p className="text-stone-400 font-light text-base md:text-lg">
            Immerse yourself in the wild heart of Tanzania. Perched atop scenic hills, our luxury lodge blends untamed adventure with premium comfort, offering unforgettable wildlife encounters.
          </p>
        </div>

        {/* Feature Split Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Stylized Visual (SVG-based Savannah Sunset Graphic) */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-950/80 to-stone-900 border border-amber-900/20 p-8 flex flex-col justify-between group">
            {/* Ambient gold glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-amber-600/10 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                Exclusive Experience
              </span>
              <Compass className="w-6 h-6 text-amber-500" />
            </div>

            <div className="relative z-10 my-auto text-center py-6">
              {/* Giant SVG animal or silhouette representing Safari */}
              <svg className="w-32 h-32 mx-auto text-amber-500/80 mb-6 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,17.93V18h-2v1.93A8,8,0,0,1,4.07,13H6V11H4.07A8,8,0,0,1,11,4.07V6h2V4.07A8,8,0,0,1,19.93,11H18v2h1.93A8,8,0,0,1,13,19.93Z" />
              </svg>
              <h4 className="font-display font-semibold text-2xl text-amber-400 mb-2">Wild Savannah Awaits</h4>
              <p className="text-stone-300 text-sm font-light max-w-sm mx-auto">
                Mikumi offers rich wildlife populations, matching the beauty of Serengeti with higher accessibility.
              </p>
            </div>

            <div className="relative z-10 border-t border-white/5 pt-4 text-center">
              <span className="text-xs text-stone-500">Mambo Hills Safari Lodge • Mikumi, Tanzania</span>
            </div>
          </div>

          {/* Details & Highlights Grid */}
          <div>
            <h3 className="font-display font-bold text-3xl text-stone-100 mb-6">
              A Wilderness Sanctuary Like No Other
            </h3>
            <p className="text-stone-300 font-light mb-10 text-sm md:text-base leading-relaxed">
              Designed as a perfect complement to our Zanzibar beach villas, Mambo Hills Safari Lodge is your luxury basecamp for spotting Africa’s big game. Retreat to your elevated luxury chalet, sip cocktails at the hilltop lounge, and dine to the sounds of nature.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 h-fit shrink-0">
                    {hl.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-stone-100 text-base mb-1">{hl.title}</h4>
                    <p className="text-stone-400 text-xs font-light leading-relaxed">{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onBookNow}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Inquire About Safari Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
