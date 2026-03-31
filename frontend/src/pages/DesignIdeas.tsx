import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ArrowRight } from 'lucide-react';

interface DesignIdeasProps {
  onConsultationClick: () => void;
}

const designs = [
  {
    category: 'Modern Living Room',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    tags: ['Minimalist', 'Neutral Colors']
  },
  {
    category: 'Luxury Bedroom',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=800',
    tags: ['Plush', 'Wood Accents']
  },
  {
    category: 'Sleek Kitchen',
    image: "./images/sleek-kitchen.jpg",
    tags: ['Handleless', 'Island']
  },
  {
    category: 'Compact Study',
    image: "./images/compact-study.jpg",
    tags: ['Space Saving', 'Home Office']
  },
  {
    category: 'Rustic Dining',
    image: "./images/rustic-dining.jpg",
    tags: ['Wood', 'Natural Light']
  },
  {
    category: 'Chic Bathroom',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
    tags: ['Marble', 'Minimalist']
  }
];

export default function DesignIdeas({ onConsultationClick }: DesignIdeasProps) {
  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Interior Design <span className="text-brand-orange">Ideas</span></h1>
              <p className="text-lg text-gray-600">Get inspired by thousands of professional designs for every room in your home.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-orange transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search design ideas..." 
                  className="pl-12 pr-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all w-full md:w-64"
                />
              </div>
              <button className="p-4 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white border-b border-gray-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4 whitespace-nowrap">
            {['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Dining Room', 'Home Office', 'Kids Room'].map((cat) => (
              <button 
                key={cat} 
                className="text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors uppercase tracking-widest px-2"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={design.image} 
                    alt={design.category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold mb-2">{design.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div 
                  onClick={onConsultationClick}
                  className="p-4 flex items-center justify-between text-gray-400 group-hover:text-brand-orange text-sm font-bold cursor-pointer hover:bg-orange-50/50 transition-all"
                >
                  <span className="uppercase tracking-widest">Consult Designer</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={onConsultationClick}
              className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold hover:bg-brand-orange transition-all shadow-xl shadow-gray-200"
            >
              Explore More Designs & Get Quote
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-orange text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">Loved these designs?</h2>
          <p className="text-xl text-orange-100 mb-12">Get a free design consultation and see how these ideas would look in your home.</p>
          <button 
            onClick={onConsultationClick}
            className="bg-white text-brand-orange px-12 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform"
          >
            Book My Design Session
          </button>
        </div>
      </section>
    </div>
  );
}
