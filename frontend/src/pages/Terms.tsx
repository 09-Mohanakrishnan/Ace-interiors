import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500">Effective Date: March 29, 2026</p>
        </motion.div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-8 font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using our websites, products, and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of ACE INTERIORS and its licensors. Our designs, trademarks, and concepts are protected by copyright and intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Consultation Services</h2>
            <p>Interior design consultations provided by us are introductory in nature. Quotations and estimates provided are subject to final site measurements and technical feasibility. We reserve the right to modify prices or service availability at any time.</p>
          </section>

          <section className="pt-8 border-t border-gray-100 italic">
            <p className="text-sm">These terms are governed by the laws of India and the jurisdiction of Chennai courts.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
