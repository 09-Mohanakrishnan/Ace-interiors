import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function FAQ() {
  const { content } = useContent();
  const { faqs } = content;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-brand-orange px-4 py-2 rounded-full mb-4 border border-orange-100">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Got Questions?</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{faqs.title}</h2>
          <p className="text-lg text-gray-600">{faqs.description}</p>
        </div>

        <div className="space-y-4">
          {faqs.items.map((faq: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-3xl border transition-all duration-300 ${
                activeIndex === index ? 'border-orange-200 shadow-xl shadow-brand-orange/5' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left px-8 py-6 flex justify-between items-center group"
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-brand-orange' : 'text-gray-900 group-hover:text-brand-orange'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-brand-orange text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-brand-orange'}`}>
                  {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
