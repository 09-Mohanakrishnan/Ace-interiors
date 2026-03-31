import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Bed, Sofa, Bath, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InteriorsProps {
  onConsultationClick: () => void;
}

const services = [
  {
    title: 'Modular Kitchen',
    description: 'Functional and aesthetic kitchen designs tailored to your cooking style.',
    icon: ChefHat,
    image: './images/modular.jpg',
    href: '/modular-kitchens'
  },
  {
    title: 'Bedroom',
    description: 'Cozy and personalized bedroom interiors for your ultimate comfort.',
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=1200',
    href: '/bedroom'
  },
  {
    title: 'Living Room',
    description: 'Elegant living spaces that reflect your personality and lifestyle.',
    icon: Sofa,
    image: './images/livingroom.jpg',
    href: '/living-room'
  },
  {
    title: 'Wardrobes',
    description: 'Custom storage solutions for a clutter-free home.',
    icon: Bath, // Using Bath as a generic icon if no Wardrobe icon
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200',
    href: '/wardrobes'
  }
];

export default function Interiors({ onConsultationClick }: InteriorsProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Premium Home <span className="text-brand-orange">Interiors</span></h1>
            <p className="text-xl text-gray-300 mb-8">
              From modular kitchens to full home renovations, we bring your dream home to life with expert designers and quality craftsmanship.
            </p>
            <button 
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-brand-black transition-all shadow-lg shadow-brand-orange/20"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Interior Solutions</h2>
            <p className="text-lg text-gray-600">Expertly crafted designs for every corner of your home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 font-medium">{service.description}</p>
                  <Link to={service.href} className="inline-flex items-center space-x-2 text-brand-orange font-bold hover:translate-x-2 transition-transform">
                    <span>Explore Designs</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Interiors */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">The ACE Advantage</h2>
              <div className="space-y-6">
                {[
                  { title: '45-Day Delivery', desc: 'Get moved into your new home in record time.' },
                  { title: '10-Year Warranty', desc: 'Quality materials backed by long-term assurance.' },
                  { title: 'Expert Designers', desc: 'Work with the best interior talent in India.' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs, just honest estimates.' }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000" 
                alt="ACE Quality" 
                className="rounded-[3rem] shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl max-w-xs">
                <p className="text-gray-600 italic">"The process was so smooth, and the result is absolutely stunning!"</p>
                <p className="font-bold mt-4 text-brand-orange">- Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
