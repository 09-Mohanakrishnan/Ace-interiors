import { motion } from 'motion/react';
import { Shield, Clock, PenTool, Award, ThumbsUp, Heart, ArrowRight } from 'lucide-react';

const reasons = [
  {
    title: '10-Year Warranty',
    description: 'We offer a comprehensive 10-year warranty on all our modular solutions, ensuring peace of mind for years to come.',
    icon: Shield,
  },
  {
    title: '45-Day Delivery',
    description: 'Get your home interiors delivered and installed within 45 days, or we pay you rent for every day of delay.',
    icon: Clock,
  },
  {
    title: 'Expert Designers',
    description: 'Work with the top 1% of interior designers who bring your vision to life with 3D visualizations.',
    icon: PenTool,
  },
  {
    title: 'Premium Quality',
    description: 'We use only the highest quality materials and hardware from global brands to ensure durability and style.',
    icon: Award,
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden costs. Get detailed quotes and track your project expenses with our transparent pricing model.',
    icon: ThumbsUp,
  },
  {
    title: 'Customer First',
    description: 'Our dedicated project managers ensure a smooth, stress-free experience from design to final handover.',
    icon: Heart,
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose ACE INTERIORS?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We combine creativity, technology, and craftsmanship to deliver homes that are as unique as you are.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <a href="/about-us" className="inline-flex items-center space-x-2 bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-black transition-all group">
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-brand-orange/5 transition-all group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
