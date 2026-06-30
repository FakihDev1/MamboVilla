import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Waves, Utensils, Wind, Wifi, MapPin } from 'lucide-react';
import Button from '@/components/Button';

export default function HomeLanding() {
  return (
    <div className="w-full">

      {/* ═══ HERO: Full-bleed destination photography ═══ */}
      <section className="relative w-full h-[75svh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/mamboBeachHotel/beachside view.jpg"
          alt="Matemwe Beach, Zanzibar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient: darkest at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-stone-900/5" />

        <div className="relative z-10 px-6 lg:px-16 pb-16 lg:pb-24 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">Matemwe, Zanzibar</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Your private<br />beachfront escape.
          </h1>

          <p className="text-stone-300 text-base sm:text-lg font-light mb-6 max-w-md leading-relaxed">
            5 rooms. Direct beach access. Mnemba Island views. Home-cooked meals. From £62 per night.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-white text-sm font-semibold">5/5</span>
            <span className="text-stone-400 text-sm">· Rated by all guests</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="/mambo-beach"
              className="px-7 py-3.5 rounded-2xl shadow-lg text-sm group"
            >
              <span>Explore Mambo Beach Hotel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="glass"
              className="px-7 py-3.5 rounded-2xl text-sm"
            >
              Book on Booking.com
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="bg-white border-b border-stone-100 px-6 lg:px-16 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <blockquote className="text-stone-600 text-sm font-light italic text-center sm:text-left max-w-xl">
            "A quiet gem right on Matemwe beach — Azizi and his staff made me feel so welcome."
            <span className="text-stone-500 not-italic font-semibold ml-2">— Leigh Kendall</span>
          </blockquote>
          <div className="flex items-stretch divide-x divide-stone-200 shrink-0">
            {[
              { value: '5', label: 'Rooms only' },
              { value: '5/5', label: 'Guest rating' },
              { value: '£62', label: 'From / night' },
            ].map(({ value, label }) => (
              <div key={label} className="px-5 text-center first:pl-0 last:pr-0">
                <p className="font-display font-black text-stone-900 text-xl">{value}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROPERTY: Mambo Beach Hotel ═══ */}
      <section className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">

          {/* Hero photo — dominant */}
          <Link
            href="/mambo-beach"
            className="lg:col-span-3 rounded-3xl overflow-hidden relative cursor-pointer group min-h-[300px] lg:min-h-[480px] block"
            aria-label="View Mambo Beach Hotel"
          >
            <Image
              src="/images/mamboBeachHotel/mnemba view.JPG"
              alt="Mambo Beach Hotel — Mnemba Island Views, Zanzibar"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Open Now
              </span>
              <h2 className="font-display text-white font-black text-2xl sm:text-3xl">Mambo Beach Hotel</h2>
              <p className="text-stone-300 text-sm mt-1">Matemwe, Zanzibar · 5 rooms · Direct beachfront</p>
            </div>
          </Link>

          {/* Info + booking panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand font-bold block mb-3">Zanzibar Beachfront</span>
              <h3 className="font-display font-bold text-2xl text-stone-900 mb-5">Why guests love it</h3>
              <div className="space-y-3.5">
                {[
                  { icon: Waves, text: 'Direct beach access & Mnemba Island snorkelling' },
                  { icon: Utensils, text: 'Home-cooked meals served on request, anywhere' },
                  { icon: Wind, text: 'Air-conditioned rooms with private en-suite' },
                  { icon: Wifi, text: 'Free Wi-Fi & free parking included' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="p-2 bg-ocean-50 rounded-xl text-ocean-600 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking panel */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 mt-auto">
              <p className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">Starting from</p>
              <p className="font-display font-black text-3xl text-stone-900 mb-4">
                £62 <span className="text-base font-normal text-muted">/ night</span>
              </p>
              <Button
                href="/mambo-beach"
                className="w-full py-3.5 rounded-xl shadow-sm text-sm mb-2 group/btn"
              >
                <span>View Rooms & Book</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <a
                href="https://www.booking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 text-brand hover:text-brand-hover font-semibold text-sm transition-colors"
              >
                Book on Booking.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SAFARI: Coming Soon ═══ */}
      <section className="px-6 lg:px-16 pb-20 max-w-7xl mx-auto">
        <Link
          href="/mambo-safari"
          className="w-full flex items-center gap-5 sm:gap-8 bg-stone-950 hover:bg-stone-900 rounded-3xl p-6 lg:p-8 text-left transition-colors group cursor-pointer"
        >
          <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden relative">
            <Image
              src="/images/Mambo Hills Safari Lodge logo.jpg"
              alt="Mambo Hills Safari Lodge"
              fill
              sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 64px"
              className="object-contain"
            />
          </div>
          <div className="flex-grow min-w-0">
            <span className="inline-block bg-amber-600/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 border border-amber-600/20">
              Coming Soon
            </span>
            <h3 className="font-display font-bold text-white text-lg lg:text-xl mb-1">Mambo Hills Safari Lodge</h3>
            <p className="text-stone-400 text-sm font-light truncate">Mikumi National Park, Tanzania · Now taking expressions of interest</p>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      </section>

    </div>
  );
}
