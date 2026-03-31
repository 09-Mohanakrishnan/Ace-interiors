import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, CheckCircle, ArrowRight, MapPin, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

interface ProjectsProps {
  onConsultationClick: () => void;
}

const categories = ['All', 'Modular Kitchen', 'Living Room', 'Bedroom', 'Full Home'];

export default function Projects({ onConsultationClick }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { content } = useContent();
  const { projects } = content;

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects.items 
    : projects.items.filter((p: any) => p.type === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">Port<span className="text-brand-orange not-italic">folio</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              Showcasing 500+ successful transformations across Chennai. Quality you can see, designs you can feel.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Filters */}
      <section className="py-12 border-b border-gray-100 sticky top-20 bg-white/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-2 text-gray-400 mr-4 py-2 border-r pr-6 border-gray-200">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-widest">Filter By</span>
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            activeCategory === cat 
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            <AnimatePresence mode="popLayout">
                {filteredProjects.map((project: any, index: number) => (
                <motion.div
                    layout
                    key={project.id || project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col"
                >
                    <Link to={`/project/${project.id}`} className="block relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-2xl group-hover:shadow-brand-orange/10 transition-all">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-gray-900 border border-white/20">
                            {project.type || "Design"}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2">
                                <span>View Case Study</span>
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                    
                    <div className="px-4 flex-grow flex flex-col">
                        <Link to={`/project/${project.id}`} className="flex justify-between items-baseline mb-4 hover:opacity-80 transition-opacity">
                            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{project.title}</h3>
                            <div className="flex items-center text-brand-orange text-sm font-black">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6 font-medium">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                {project.location}
                            </div>
                            <div className="flex items-center">
                                <Layout className="w-4 h-4 mr-1 text-gray-400" />
                                {project.sqft} Sq.ft
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1 text-gray-400" />
                                {project.timeline}
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 line-clamp-2">
                            {project.summary}
                        </p>
                        
                        <button 
                            onClick={onConsultationClick}
                            className="w-full py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 hover:border-brand-orange hover:text-brand-orange transition-all"
                        >
                            Enquire About This Design
                        </button>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <section className="py-12 bg-brand-orange text-white overflow-hidden">
          <div className="flex space-x-12 whitespace-nowrap animate-marquee">
              {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 text-2xl font-black uppercase italic tracking-tighter opacity-80">
                      <span>Premium Quality</span>
                      <Star className="w-6 h-6 fill-current" />
                      <span>10 Year Warranty</span>
                      <Star className="w-6 h-6 fill-current" />
                      <span>On-Time Delivery</span>
                      <Star className="w-6 h-6 fill-current" />
                  </div>
              ))}
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 text-center shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
                <span className="bg-orange-100 text-brand-orange px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 inline-block">Start Your Journey</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">Customized for your lifestyle.</h2>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every project starts with a story. Let's make yours beautiful, functional, and uniquely yours.
                </p>
                <button 
                onClick={onConsultationClick}
                className="bg-brand-black text-white px-12 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-2xl shadow-black/20"
                >
                Book Free Consultation
                </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/5 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
