import { motion } from 'motion/react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const { content } = useContent();
  const { projects } = content;
  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {projects.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              {projects.description}
            </motion.p>
          </div>
          <Link to="/projects">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 px-6 py-3 rounded-full font-bold text-gray-900 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.items.map((project, index) => (
            <Link to={`/project/${project.id}`} key={project.id || project.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div className="text-white">
                      <p className="text-sm font-medium mb-1 opacity-80">Starting from</p>
                      <p className="text-2xl font-bold">{project.price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-brand-orange transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
