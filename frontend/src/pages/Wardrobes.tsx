import React from 'react';
import { motion } from 'motion/react';
import { Package, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface WardrobesProps {
  onConsultationClick: () => void;
}

export default function Wardrobes({ onConsultationClick }: WardrobesProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000"
            alt="Wardrobes"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Custom <span className="text-brand-orange">Wardrobes in Chennai</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Maximize your storage with beautifully crafted, custom wardrobes designed to fit every space. From sliding doors to walk-in closets, we create wardrobes that are as functional as they are stunning.
            </p>
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-brand-black transition-all"
            >
              Get a Free Quote
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Wardrobe Styles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose from a variety of wardrobe designs to suit your bedroom and lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sliding Door Wardrobes', desc: 'Space-saving design perfect for smaller rooms with a modern, sleek look.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800' },
              { title: 'Hinged Door Wardrobes', desc: 'Classic and timeless design offering maximum accessibility and visibility.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800' },
              { title: 'Walk-In Closets', desc: 'Luxury walk-in wardrobe designs that transform your storage into a fashion showroom.', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800' }
            ].map((style, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img src={style.img} alt={style.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                  <p className="text-gray-600">{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Choose ACE for Your <br /><span className="text-brand-orange">Wardrobe?</span></h2>
              <div className="space-y-6">
                {[
                  { icon: Package, title: 'Custom Sizing', desc: 'Every wardrobe is designed and built to your exact dimensions and requirements.' },
                  { icon: Star, title: 'Premium Finishes', desc: 'Choose from High Gloss, Matte, Acrylic, and Laminate finishes.' },
                  { icon: CheckCircle, title: 'Smart Organization', desc: 'Internal fittings including pull-outs, shoe racks, and tie holders for maximum organization.' },
                  { icon: ArrowRight, title: '30-Day Delivery', desc: 'Fast turnaround from design to installation in just 30 days.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] shadow-2xl" alt="Custom Wardrobe" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to organize your space?</h2>
          <p className="text-gray-400 mb-10 text-lg">Get a free consultation and 3D design for your dream wardrobe in Chennai.</p>
          <button
            onClick={onConsultationClick}
            className="bg-brand-orange text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-black transition-all shadow-2xl shadow-brand-orange/20"
          >
            Book Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
