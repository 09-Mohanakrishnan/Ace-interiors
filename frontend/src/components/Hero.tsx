import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

export default function Hero({ onConsultationClick }: { onConsultationClick?: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '2 BHK Apartment'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const API_URL = ''; // Relative path handled by Vite proxy
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Property Type: ${formData.propertyType}`,
          source: 'Hero Quote Form'
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', propertyType: '2 BHK Apartment' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || 'Failed to send lead'}`);
      }
    } catch (err) {
      console.error("Failed to send lead:", err);
      alert("Connection error. Please ensure the backend is running on Port 5001.");
    } finally {
      setIsSending(false);
    }
  };

  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Modern Interior Design"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{hero.trustBadge}</span>
            </div>
            <h1 className="text-1xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 mt-4">
              {Array.isArray(hero.title) ? (
                hero.title.map((line: string, i: number) => (
                  <span
                    key={i}
                    className={`block ${i === 1 ? 'text-brand-orange' : ''}`}
                  >
                    {line}
                  </span>
                ))
              ) : (
                hero.title
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onConsultationClick}
                className="bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-black transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl shadow-brand-orange/20"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/projects"
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all flex items-center justify-center"
              >
                <span>View Portfolio</span>
              </Link>
            </div>

            <div className="mt-24 grid grid-cols-3 gap-6 border-t border-white/20 pt-8 max-w-md ">
              <div className="flex flex-col items-center sm:items-start">
                <Shield className="w-6 h-6 text-brand-orange mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-300">10 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <Clock className="w-6 h-6 text-brand-orange mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-300">30 Days Delivery</span>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <Star className="w-6 h-6 text-brand-orange mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-300">500+ Homes</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card for Quick Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-md ml-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Quote</h3>
              <p className="text-gray-500 mb-6">Fill in the details to get an estimate for your home interiors.</p>

              {isSubmitted ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Thank You!</h4>
                  <p className="text-sm">Your request has been saved. Our expert will contact you shortly.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all bg-white text-gray-900"
                    >
                      <option>1 BHK Apartment</option>
                      <option>2 BHK Apartment</option>
                      <option>3 BHK Apartment</option>
                      <option>Villa / Independent House</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-black transition-all shadow-lg shadow-brand-orange/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Sending...' : 'Get Free Estimate'}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-4">
                    By clicking, you agree to our terms and conditions.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
