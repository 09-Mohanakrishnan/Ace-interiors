import { motion } from 'motion/react';
import { Calculator, Info, CheckCircle2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Pricing({ onConsultationClick }: { onConsultationClick?: () => void }) {
  const { content } = useContent();
  const { pricing } = content;
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {pricing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {pricing.description}
          </motion.p>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Calculator className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-6 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">BHK Type</th>
                    <th className="py-6 px-4 text-sm font-bold text-brand-orange uppercase tracking-wider">Essential</th>
                    <th className="py-6 px-4 text-sm font-bold text-blue-600 uppercase tracking-wider">Premium</th>
                    <th className="py-6 px-4 text-sm font-bold text-emerald-600 uppercase tracking-wider">Luxury</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pricing.items.map((row: any) => (
                    <tr key={row.bhk} className="hover:bg-gray-100/50 transition-colors">
                      <td className="py-8 px-4 font-bold text-gray-900 text-lg">{row.bhk}</td>
                      <td className="py-8 px-4 text-gray-700 font-medium">{row.essential}</td>
                      <td className="py-8 px-4 text-gray-700 font-medium">{row.premium}</td>
                      <td className="py-8 px-4 text-gray-700 font-medium">{row.luxury}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-brand-orange">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900">Essential</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Focuses on functionality with standard materials and essential storage solutions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900">Premium</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  High-quality finishes, custom designs, and advanced storage hardware.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900">Luxury</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Bespoke designs, premium imported materials, and high-end automation.
                </p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-brand-orange rounded-[2rem] p-8 md:p-12 text-white">
              <div className="mb-8 md:mb-0 max-w-xl">
                <h3 className="text-3xl font-bold mb-4">Get a Room-Wise Cost Estimate</h3>
                <p className="text-orange-100 text-lg">
                  Every home is unique. Speak with our experts to get a personalized quote tailored to your specific needs and budget.
                </p>
              </div>
              <button 
                onClick={onConsultationClick}
                className="bg-white text-brand-orange px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl shadow-black/10 flex items-center space-x-2"
              >
                <Calculator className="w-6 h-6" />
                <span>Calculate My Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
