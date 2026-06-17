import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Ship, Compass } from 'lucide-react';

export default function Hero({ onSelectProperty }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    // Initial entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.fromTo(leftPanelRef.current, { xPercent: -100 }, { xPercent: 0 })
      .fromTo(rightPanelRef.current, { xPercent: 100 }, { xPercent: 0 }, '<')
      .fromTo(dividerRef.current, { scaleY: 0 }, { scaleY: 1 }, '<0.5')
      .fromTo(
        [leftContentRef.current.children, rightContentRef.current.children],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1 },
        '<0.4'
      );
  }, []);

  const handleHoverLeft = () => {
    gsap.to(leftPanelRef.current, { width: '70%', duration: 0.8, ease: 'power3.out' });
    gsap.to(rightPanelRef.current, { width: '30%', duration: 0.8, ease: 'power3.out' });

    // Highlight items
    gsap.to(leftContentRef.current, { scale: 1.03, duration: 0.5 });
    gsap.to(rightContentRef.current, { opacity: 0.4, scale: 0.97, duration: 0.5 });
  };

  const handleHoverRight = () => {
    gsap.to(leftPanelRef.current, { width: '30%', duration: 0.8, ease: 'power3.out' });
    gsap.to(rightPanelRef.current, { width: '70%', duration: 0.8, ease: 'power3.out' });

    // Highlight items
    gsap.to(rightContentRef.current, { scale: 1.03, duration: 0.5 });
    gsap.to(leftContentRef.current, { opacity: 0.4, scale: 0.97, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    gsap.to([leftPanelRef.current, rightPanelRef.current], { width: '50%', duration: 0.8, ease: 'power3.out' });
    gsap.to([leftContentRef.current, rightContentRef.current], { opacity: 1, scale: 1, duration: 0.5 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row bg-stone-900 select-none"
      id="home"
    >
      {/* Left Panel: Matemwe Beach Villa */}
      <div
        ref={leftPanelRef}
        onMouseEnter={handleHoverLeft}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer flex items-center justify-center group"
        onClick={() => onSelectProperty('matemwe')}
      >
        {/* Background Image: using one of Matemwe's stunning images */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: "url('/images/0dd0a8a1-6d27-48d0-b50c-6f6b8dc181cc.JPG')" }}
        />
        {/* Deep Teal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-teal-900/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-teal-950/40 opacity-80 mix-blend-color" />

        {/* Content */}
        <div
          ref={leftContentRef}
          className="relative z-10 text-center px-6 max-w-lg transition-all"
        >
          <div className="inline-flex items-center justify-center p-3 bg-teal-600/30 backdrop-blur-md rounded-full mb-4 border border-teal-500/20 text-teal-200">
            <Ship className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight leading-none mb-3">
            Mambo Beach Villa
          </h2>
          <p className="text-teal-300 font-display font-medium uppercase tracking-widest text-xs mb-6">
            Matemwe, Zanzibar
          </p>
          <p className="text-stone-200 text-sm md:text-base font-light mb-8 max-w-sm mx-auto line-clamp-3 md:line-clamp-none">
            Tropical beachfront paradise with pristine sands, private pools, spacious bungalows, and excursions to Mnemba Island.
          </p>
          <button
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-500 transition-colors border border-teal-400/20 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty('matemwe');
            }}
          >
            Explore Beach Villa
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        ref={dividerRef}
        className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/10 z-20 origin-center"
      />

      {/* Right Panel: Mikumi Safari Lodge */}
      <div
        ref={rightPanelRef}
        onMouseEnter={handleHoverRight}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer flex items-center justify-center group"
        onClick={() => onSelectProperty('mikumi')}
      >
        {/* Background Image: since we do not have specific Mikumi photos, we use a safari landscape background or a highly styled graphic element */}
        {/* We can use CSS gradients or stylized SVGs to make it look exceptionally premium */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: "linear-gradient(rgba(12, 11, 10, 0.4), rgba(12, 11, 10, 0.8)), url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200')"
          }}
        />
        {/* Savannah Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-amber-900/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-amber-950/40 opacity-80 mix-blend-color" />

        {/* Content */}
        <div
          ref={rightContentRef}
          className="relative z-10 text-center px-6 max-w-lg transition-all"
        >
          <div className="inline-flex items-center justify-center p-3 bg-amber-600/30 backdrop-blur-md rounded-full mb-4 border border-amber-500/20 text-amber-200">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight leading-none mb-3">
            Mambo Hills Safari Lodge
          </h2>
          <p className="text-amber-400 font-display font-medium uppercase tracking-widest text-xs mb-6">
            Mikumi National Park
          </p>
          <p className="text-stone-200 text-sm md:text-base font-light mb-8 max-w-sm mx-auto line-clamp-3 md:line-clamp-none">
            A luxury safari escape nestled in the hills of Mikumi, featuring exclusive game drives, wilderness dining, and stunning wildlife vistas.
          </p>
          <button
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:bg-amber-500 transition-colors border border-amber-400/20 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty('mikumi');
            }}
          >
            Explore Safari Lodge
          </button>
        </div>
      </div>
    </section>
  );
}
