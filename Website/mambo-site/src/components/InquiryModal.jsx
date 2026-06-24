"use client";

import React, { useState } from 'react';
import { X, Calendar, User, Mail, Users, Send, CheckCircle } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, defaultProperty = 'Mambo Beach Hotel' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in Name and Email.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Submit logic goes here (e.g., Formspree / Cloudflare worker)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div>
            <h3 className="font-display font-bold text-2xl text-stone-900">Direct Inquiry</h3>
            <p className="text-stone-500 text-sm mt-1">For {defaultProperty}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-stone-50 hover:bg-stone-100 text-stone-500 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-ocean-500 mx-auto mb-4" />
              <h4 className="font-display font-bold text-xl text-stone-900 mb-2">Inquiry Received</h4>
              <p className="text-stone-600 text-sm">
                Thank you, {formData.name}. We've received your inquiry for your stay and will get back to you at {formData.email} shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-400" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:border-ocean-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:border-ocean-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" /> Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:border-ocean-500 focus:bg-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" /> Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:border-ocean-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" /> Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:border-ocean-500 focus:bg-white transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1em'
                  }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              {/* Cloudflare Turnstile Placeholder */}
              <div className="mt-2 bg-stone-50 border border-stone-200 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-ocean-500 border-t-transparent animate-spin"></div>
                <span className="text-xs text-stone-500 font-medium">Verifying you are human...</span>
                <span className="text-[10px] text-stone-400">(Cloudflare Turnstile Widget Placeholder)</span>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-4 bg-ocean-600 hover:bg-ocean-500 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
