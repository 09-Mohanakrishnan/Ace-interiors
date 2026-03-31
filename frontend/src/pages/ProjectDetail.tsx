import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Calendar, Layout, ArrowLeft, CheckCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface ProjectDetailProps {
  onConsultationClick: () => void;
}

export default function ProjectDetail({ onConsultationClick }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  const { projects } = content;
  
  const project = projects.items.find((p: any) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const galleryImages = project.galleryImages 
    ? project.galleryImages.split(',').map((img: string) => img.trim()).filter(Boolean)
    : [];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/projects" className="inline-flex items-center space-x-2 text-gray-500 hover:text-brand-orange transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back to Projects</span>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl relative"
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <span className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block">
                        {project.type}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{project.title}</h1>
                    <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-5 h-5 text-brand-orange" />
                        <span className="text-lg">{project.location}</span>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif italic">Project Overview</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                        {project.detailedDescription || project.summary}
                    </p>
                </motion.div>

                {project.challenge && (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-8 bg-black rounded-full" />
                            <span>The Challenge</span>
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {project.challenge}
                        </p>
                    </motion.div>
                )}

                {project.solution && (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-8 bg-brand-orange rounded-full" />
                            <span>Our Solution</span>
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {project.solution}
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-1">
                <div className="sticky top-28 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8">
                    <h3 className="text-xl font-bold border-b border-gray-100 pb-4 mb-6 uppercase tracking-widest text-gray-400 text-sm">Project Metrics</h3>
                    
                    <ul className="space-y-6">
                        <li className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Area</p>
                                <p className="text-lg font-bold text-gray-900">{project.sqft} Sq.ft</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Timeline</p>
                                <p className="text-lg font-bold text-gray-900">{project.timeline}</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Budget</p>
                                <p className="text-lg font-bold text-brand-orange">{project.price}</p>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-10 pt-8 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">Want a similar design?</h4>
                        <button 
                            onClick={onConsultationClick}
                            className="w-full bg-brand-black text-white py-4 rounded-xl font-bold hover:bg-brand-orange transition-all shadow-lg"
                        >
                            Get Free Design Quote
                        </button>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-gray-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryImages.map((img: string, idx: number) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md"
                    >
                        <img src={img} alt={`${project.title} - View ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
