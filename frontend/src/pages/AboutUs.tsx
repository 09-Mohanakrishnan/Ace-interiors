import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Target, 
  Users2, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '15+' },
  { label: 'Happy Homes', value: '5000+' },
  { label: 'Design Experts', value: '50+' },
  { label: 'Quality Checks', value: '144+' },
];

const values = [
  {
    title: 'Precision Engineering',
    description: 'Every cabinet and countertop is crafted using state-of-the-art machinery for unmatched finish and durability.',
    icon: Target
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden costs. We provide a detailed bill of quantities so you know exactly where your investment goes.',
    icon: ShieldCheck
  },
  {
    title: 'Customer Obsession',
    description: 'Our project managers are with you from the first sketch to the final handover, ensuring a stress-free journey.',
    icon: Users2
  }
];

export default function AboutUs({ onConsultationClick }: { onConsultationClick?: () => void }) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Designing Homes, <br />
              Delivering <span className="text-brand-orange">Dreams.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              For over 15 years, ACE Interiors has been at the forefront of luxury interior design and turnkey execution in Chennai and across Tamil Nadu. We believe your home should be a masterpiece of your own making, engineered with precision and built to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-brand-black mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Crafting Excellence Since 2009</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Started as a humble design studio in Chennai, ACE Interiors has grown into a multi-city powerhouse of interior innovation. Our journey began with a simple mission: to bridge the gap between creative interior design and flawless, durable execution.
                </p>
                <p>
                  We understood early on that a beautiful 3D design on a screen is only half the battle. The real magic happens in our state-of-the-art factories, where precision German machinery meets artisanal craftsmanship. This ensures every cabinet, wardrobe, and modular kitchen we deliver is built with millimeter precision.
                </p>
                <p>
                  Quality is not just a buzzword for us; it's our foundational pillar. We exclusively use marine-grade Boiler Water Proof (BWP) Plywood for our core structures, ensuring unparalleled resistance to moisture and borers—a critical requirement for the coastal climate of Chennai. Coupled with premium German hardware from brands like Hettich and Hafele, our interiors are engineered for a lifetime of smooth operation.
                </p>
                <p>
                  Today, we take pride in being a comprehensive turnkey solution provider. From conceptualization, civil work, electrical plumbing, and false ceilings, to the final installation of custom-designed modular furniture, we handle the entire spectrum of home interiors.
                </p>
              </div>
              <div className="mt-10 flex space-x-4">
                <div className="flex items-center space-x-2 text-brand-orange font-bold">
                  <Award className="w-6 h-6" />
                  <span>Award Winning Studio</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-orange font-bold">
                  <Sparkles className="w-6 h-6" />
                  <span>5000+ Projects Handed Over</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" 
                  alt="Team Working" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-orange text-white p-8 rounded-[2rem] shadow-xl hidden md:block">
                <div className="text-3xl font-black mb-1">15+</div>
                <div className="text-sm font-bold uppercase tracking-widest">Industry Leadership</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Section: Manufacturing & Materials */}
      <section className="py-24 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Our Uncompromised Standards</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">We don't just build interiors; we engineer them. Discover the materials and technology that make ACE Interiors the best choice for your home in Chennai.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-6">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">100% BWP Plywood</h3>
                    <p className="text-gray-400">All our core modules are crafted using genuine Boiling Water Proof (BWP) plywood, ensuring supreme longevity and water resistance.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-6">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">German Hardware</h3>
                    <p className="text-gray-400">We integrate premium, soft-close hardware from globally recognized German brands, ensuring your drawers and hinges glide effortlessly for decades.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-6">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Factory Finish</h3>
                    <p className="text-gray-400">Our modular units are cut, edge-banded, and finished in our high-tech facility, resulting in a flawless, seamless edge that manual carpentry cannot match.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-6">
                        <History className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">45-Day Delivery</h3>
                    <p className="text-gray-400">Time is money. Our optimized production line allows us to confidently promise and deliver modular interiors within an industry-leading 45 days.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">The ACE Way</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 hover:bg-orange-50 transition-colors group text-left"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange mb-6 shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-brand-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to start your <br /> own story?</h2>
          <button 
            onClick={onConsultationClick}
            className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-black transition-all shadow-xl flex items-center space-x-3 mx-auto"
          >
            <span>Book Your Free Session</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      </section>
    </div>
  );
}
