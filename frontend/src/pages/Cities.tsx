import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, ArrowRight, Star } from 'lucide-react';

interface CitiesProps {
  onConsultationClick: () => void;
}

const chennaiLocales = [
  {
    name: 'Anna Nagar',
    address: '2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040',
    phone: '+91 97879 11133',
    experienceCenter: 'ACE Premiere Studio - Anna Nagar',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'OMR - Navalur',
    address: 'OMR Road, Navalur, Chennai, Tamil Nadu 603103',
    phone: '+91 97879 11133',
    experienceCenter: 'Modular Kitchen Hub - OMR',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Adyar',
    address: 'LB Road, Adyar, Chennai, Tamil Nadu 600020',
    phone: '+91 97879 11133',
    experienceCenter: 'Luxury Design Gallery - Adyar',
    image: './images/design.jpg'
  },
  {
    name: 'Velachery',
    address: '100 Feet Road, Velachery, Chennai, Tamil Nadu 600042',
    phone: '+91 97879 11133',
    experienceCenter: 'Home Interiors Experience - Velachery',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Cities({ onConsultationClick }: CitiesProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-orange-50/50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Expert Designers in <span className="text-brand-orange">Chennai</span></h1>
            <p className="text-xl text-gray-600 mb-10">Transforming Chennai homes with premium modular kitchens and complete home interiors. Visit our local experience centers today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={onConsultationClick}
                className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-brand-orange/20 transition-all"
              >
                Book a Visit in Chennai
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Chennai Experience Centers</h2>
            <p className="text-lg text-gray-500 mt-4">We are right where you are. Explore our locations across the city.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {chennaiLocales.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 group"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg">
                    <span className="text-lg font-black text-brand-black">{city.name}</span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{city.experienceCenter}</h3>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-start space-x-3 text-gray-600">
                      <MapPin className="w-5 h-5 mt-1 text-gray-400" />
                      <p className="text-lg">{city.address}</p>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-600">
                      <Phone className="w-5 h-5 mt-1 text-gray-400" />
                      <p className="text-lg">{city.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={onConsultationClick}
                      className="flex items-center justify-center space-x-2 py-4 rounded-2xl border border-gray-200 hover:border-brand-orange hover:text-brand-orange font-bold transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Inquiry</span>
                    </button>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 py-4 rounded-2xl bg-brand-black text-white hover:bg-brand-orange font-bold transition-all text-center"
                    >
                      <span>Direction</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chennai Service Area */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-16">Serving All of Chennai</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale">
            {['ECR Road', 'T. Nagar', 'Porur', 'Tambaram', 'Mylapore', 'Perambur', 'Madipakkam', 'Ambattur'].map((c) => (
              <div key={c} className="py-8 border border-white/10 rounded-2xl">
                <span className="text-xl font-bold">{c}</span>
              </div>
            ))}
          </div>
          <p className="mt-16 text-gray-400 text-lg italic">The most trusted interior designer in Chennai.</p>
        </div>
      </section>
    </div>
  );
}
