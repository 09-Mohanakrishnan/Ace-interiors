import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useState } from 'react';

interface OfferingDetailProps {
  onConsultationClick: () => void;
}

export default function OfferingDetail({ onConsultationClick }: OfferingDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { content, loading } = useContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaqIndex(null); // Reset FAQ on ID change
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-gray-400 font-bold">Loading Experience...</div>;

  const offerings = content?.offerings;
  if (!offerings || !offerings.items) {
    console.error("No offerings found in content", content);
    return <Navigate to="/" replace />;
  }

  const offering = offerings.items.find((item: any) => item.id === id);
  console.log("Rendering offering:", id, offering);

  if (!offering) {
    console.warn(`Offering with id "${id}" not found. Redirecting...`);
    return <Navigate to="/" replace />;
  }

  const features = offering.features
    ? offering.features.split(',').map((f: string) => f.trim()).filter(Boolean)
    : [];

  const galleryImages = offering.galleryImages
    ? offering.galleryImages.split(',').map((img: string) => img.trim()).filter(Boolean)
    : [];

  const faqs = offering.faqs
    ? offering.faqs.split(/,(?=[A-Z])/).map((faq: string) => {
        const parts = faq.split('|');
        return { 
          question: parts[0]?.trim(), 
          answer: parts[1]?.trim() 
        };
      }).filter((f: any) => f.question && f.answer)
    : [];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Back Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-500 hover:text-brand-orange transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={offering.image}
            alt={offering.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Services</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {offering.heroTitle || offering.title}
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {offering.heroDescription || offering.description}
            </p>
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-brand-black transition-all shadow-xl flex items-center space-x-2"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why Choose ACE for <br />
                <span className="text-brand-orange">{offering.title}?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {offering.detailedDescription || offering.description}
              </p>
            </motion.div>

            {/* Features Grid */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:bg-orange-50/50 transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-800">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {offering.title} — Design Inspirations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((img: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={img}
                    alt={`${offering.title} - View ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-brand-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to get started <br />with your {offering.title}?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Book a free consultation with our expert designers and get a personalized 3D design for your space.
          </p>
          <button
            onClick={onConsultationClick}
            className="bg-brand-orange text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-white hover:text-brand-black transition-all shadow-2xl shadow-brand-orange/20"
          >
            Book Free Consultation
          </button>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      </section>
    </div>
  );
}
