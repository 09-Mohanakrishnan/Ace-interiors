import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import { motion } from 'motion/react';
import { useContent } from '../hooks/useContent';
import { MapPin, Star, Award, CheckCircle, Users, Home as HomeIcon, Trophy, Clock } from 'lucide-react';

interface HomeProps {
  onConsultationClick: () => void;
}

export default function Home({ onConsultationClick }: HomeProps) {
  const { content } = useContent();
  const { stats, testimonials } = content;

  return (
    <>
      <Hero onConsultationClick={onConsultationClick} />

      {/* Chennai Interior Designers Section - "Top Interior Designers in Chennai" */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4 relative"
            >
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-56">
                  <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=600" alt="Interior 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden h-40">
                  <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600" alt="Interior 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden h-40">
                  <img src="/images/interior3.jpg" alt="Interior 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden h-56">
                  <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" alt="Interior 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-3 rounded-2xl shadow-xl shadow-brand-orange/30 flex items-center space-x-2 whitespace-nowrap">
                <Trophy className="w-5 h-5" />
                <span className="font-bold text-sm">#1 Rated in Chennai</span>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center space-x-2 bg-orange-50 text-brand-orange px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MapPin className="w-4 h-4" />
                <span>Chennai's Most Trusted</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Top Interior Designers <br />
                <span className="text-brand-orange">in Chennai</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                ACE Interiors is Chennai's highest-rated home interior design company, trusted by over 20,000 happy homeowners. We transform houses into dream homes — blending contemporary design with the warmth of South Indian living.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From compact apartments in OMR and Velachery to sprawling villas in ECR and Adyar, our experienced designers bring your vision to life with precision, quality materials, and an unwavering commitment to on-time delivery.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Star, label: '4.9/5 Rating', sub: 'Google Reviews' },
                  { icon: Award, label: '10-Year Warranty', sub: 'On all work' },
                  { icon: Users, label: '20,000+ Homes', sub: 'Delivered in Chennai' },
                  { icon: Clock, label: '45-Day Delivery', sub: 'Guaranteed' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onConsultationClick}
                className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-brand-black transition-all shadow-lg shadow-brand-orange/20 flex items-center space-x-2"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Book Free Consultation</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose ACE (moved above How It Works) */}
      <WhyUs />

      {/* How It Works */}
      <HowItWorks />

      <Services />

      {/* Stats / Orange Banner Section with animation */}
      <section className="py-24 bg-brand-orange text-white overflow-hidden relative">
        {/* Animated background circles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full border-4 border-white"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full border-8 border-white"
          />
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white"
          />
        </div>

        {/* Animated headline ticker */}
        <div className="mb-12 overflow-hidden border-y border-white/20 py-3">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-8 px-4">
                {['Award-Winning Home Interiors Delivered in Chennai', '✦', '20,000+ Happy Homeowners', '✦', '10-Year Warranty Guarantee', '✦', 'Delivered in Just 45 Days', '✦'].map((text, j) => (
                  <span key={j} className="text-orange-100 font-semibold text-sm uppercase tracking-widest">
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Award-Winning Home Interiors
            </h2>
            <p className="text-orange-100 text-lg">Delivered in Chennai — on time, every time.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
              >
                <motion.p
                  className="text-5xl md:text-6xl font-bold mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-orange-100 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Pricing onConsultationClick={onConsultationClick} />

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{testimonials.title}</h2>
            <p className="text-lg text-gray-600">{testimonials.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.items.map((testimonial: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to transform <br />
              your home?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join 20,000+ happy homeowners across Chennai. Book your free consultation today and get a 3D design for your dream home.
            </p>
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-brand-black transition-all transform hover:scale-105 shadow-2xl shadow-brand-orange/20"
            >
              Book Free Consultation
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
        </div>
      </section>
    </>
  );
}
