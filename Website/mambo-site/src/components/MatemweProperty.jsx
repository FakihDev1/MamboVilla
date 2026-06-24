"use client";

import React, { useState } from 'react';
import { 
  Anchor, Wind, Coffee, Compass, ArrowRight, Eye, 
  ShieldCheck, Waves, X, User, Mail, Calendar, Send, CheckCircle 
} from 'lucide-react';

export default function MatemweProperty() {
  const [activeTab, setActiveTab] = useState('mambo-beach');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Inquiry form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in Name and Email fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    console.log('Inquiry submitted:', formData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      checkIn: '',
      checkOut: '',
      guests: '2'
    });
    setSubmitted(false);
    setIsModalOpen(false);
  };

  return (
    <section id="matemwe" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="container">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-stone-100 p-1.5 rounded-full border border-stone-200 inline-flex shadow-sm">
            <button
              onClick={() => setActiveTab('mambo-beach')}
              className={`px-6 py-2.5 rounded-full text-sm font-display font-medium tracking-wide transition-all focus:outline-none ${
                activeTab === 'mambo-beach'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mambo Beach Hotel
            </button>
            <button
              onClick={() => setActiveTab('mambo-safari')}
              className={`px-6 py-2.5 rounded-full text-sm font-display font-medium tracking-wide transition-all focus:outline-none ${
                activeTab === 'mambo-safari'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mambo Hills Safari Lodge
            </button>
          </div>
        </div>

        {/* Conditional Rendering of Content */}
        {(() => {
          switch (activeTab) {
            case 'mambo-beach':
              return (
                <div className="animate-fade-in">
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

                      {/* Funnel Phase 1 CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                          href="https://www.booking.com/hotel/tz/mambo-beach-villas.html" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 text-center text-sm cursor-pointer"
                        >
                          <span>Book on Booking.com</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="px-6 py-4 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-semibold rounded-full text-center transition-colors text-sm cursor-pointer"
                        >
                          Direct Booking Inquiry
                        </button>
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
              );
            case 'mambo-safari':
              return (
                <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/60 p-8 md:p-12 shadow-sm animate-fade-in">
                  <h3 className="font-display font-bold text-2xl text-stone-800 mb-4">
                    Mambo Hills Safari Lodge Tab
                  </h3>
                  <p className="text-stone-500 font-light text-sm max-w-md mx-auto mb-8 leading-relaxed">
                    This content block can be duplicated and customized with specific information, features, and photo galleries for your Safari property.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setActiveTab('mambo-beach')}
                      className="px-6 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs font-semibold rounded-full transition-colors flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      <span>Back to Mambo Beach</span>
                    </button>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}

      </div>

      {/* Inquiry Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200/60 p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={resetForm}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-6" />
                <h3 className="font-display font-bold text-2xl text-stone-800 mb-3">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-stone-500 font-light text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our reservations coordinator will review your request for <strong>{formData.guests} guests</strong> (Dates: {formData.checkIn || 'N/A'} to {formData.checkOut || 'N/A'}) and contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-white text-sm font-bold rounded-full transition-colors w-full"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-stone-800 mb-2">
                    Direct Booking Inquiry
                  </h3>
                  <p className="text-stone-500 text-xs font-light">
                    Send an inquiry directly to Mambo Beach Hotel. Required fields are marked.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 w-full"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 w-full"
                    required
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>Check-In</span>
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>Check-Out</span>
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 w-full"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Total Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 w-full"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 mt-2 w-full cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
