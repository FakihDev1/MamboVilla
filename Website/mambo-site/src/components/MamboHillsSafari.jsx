"use client";

import React from 'react';

export default function MamboHillsSafari() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-tr from-amber-500/5 via-stone-50 to-white relative">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-xl w-full text-center relative z-10">
        {/* Lodge Logo */}
        <div className="bg-stone-950 p-8 rounded-3xl border border-amber-900/10 shadow-md mb-10 max-w-[320px] mx-auto transition-transform duration-500 hover:scale-[1.02]">
          <img 
            src="/images/Mambo Hills Safari Lodge logo.jpg" 
            alt="Mambo Hills Safari Lodge Logo" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Coming Soon status */}
        <span className="inline-block py-1 px-3.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold tracking-widest uppercase mb-4 border border-amber-200/35 animate-pulse">
          Under Development
        </span>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
          Coming Soon
        </h2>
        <div className="w-12 h-0.5 bg-amber-600/60 mx-auto mb-6 rounded-full" />
        <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed mb-8">
          Mambo Hills Safari Lodge is currently under development. We are preparing a premium wilderness escape in Mikumi National Park.
        </p>
        
        {/* Contact coordinates */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm max-w-sm mx-auto">
          <p className="text-xs text-stone-600 font-medium uppercase tracking-wider mb-2">
            Inquiries & Updates
          </p>
          <a 
            href="mailto:admin@mambohotelgroup.com" 
            className="text-stone-900 hover:text-amber-600 font-display font-semibold transition-colors text-sm break-all"
          >
            admin@mambohotelgroup.com
          </a>
        </div>
      </div>
    </div>
  );
}
