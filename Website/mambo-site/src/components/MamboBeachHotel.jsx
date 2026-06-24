"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Waves,
  Utensils,
  Wifi,
  Wind,
  Star,
  ArrowRight,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import InquiryModal from './InquiryModal';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How many rooms does Mambo Beach Hotel have?",
    a: "We are an exclusive, intimate 5-room boutique hotel. This small size is our greatest luxury advantage, offering guests absolute peace, quiet privacy, and highly personalized care far away from crowded, noisy resorts."
  },
  {
    q: "What dining services are available?",
    a: "We operate a dedicated central staff kitchen. Instead of mass-produced buffets, our staff prepares fresh, authentic, home-cooked style meals daily. Guests can request breakfast, lunch, and dinner, served directly to their room, private balcony, or beachside."
  },
  {
    q: "Can you host personal events or bonfires?",
    a: "Yes! Personal events such as weddings, family reunions, and romantic beach dinners can be fully catered for. We also host cozy beach bonfires regularly for our guests to gather under the stars."
  },
  {
    q: "Is there snorkeling nearby?",
    a: "Absolutely. Mambo Beach Hotel is located beachside, overlooking the Mnemba Island islet. Matemwe is the perfect snorkeling destination, and boat trips launch directly from the beach in front of the hotel. While we do not host these excursions ourselves, our team will gladly direct you to trusted local agencies that organize them."
  },
  {
    q: "What are your policies on extra beds, cots, and parties?",
    a: "Extra beds and cots are available upon request (please contact the hotel to arrange details). To preserve peace and quiet for our guests, the property does not accommodate hen, stag, or similar parties."
  }
];


const ALL_IMAGES = [
  { src: '/images/mamboBeachHotel/externalview10.jpeg', category: 'exterior', alt: 'Mambo Beach Hotel Aerial View' },
  { src: '/images/mamboBeachHotel/mnemba view.JPG', category: 'exterior', alt: 'Views of Mnemba Island' },
  { src: '/images/mamboBeachHotel/bedroom.JPG', category: 'rooms', alt: 'Spacious Oceanfront Suite' },
  { src: '/images/mamboBeachHotel/beachside dining.JPG', category: 'dining', alt: 'Beachside Dining Experience' },
  { src: '/images/mamboBeachHotel/balcony1.JPG', category: 'rooms', alt: 'Private Balcony & Ocean Views' },
  { src: '/images/mamboBeachHotel/externalview5.jpeg', category: 'exterior', alt: 'Poolside Lounge Area' },
  { src: '/images/mamboBeachHotel/externalview8.jpeg', category: 'exterior', alt: 'Crystal Clear Ocean Views' },
  { src: '/images/mamboBeachHotel/bed1.JPG', category: 'rooms', alt: 'King Size Bed with Ocean View' },
  { src: '/images/mamboBeachHotel/bed3.JPG', category: 'rooms', alt: 'Comfortable Bedroom Setup' },
  { src: '/images/mamboBeachHotel/balcony2.JPG', category: 'rooms', alt: 'Balcony Lounge Seating' },
  { src: '/images/mamboBeachHotel/bathroom.JPG', category: 'rooms', alt: 'Luxury En-suite Bathroom Vanity' },
  { src: '/images/mamboBeachHotel/shower1.JPG', category: 'rooms', alt: 'Spacious Rainfall Shower' },
  { src: '/images/mamboBeachHotel/shower2.JPG', category: 'rooms', alt: 'Modern Shower Design' },
  { src: '/images/mamboBeachHotel/minifridge.JPG', category: 'rooms', alt: 'In-suite Mini Bar' },
  { src: '/images/mamboBeachHotel/doorway.JPG', category: 'rooms', alt: 'Suite Entrance & Hardwood Details' },
  { src: '/images/mamboBeachHotel/dining.JPG', category: 'dining', alt: 'Central Dining Area' },
  { src: '/images/mamboBeachHotel/dining2.JPG', category: 'dining', alt: 'Indoor Restaurant Tables' },
  { src: '/images/mamboBeachHotel/food1.JPG', category: 'dining', alt: 'Fresh Seafood Dish' },
  { src: '/images/mamboBeachHotel/meal1.jpeg', category: 'dining', alt: 'Gourmet Zanzibar Cuisine' },
  { src: '/images/mamboBeachHotel/meal3.jpeg', category: 'dining', alt: 'Gourmet Zanzibar Cuisine' },
  { src: '/images/mamboBeachHotel/beachside dining2.jpg', category: 'dining', alt: 'Sunset Dining on the Beach' },
  { src: '/images/mamboBeachHotel/beachside view.jpg', category: 'exterior', alt: 'Matemwe Beachfront View' },
  { src: '/images/mamboBeachHotel/bed2.jpg', category: 'rooms', alt: 'Premium Double Room Setup' },
  { src: '/images/mamboBeachHotel/external view.jpg', category: 'exterior', alt: 'Resort Exterior & Palm Trees' }
];

export default function MamboBeachHotel() {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);


  // Block body scroll when modals/lightbox are open
  useEffect(() => {
    if (isGalleryOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen, isModalOpen]);

  // Handle keyboard events in Lightbox
  const filteredImages = activeGalleryCategory === 'all'
    ? ALL_IMAGES
    : ALL_IMAGES.filter(img => img.category === activeGalleryCategory);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  useGSAP(() => {
    // Hero Entrance Animation
    gsap.from(".hero-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".gallery-img", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.4
    });

    // Scroll Reveal for Sections
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section) => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full pb-24">
      {/* Immersive Property Hero Banner */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center py-20 px-6 lg:px-12 overflow-hidden bg-stone-900 mb-16">
        {/* Full-width background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/mamboBeachHotel/externalview8.jpeg"
            alt="Mambo Beach Hotel Ocean Views"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-900/40 to-stone-950/60"></div>
        </div>

        {/* Welcome Card Container */}
        <div className="relative z-10 max-w-3xl w-full bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="hero-content text-[11px] uppercase tracking-widest text-ocean-700 font-bold bg-ocean-50 py-1 px-3 rounded-full border border-ocean-100/50">
              Matemwe, Zanzibar
            </span>
            {/* Official Hotel Logo */}
            <div className="hero-content bg-stone-950 rounded-2xl p-4 shadow-md max-w-[220px] w-full">
              <img
                src="/images/mamboBeachHotel/Mambo beach hotel logo.jpg"
                alt="Mambo Beach Hotel Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="hero-content text-stone-500 font-display italic text-base sm:text-lg font-medium">
              Boutique Beachfront Luxury & Absolute Serenity
            </p>
            <div className="hero-content w-12 h-0.5 bg-gradient-to-r from-ocean-500 to-teal-500 rounded-full my-0.5"></div>
            <p className="hero-content text-stone-650 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              An exclusive 5-suite retreat situated directly on the white sands of Matemwe beach, overlooking the Mnemba Island islet. Savor personalized service, staff kitchen dining, and pristine coastal living.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Gallery Grid */}
      <section className="px-4 lg:px-8 max-w-screen-2xl mx-auto mb-24">
        <div className="relative group/grid max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh] min-h-[400px]">
            <div className="gallery-img md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('all'); }}>
              <img
                src="/images/mamboBeachHotel/externalview10.jpeg"
                alt="Mambo Beach Hotel Aerial"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="gallery-img rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('rooms'); }}>
              <img
                src="/images/mamboBeachHotel/bedroom.JPG"
                alt="Luxury Suite Interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="gallery-img rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('dining'); }}>
              <img
                src="/images/mamboBeachHotel/beachside dining.JPG"
                alt="Oceanfront Dining"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="gallery-img md:col-span-2 rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => { setIsGalleryOpen(true); setActiveGalleryCategory('rooms'); }}>
              <img
                src="/images/mamboBeachHotel/food1.JPG"
                alt="Balcony View"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md hover:bg-white text-stone-900 font-bold text-sm px-5 py-3 rounded-2xl shadow-md border border-stone-200/50 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer z-10"
          >
            <ImageIcon className="w-4 h-4 text-stone-600" />
            <span>Show all {ALL_IMAGES.length} photos</span>
          </button>
        </div>
      </section>

      {/* Core Proposition & Amenities */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
              The Intimate 5-Room Advantage
            </h2>
            <p className="text-stone-600 mb-4 leading-relaxed font-light">
              Mambo Beach Hotel is an <strong>exclusive 5-room boutique hotel</strong> situated directly beachside on Matemwe's white sands. By keeping our property small and intentional, we offer a massive luxury advantage: absolute peace, complete privacy, and highly personalized attention away from the crowded, noisy commercial resorts.
            </p>
            <p className="text-stone-600 mb-4 leading-relaxed font-light">
              Here, there are no crowds. Your cozy, air-conditioned room is a private sanctuary featuring a comfortable bed, private en-suite bathroom, and views overlooking the stunning <strong>Mnemba Island islet</strong>. Matemwe beach is the perfect place to stay if you are interested in snorkeling. While we do not organize excursions directly, our staff will gladly connect you with trusted local agencies that launch boat trips right from our shoreline.
            </p>
            <p className="text-stone-600 leading-relaxed font-light">
              Enjoy dedicated personal service from Azizi and our staff. From daily room servicing to custom travel bookings, we cater to your every request to make your paradise escape flawless.
            </p>
          </div>

          <div className="md:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <h3 className="font-display font-bold text-xl text-stone-900 mb-6">Hotel Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Beachside Location</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <Waves className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Mnemba Islet Views</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Meals On-Request</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Free Wi-Fi & Internet</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <Wind className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <div className="p-2 bg-ocean-50 rounded-lg text-ocean-600">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Free Parking</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <h3 className="font-display font-bold text-xl text-stone-900 mb-6">Good to Know</h3>
              <ul className="space-y-3.5 text-xs text-stone-500 font-light">
                <li className="leading-relaxed">
                  <strong className="text-stone-700 block font-semibold mb-0.5">Extra Beds:</strong>
                  Please contact the hotel for details about adding extra beds.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-stone-700 block font-semibold mb-0.5">Cot:</strong>
                  Please contact the hotel for details about adding a cot.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-stone-700 block font-semibold mb-0.5">Important Policies:</strong>
                  This property will not accommodate hen, stag or similar parties. Managed by a private host.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary & Events Section */}
      <section className="reveal-section px-6 lg:px-12 max-w-5xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
            <h3 className="font-display font-bold text-xl text-stone-900 mb-4">Home-Cooked Culinary Focus</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-4">
              Because we are an intimate 5-room property, our central kitchen rejects mass-produced buffet food. Instead, our dedicated staff prepares fresh, authentic, high-quality <strong>"home-cooked" style meals</strong> daily.
            </p>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
              Savor customized dining served exactly when and where you want it. Whether breakfast on your private balcony or fresh seafood served right on the beachside, our kitchen turns fresh local ingredients into amazing meals.
            </p>
            <div className="border-t border-stone-100 pt-4 text-xs italic text-stone-500 flex gap-2">
              <span>"nice hotel, food was amazing, staff well caring and catering"</span>
              <span className="font-bold shrink-0">— Moza</span>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block mb-3">
              Dining & Gathering
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
              Culinary Excellence & Private Events
            </h2>
            <p className="text-stone-600 mb-4 leading-relaxed font-light">
              Enjoy complete dining flexibility. You can request breakfast, lunch, and dinner directly from our staff kitchen.
            </p>
            <p className="text-stone-600 leading-relaxed font-light">
              Looking for a special celebration? <strong>Personal events (weddings, family gatherings, romantic dinners) can be catered for</strong> perfectly on our secure grounds. We recently held a spectacular <strong>beach bonfire gathering</strong> under the stars—bringing guests together for an unforgettable Zanzibari night.
            </p>
          </div>
        </div>
      </section>

      {/* Guest Experiences (Testimonials) */}
      <section className="reveal-section bg-stone-900 text-white py-24 mb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-16">
            Real Guest Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-3xl text-left border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">Leigh Kendall</p>
                <p className="text-stone-500 text-[10px] mb-4">Local Guide • 42 reviews • 37 weeks ago</p>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                  "This is a quiet gem right on Matemwe beach. Azizi and his staff made me feel so welcome and catered to our every need. The rooms were clean and serviced daily by a wonderful lady. My massage came to my room and so did my meals when I wanted. Tours and travel was booked as needed. Reasonable rates. Highly recommend."
                </p>
              </div>
              <div className="border-t border-stone-700/60 pt-4 text-[10px] text-stone-400 flex justify-between font-medium">
                <span>Rooms: 5/5</span>
                <span>Service: 5/5</span>
                <span>Location: 5/5</span>
              </div>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-3xl text-left border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">Ava Irwin</p>
                <p className="text-stone-500 text-[10px] mb-4">Holiday · Family • 9 reviews • 48 weeks ago</p>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                  "Lovely hotel, very welcoming and helpful staff. The hotel is right on the beach with a great view from the balconies. The cost was very reasonable, I would definitely stay here again."
                </p>
              </div>
              <div>
                <p className="text-[10px] text-amber-400 font-semibold mb-3">Highlights: Great view, Quiet, Great value</p>
                <div className="border-t border-stone-700/60 pt-4 text-[10px] text-stone-400 flex justify-between font-medium">
                  <span>Rooms: 5/5</span>
                  <span>Service: 5/5</span>
                  <span>Location: 5/5</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-3xl text-left border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">Moza</p>
                <p className="text-stone-500 text-[10px] mb-4">Guest Review</p>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                  "nice hotel, food was amazing, staff well caring and catering, beach side, enjoyed the waves, could see mnemba island"
                </p>
              </div>
              <div className="border-t border-stone-700/60 pt-4 text-[10px] text-stone-400 flex justify-between font-medium">
                <span>Rooms: 5/5</span>
                <span>Service: 5/5</span>
                <span>Location: 5/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="reveal-section px-6 lg:px-12 max-w-3xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-stone-900">
            Mambo Beach Hotel: FAQs
          </h2>
          <p className="text-stone-500 font-light text-sm mt-2">
            Everything you need to know about your stay at Mambo Beach Hotel.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-display font-semibold text-stone-900 hover:text-ocean-600 transition-colors flex items-center justify-between focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-stone-450 font-normal text-xl">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-stone-500 font-light leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* CTA Funnel */}
      <section className="reveal-section max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
          Ready for Paradise?
        </h2>
        <p className="text-stone-600 mb-10 font-light">
          Book instantly through our trusted OTA partner or send us a direct inquiry for personalized service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-ocean-600 hover:bg-ocean-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Book on Booking.com</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 font-bold rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
          >
            Direct Inquiry
          </button>
        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProperty="Mambo Beach Hotel"
      />

      {/* Interactive Photo Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto flex flex-col animate-fade-in">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-stone-950 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-ocean-600" />
              <span>Mambo Beach Hotel Gallery</span>
              <span className="text-sm font-normal text-stone-500">({ALL_IMAGES.length} photos)</span>
            </h3>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          {/* Categories Tab Bar */}
          <div className="bg-white border-b border-stone-200/50 px-6 py-3 flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'exterior', label: 'Exterior & Views' },
              { id: 'rooms', label: 'Rooms & Suites' },
              { id: 'dining', label: 'Dining & Cuisine' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeGalleryCategory === cat.id
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className="flex-grow max-w-7xl w-full mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.src}
                  onClick={() => setLightboxIndex(index)}
                  className="group aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/40 shadow-sm bg-stone-200 cursor-pointer relative"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-all duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {filteredImages.length === 0 && (
              <div className="text-center py-24">
                <p className="text-stone-500">No photos in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Slider Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col justify-between select-none">
          {/* Top panel */}
          <div className="p-6 flex items-center justify-between text-white z-10">
            <span className="font-semibold text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image & navigation */}
          <div className="flex-grow flex items-center justify-between px-4 relative max-h-[85vh]">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-stone-900/80 hover:bg-stone-850 text-white transition-all hover:scale-105 active:scale-95 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-[90%] max-h-full flex items-center justify-center p-4">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
              />
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-stone-900/80 hover:bg-stone-850 text-white transition-all hover:scale-105 active:scale-95 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="p-8 text-center text-stone-300 font-light text-sm bg-gradient-to-t from-black/80 to-transparent">
            {filteredImages[lightboxIndex].alt}
          </div>
        </div>
      )}
    </div>
  );
}
