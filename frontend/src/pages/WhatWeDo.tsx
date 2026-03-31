import React from 'react';
import { motion } from 'motion/react';
import { 
  PencilRuler, 
  Settings2, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  MonitorCheck,
  Factory,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

const processSteps = [
  {
    title: 'Personal Consultation',
    description: 'We start by understanding your lifestyle, taste, and functional requirements. Every home is a blank canvas.',
    icon: PencilRuler,
    color: 'bg-blue-500'
  },
  {
    title: '3D Visualization',
    description: 'See your home before it’s built. Our designers create photorealistic 3D renders of every room.',
    icon: MonitorCheck,
    color: 'bg-purple-500'
  },
  {
    title: 'Manufacturing',
    description: 'Your furniture is precision-crafted in our automated factories using world-class technology.',
    icon: Factory,
    color: 'bg-brand-orange'
  },
  {
    title: 'Installation & Quality',
    description: 'Our expert team installs everything with obsessive attention to detail, followed by a 144-point quality check.',
    icon: Wrench,
    color: 'bg-emerald-500'
  }
];

export default function WhatWeDo({ onConsultationClick }: { onConsultationClick?: () => void }) {
  const { content } = useContent();
  const { offerings } = content;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-brand-black text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Where <span className="text-brand-orange text-outline-white">Vision</span> <br />
              Meets Precision.
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              From the first sketch to the final handover, we manage every aspect of your home interior journey with unmatched excellence.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange/30 via-transparent to-transparent" />
      </section>

      {/* Services Grid (Redirected from Home) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Specialized solutions for every corner of your home, designed to balance aesthetics and utility.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.items.map((item: any, index: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/5]"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-10 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        {item.description}
                    </p>
                    <Link 
                      to={`/offering/${item.id}`}
                      className="inline-flex items-center space-x-2 text-brand-orange font-bold uppercase tracking-widest text-xs"
                    >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The ACE Process */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-gray-900 mb-6">Execution is Everything.</h2>
              <p className="text-xl text-gray-600 mb-8">
                A design is only as good as its implementation. We've optimized every stage of the interior process to eliminate delays and ensure perfect quality.
              </p>
              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <div key={step.title} className="flex items-start space-x-6 p-6 bg-white rounded-3xl border border-gray-100 hover:border-brand-orange/50 transition-all hover:shadow-xl hover:shadow-brand-orange/5">
                    <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative"
            >
                <div className="aspect-[3/4] bg-gray-200 rounded-[4rem] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80" 
                      alt="Construction" 
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-brand-orange/90 backdrop-blur-xl text-white rounded-[3rem] w-80 text-center shadow-2xl scale-110">
                    <div className="text-4xl font-black mb-2">45-DAY</div>
                    <div className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Guaranteed Delivery</div>
                    <p className="text-xs text-orange-100 italic opacity-80">"Wait or we pay your rent"</p>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Material Quality Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-16">The Science of Durability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: 'BWP Plywood', desc: 'Boiling Water Proof grade for ultimate humidity resistance.' },
                    { title: 'German Hardware', desc: 'Soft-close hinges and sliders from Hettich & Hafele.' },
                    { title: 'Anti-Borer Plywood', desc: '100% protection against termites and borers.' },
                    { title: 'Zero-Gap Finish', desc: 'Automated edge-banding for seamless, moisture-proof joints.' }
                ].map((feature) => (
                    <div key={feature.title} className="p-8 border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all group hover:bg-gray-900 border-b-4 hover:border-b-brand-orange">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-orange mb-6 mx-auto group-hover:bg-white/10">
                           <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-white">{feature.title}</h4>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">See it in action?</h2>
          <button 
            onClick={onConsultationClick}
            className="inline-flex items-center space-x-3 bg-white text-brand-orange px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all shadow-2xl"
          >
            <span>Book Design Experience</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
