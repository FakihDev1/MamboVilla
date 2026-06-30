"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin, Waves, Utensils, Wifi, Wind, ArrowRight,
  Image as ImageIcon, X, ChevronLeft, ChevronRight,
  Compass, Star, Users, Camera
} from 'lucide-react';
import Image from 'next/image';
import InquiryModal from '@/components/InquiryModal';
import ReviewsSection from '@/components/ReviewsSection';
import Button from '@/components/Button';
import GALLERY from '@/data/mamboBeachHotel/gallery';
import FAQS from '@/data/mamboBeachHotel/faqs';

gsap.registerPlugin(ScrollTrigger);

export default function MamboBeachHotel() {
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sticky bar: appears after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when modals are open
  useEffect(() => {
    document.body.style.overflow = (isGalleryOpen || isModalOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isGalleryOpen, isModalOpen]);

  // Filtered images for gallery modal
  const filteredImages = activeGalleryCategory === 'all'
    ? GALLERY
    : GALLERY.filter(img => img.category === activeGalleryCategory);

  // Lightbox navigation
  const handlePrev = useCallback(() =>
    setLightboxIndex(prev => prev === 0 ? filteredImages.length - 1 : prev - 1),
    [filteredImages.length]
  );
  const handleNext = useCallback(() =>
    setLightboxIndex(prev => prev === filteredImages.length - 1 ? 0 : prev + 1),
    [filteredImages.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, handlePrev, handleNext]);

  // Touch swipe support for lightbox on mobile
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
  };

  // GSAP scroll-reveal for sections
  useGSAP(() => {
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach(section => {
      gsap.from(section, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 88%' },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full pb-24">

      {/* ═══════════════════════════════════════════
          1. HERO — Full-bleed photography
      ═══════════════════════════════════════════ */}
      <section className="relative w-full h-[75svh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/mamboBeachHotel/externalview10.jpeg"
          alt="Mambo Beach Hotel — Matemwe, Zanzibar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/30 to-transparent" />

        <div className="relative z-10 px-6 lg:px-12 pb-12 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">Matemwe, Zanzibar</span>
          </div>

          {/* Official logo */}
          <div className="mb-5">
            <Image
              src="/images/mamboBeachHotel/Mambo beach hotel logo.jpg"
              alt="Mambo Beach Hotel"
              width={1254}
              height={1254}
              priority
              className="h-14 w-auto object-contain drop-shadow-2xl"
            />
          </div>

          <p className="text-stone-300 text-sm sm:text-base font-light mb-5 max-w-md leading-relaxed">
            5 rooms · Direct beachfront · Mnemba Island views · Home-cooked dining
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-7">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="text-white text-sm font-semibold">5/5 · All guests</span>
            </div>
            <span className="text-stone-500 hidden sm:block">·</span>
            <span className="text-white font-bold text-sm">From £62 / night</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl text-sm shadow-lg"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="glass"
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 rounded-2xl text-sm"
            >
              Direct Inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. STATS STRIP
      ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-stone-100 overflow-x-auto hide-scrollbar">
        <div className="flex items-stretch divide-x divide-stone-100 min-w-max">
          {[
            { value: '5 Rooms', label: 'Boutique & private' },
            { value: 'Beachfront', label: 'Direct sand access' },
            { value: 'Mnemba Views', label: 'Snorkelling nearby' },
            { value: 'All Meals', label: 'Home-cooked kitchen' },
            { value: 'Free Wi-Fi', label: 'Air conditioning' },
          ].map(({ value, label }) => (
            <div key={label} className="px-6 py-4 text-center">
              <p className="font-display font-bold text-stone-900 text-sm whitespace-nowrap">{value}</p>
              <p className="text-muted text-[11px] whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. GALLERY — Mobile: horizontal swipe strip
      ═══════════════════════════════════════════ */}
      <section className="md:hidden pt-8 mb-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-3">
          {GALLERY.slice(0, 10).map((img, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-64 h-48 rounded-2xl overflow-hidden cursor-pointer relative"
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          ))}
          {/* "See all" tile */}
          <div
            className="snap-start shrink-0 w-64 h-48 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center cursor-pointer gap-2.5"
            onClick={() => setIsGalleryOpen(true)}
          >
            <Camera className="w-8 h-8 text-stone-400" />
            <p className="text-stone-700 font-bold text-sm">All {GALLERY.length} photos</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. GALLERY — Desktop: mosaic grid
      ═══════════════════════════════════════════ */}
      <section className="hidden md:block px-4 lg:px-8 max-w-screen-2xl mx-auto mb-16 pt-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-3 h-[60vh] min-h-[400px]">
            <div
              className="col-span-2 row-span-2 rounded-3xl overflow-hidden cursor-pointer group relative"
              onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('all'); }}
            >
              <Image src="/images/mamboBeachHotel/externalview10.jpeg" alt="Mambo Beach Hotel Aerial" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden cursor-pointer group relative" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('rooms'); }}>
              <Image src="/images/mamboBeachHotel/bedroom.JPG" alt="Luxury Suite" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden cursor-pointer group relative" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('dining'); }}>
              <Image src="/images/mamboBeachHotel/beachside dining.JPG" alt="Beachside Dining" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="col-span-2 rounded-3xl overflow-hidden cursor-pointer group relative" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('exterior'); }}>
              <Image src="/images/mamboBeachHotel/mnemba view.JPG" alt="Mnemba Island Views" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white hover:bg-stone-50 text-stone-900 font-bold text-sm px-5 py-3 rounded-2xl shadow-md border border-stone-200 flex items-center gap-2 transition-all cursor-pointer z-10"
          >
            <ImageIcon className="w-4 h-4 text-stone-600" />
            Show all {GALLERY.length} photos
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. WHAT MAKES IT SPECIAL — 4 icon cards
      ═══════════════════════════════════════════ */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-16 mt-8 md:mt-0">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-stone-900 mb-8 text-center">
          What makes it special
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Waves, title: 'Direct Beachfront', desc: 'Step straight onto the sand' },
            { icon: Compass, title: 'Mnemba Views', desc: 'Snorkelling from the shore' },
            { icon: Utensils, title: 'Home-Cooked Meals', desc: 'Fresh & served your way' },
            { icon: Users, title: '5 Rooms Only', desc: 'No crowds. Total privacy.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm text-center hover:shadow-md hover:border-ocean-200 transition-all">
              <div className="p-3 bg-ocean-50 rounded-2xl text-ocean-600 w-fit mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-900 text-sm mb-1">{title}</h3>
              <p className="text-stone-500 text-xs font-light leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. MID-PAGE BOOKING CTA
      ═══════════════════════════════════════════ */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <div className="bg-brand rounded-3xl p-8 text-center text-white">
          <p className="text-ocean-200 text-xs uppercase tracking-widest font-semibold mb-2">Ready to book?</p>
          <h2 className="font-display font-black text-2xl sm:text-3xl mb-2">From £62 per night</h2>
          <p className="text-ocean-200 text-sm mb-6 font-light">Only 5 rooms — availability is limited</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="onBrand"
              className="px-7 py-3 rounded-2xl text-sm"
            >
              Book on Booking.com <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="glassStrong"
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3 rounded-2xl text-sm"
            >
              Direct Inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. REVIEWS — Social proof pulled up early
      ═══════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ═══════════════════════════════════════════
          7. DINING
      ═══════════════════════════════════════════ */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
            <Image
              src="/images/mamboBeachHotel/beachside dining2.jpg"
              alt="Beachside Dining at Mambo Beach Hotel"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block mb-2">Dining</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-stone-900 mb-4">
              Home-cooked, served your way
            </h2>
            <p className="text-stone-600 font-light text-sm leading-relaxed mb-5">
              No buffets. No crowds. Our kitchen prepares fresh, authentic meals daily — served on your balcony, beachside, or wherever you prefer. Breakfast, lunch, or dinner on request.
            </p>
            <blockquote className="border-l-2 border-amber-400 pl-4 text-stone-500 text-sm italic">
              "The lobster and grilled fish were cooked to perfection. Felt like a mini honeymoon dinner all over again." — Moza ⭐⭐⭐⭐⭐
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. AMENITIES + GOOD TO KNOW
      ═══════════════════════════════════════════ */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amenities */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-stone-900 mb-5">Hotel Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: 'Beachside Location' },
                { icon: Waves, label: 'Mnemba Views' },
                { icon: Utensils, label: 'Meals On-Request' },
                { icon: Wifi, label: 'Free Wi-Fi' },
                { icon: Wind, label: 'Air Conditioning' },
                { icon: Compass, label: 'Free Parking' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-stone-700">
                  <div className="p-1.5 bg-ocean-50 rounded-lg text-ocean-600 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Good to know */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-stone-900 mb-5">Good to Know</h3>
            <div className="space-y-3 text-sm text-stone-600 font-light">
              {[
                'Extra beds & cots available — contact us to arrange',
                'Weddings, romantic dinners & private events catered for',
                'Beach bonfires available for guests under the stars',
                'Hen, stag & similar parties not accommodated',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="text-ocean-400 shrink-0 font-bold mt-px">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FAQS
      ═══════════════════════════════════════════ */}
      <section className="reveal-section px-6 lg:px-12 max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-stone-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-display font-semibold text-stone-900 hover:text-ocean-600 transition-colors flex items-center justify-between focus:outline-none cursor-pointer text-sm"
                >
                  <span>{faq.q}</span>
                  <span className="text-stone-400 font-normal text-xl ml-4 shrink-0">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-stone-500 font-light leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="reveal-section max-w-4xl mx-auto px-6 lg:px-12 text-center mb-16">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 mb-3">
          Ready for paradise?
        </h2>
        <p className="text-stone-500 mb-8 font-light">Only 5 rooms — don't miss your dates.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full shadow-lg group"
          >
            Book on Booking.com
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-full shadow-sm"
          >
            Direct Inquiry
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════ */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProperty="Mambo Beach Hotel"
      />

      {/* Full Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto flex flex-col animate-fade-in">
          <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-stone-950 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-ocean-600" />
              <span>Mambo Beach Hotel Gallery</span>
              <span className="text-sm font-normal text-stone-500">({GALLERY.length} photos)</span>
            </h3>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          {/* Category filter tabs */}
          <div className="bg-white border-b border-stone-200/50 px-6 py-3 flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'exterior', label: 'Exterior & Views' },
              { id: 'rooms', label: 'Rooms & Suites' },
              { id: 'dining', label: 'Dining & Cuisine' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${activeGalleryCategory === cat.id
                    ? 'bg-brand text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Images grid */}
          <div className="flex-grow max-w-7xl w-full mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.src}
                  onClick={() => setLightboxIndex(index)}
                  className="group aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer relative bg-stone-200"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-all duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
              {filteredImages.length === 0 && (
                <div className="col-span-3 text-center py-24">
                  <p className="text-stone-500">No photos in this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox — with touch swipe support */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col justify-between select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="p-5 flex items-center justify-between text-white">
            <span className="font-semibold text-sm">{lightboxIndex + 1} / {filteredImages.length}</span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-between px-3 sm:px-6">
            <button onClick={handlePrev} className="p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all hover:scale-105 z-10 shrink-0">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative flex-grow h-[75vh] px-2">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
              />
            </div>
            <button onClick={handleNext} className="p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all hover:scale-105 z-10 shrink-0">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="py-5 text-center text-stone-400 text-sm px-6 font-light">
            {filteredImages[lightboxIndex].alt}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          STICKY BOOKING BAR — appears after hero
      ═══════════════════════════════════════════ */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-2xl px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-black text-stone-900 text-lg leading-none">
              £62 <span className="text-sm font-normal text-muted">/ night</span>
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current text-amber-400" />)}
              <span className="text-muted text-xs ml-1">5/5 · All guests</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 border border-stone-200 text-stone-700 font-semibold rounded-xl text-sm hover:bg-stone-50 transition-colors cursor-pointer hidden sm:block"
            >
              Enquire
            </button>
            <Button
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm"
            >
              Book Now <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
