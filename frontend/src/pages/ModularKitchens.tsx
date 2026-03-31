import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface ModularKitchensProps {
  onConsultationClick: () => void;
}

export default function ModularKitchens({ onConsultationClick }: ModularKitchensProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e1502da027a?auto=format&fit=crop&q=80&w=2000" 
            alt="Modular Kitchen" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Best Modular <span className="text-brand-orange">Kitchens in Chennai</span></h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your cooking space with the top-rated modular kitchen designers in Tamil Nadu. We deliver smart, space-saving, and stunning kitchen interiors tailored to your culinary style and space requirements. Featuring 100% BWP Plywood and premium German hardware for a lifetime of durability.
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

      <section className="py-24 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Kitchen Layouts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">Choosing the right layout is the first step to an efficient kitchen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'L-Shaped Kitchen', desc: 'Perfect for small to medium spaces, providing ample counter space.', img: 'https://images.unsplash.com/photo-1556912177-c540306fa5a7?auto=format&fit=crop&q=80&w=800' },
              { title: 'U-Shaped Kitchen', desc: 'Ideal for large families, offering maximum storage and prep area.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800' },
              { title: 'Island Kitchen', desc: 'A modern favorite that adds a multi-functional social hub.', img: 'https://images.unsplash.com/photo-1556912178-5e87609a0604?auto=format&fit=crop&q=80&w=800' }
            ].map((layout, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img src={layout.img} alt={layout.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{layout.title}</h3>
                  <p className="text-gray-600">{layout.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Why ACE for Kitchens */}
      <section className="py-24 bg-white text-gray-900 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-brand-black">Why Choose ACE for Your <br /><span className="text-brand-orange">Modular Kitchen?</span></h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    A kitchen is the heart of every Indian home. The intense cooking, high humidity, and heavy usage demand materials that can withstand extreme conditions. As a leading interior design firm in Chennai, we understand these local challenges perfectly.
                  </p>
                  <p>
                    Unlike standard factory kitchens, an ACE Modular Kitchen is entirely custom-engineered. We assess your ergonomic needs, storage requirements (from heavy utensils to delicate crockery), and cooking habits before drafting a 3D visualization. Our designers focus on the 'Work Triangle'—the optimal distance between your sink, stove, and refrigerator—ensuring maximum efficiency.
                  </p>
                  <p>
                    Furthermore, the coastal climate of Chennai requires absolute moisture resistance. We <strong>never compromise</strong> by using MDF or particle board for kitchen carcasses. Every ACE kitchen is built using 100% Boiling Water Proof (BWP) Plywood, guaranteed to remain termite and borer-free.
                  </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                    <ChefHat className="w-10 h-10 text-brand-orange mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Ergonomic Design</h3>
                    <p className="text-sm text-gray-500">Customized counter heights and optimal work triangles.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                    <Star className="w-10 h-10 text-brand-orange mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">BWP Plywood</h3>
                    <p className="text-sm text-gray-500">100% waterproof marine-grade core materials.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center mt-6">
                    <CheckCircle className="w-10 h-10 text-brand-orange mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Space Optimization</h3>
                    <p className="text-sm text-gray-500">Clever pull-outs and tall units to maximize storage.</p>
                </div>
                <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100 shadow-sm text-center mt-6">
                    <ArrowRight className="w-10 h-10 text-brand-orange mx-auto mb-4" />
                    <h3 className="font-bold text-brand-orange mb-2">45-Day Install</h3>
                    <p className="text-sm text-gray-600">Factory-finished modules delivered and installed on time.</p>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1556911220-e1502da027a?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] shadow-2xl" alt="Materials" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-8 italic text-brand-orange">Premium Material Palette</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in beauty that lasts. Our kitchens are built with calibrated BWR plywood and finished with world-class surface materials.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Core', value: 'BWP/BWR Plywood' },
                  { label: 'Finish', value: 'High Gloss Acrylic' },
                  { label: 'Hardware', value: 'Hettich / Hafele' },
                  { label: 'Countertop', value: 'Quartz / Granite' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kitchen Design FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How long does it take for installation?', a: 'Typically 45 days from the date of design finalization.' },
              { q: 'Which material is best for Indian kitchens?', a: 'Boiling Water Resistant (BWR) or Boiling Water Proof (BWP) Plywood is highly recommended due to high moisture levels.' },
              { q: 'Do you provide maintenance?', a: 'Yes, we provide periodic service checks for the first year and a 10-year warranty on materials.' }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <h4 className="text-xl font-bold mb-3 flex items-start">
                  <span className="text-brand-orange mr-3">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-gray-400 leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
             <button 
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-black transition-all shadow-2xl shadow-brand-orange/20"
            >
              Consult with a Kitchen Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
