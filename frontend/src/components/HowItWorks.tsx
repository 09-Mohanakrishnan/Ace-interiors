import { motion } from 'motion/react';
import { MessageSquare, PenTool, Home, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Meet a Designer',
    description: 'Book a free consultation and meet your designer to discuss your vision and requirements.',
    icon: MessageSquare,
  },
  {
    title: 'Get 3D Designs',
    description: 'See your future home in 3D. We iterate on designs until you are 100% satisfied.',
    icon: PenTool,
  },
  {
    title: 'Place Your Order',
    description: 'Finalize the designs and materials. We start manufacturing your custom modular units.',
    icon: Home,
  },
  {
    title: 'Move In!',
    description: 'Our expert team handles the installation. Your dream home is ready in 45 days.',
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-lg text-gray-600">Your journey to a beautiful home in 4 simple steps.</p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 bg-white p-8 text-center"
              >
                <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-orange/20">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-4 text-brand-orange font-black text-4xl opacity-10">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
