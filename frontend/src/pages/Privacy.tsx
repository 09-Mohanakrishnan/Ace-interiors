import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Effective Date: March 29, 2026</p>
        </motion.div>

        <div className="prose prose-orange max-w-none text-gray-600 space-y-8 font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>Welcome to ACE INTERIORS. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
            <p>We will only use your personal data for the purpose of provideing interior design consultations, updates, and improving our services. We do not sell your data to third parties.</p>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <p className="text-sm">If you have any questions about this privacy policy, please contact us at <span className="font-bold text-brand-orange text-lg">privacy@aceinteriors.com</span></p>
          </section>
        </div>
      </div>
    </div>
  );
}
