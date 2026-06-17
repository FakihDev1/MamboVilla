import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, MessageSquare, Send, CheckCircle, ExternalLink } from 'lucide-react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: 'matemwe',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields (Name, Email, Phone).');
      return;
    }
    setError('');
    setSubmitted(true);
    // In production, this would submit the form data to an API
    console.log("Inquiry Submitted:", formData);
  };

  const otaLinks = [
    { 
      name: "TripAdvisor (Matemwe)", 
      url: "https://www.tripadvisor.co.uk/Hotel_Review-g616017-d23831648-Reviews-Mambo_Beach_Villas-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html" 
    },
    { 
      name: "Facebook Official Page", 
      url: "https://www.facebook.com/p/Mambo-villa-61570228978096/" 
    }
  ];

  return (
    <section id="inquire" className="py-24 bg-stone-100 border-t border-stone-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Info and Booking Portal Linkouts */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-bold block mb-3">
              Plan Your Stay
            </span>
            <h2 className="font-display font-bold text-4xl text-stone-800 tracking-tight mb-6">
              Reservations & General Inquiries
            </h2>
            <p className="text-stone-600 font-light mb-8 leading-relaxed text-sm md:text-base">
              Submit your inquiry using the reservation form, and our booking coordinator will respond with availability and rates within 12 hours.
            </p>

            {/* Direct Booking Partner Links */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-sm mb-8">
              <h3 className="font-display font-bold text-lg text-stone-800 mb-4">
                Book on Partner Platforms
              </h3>
              <p className="text-stone-500 text-xs font-light mb-6">
                Prefer using established travel booking platforms? You can view real-time dates and book our Matemwe property through the following official channels:
              </p>
              <div className="flex flex-col gap-3">
                {otaLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl transition-colors font-medium text-stone-700 text-sm"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-3 text-sm text-stone-600">
              <div>
                <span className="font-semibold text-stone-800 block">WhatsApp / Phone:</span>
                <a href="tel:+255748401847" className="font-mono text-teal-600 hover:underline">
                  +255 748 401 847
                </a>
              </div>
              <div>
                <span className="font-semibold text-stone-800 block">General Support:</span>
                <span className="font-mono">info@mambovillas.com</span>
              </div>
            </div>
          </div>

          {/* Right: Custom Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-stone-200/60 shadow-lg relative">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-6" />
                <h3 className="font-display font-bold text-2xl text-stone-800 mb-3">
                  Inquiry Received!
                </h3>
                <p className="text-stone-500 font-light text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name}</strong>. Our reservations manager is processing your request for <strong>{formData.property === 'matemwe' ? 'Mambo Beach Villa (Matemwe)' : formData.property === 'mikumi' ? 'Mambo Hills Safari Lodge (Mikumi)' : 'Zanzibar & Safari Package'}</strong>. We will contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-full transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-stone-800 mb-2">
                    Inquiry Form
                  </h3>
                  <p className="text-stone-500 text-xs font-light">
                    Fields marked with <span className="text-red-500">*</span> are required.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-700 text-xs p-4 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                {/* Form Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Full Name <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Address <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp / Phone <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 555-0199"
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700">
                      Select Destination
                    </label>
                    <select
                      name="property"
                      value={formData.property}
                      onChange={handleChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    >
                      <option value="matemwe">Mambo Beach Villa (Matemwe, Zanzibar)</option>
                      <option value="mikumi">Mambo Hills Safari Lodge (Mikumi)</option>
                      <option value="combined">Zanzibar Beach & Safari Package (Combined)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Check-In</span>
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Check-Out</span>
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-stone-700">
                      Total Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Special Notes or Requests</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Provide details about your travel plans, dietary requirements, or room preference..."
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 bg-stone-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Booking Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
