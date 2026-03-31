import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home.tsx';
import Interiors from './pages/Interiors.tsx';
import DesignIdeas from './pages/DesignIdeas.tsx';
import Magazine from './pages/Magazine.tsx';
import Cities from './pages/Cities.tsx';
import Projects from './pages/Projects.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import OfferingDetail from './pages/OfferingDetail.tsx';
import ModularKitchens from './pages/ModularKitchens.tsx';
import Wardrobes from './pages/Wardrobes.tsx';
import LivingRoom from './pages/LivingRoom.tsx';
import Bedroom from './pages/Bedroom.tsx';
import Bathroom from './pages/Bathroom.tsx';
import FullHome from './pages/FullHome.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import AboutUs from './pages/AboutUs.tsx';
import WhatWeDo from './pages/WhatWeDo.tsx';
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, Calendar, CheckCircle } from 'lucide-react';

// Production Logic
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { clearLegacyStorage } from './utils/clear-storage';

// Admin Imports
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLeads from './pages/Admin/Leads';
import SectionEditor from './pages/Admin/SectionEditor';
import AdminLogin from './pages/Admin/Login';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // One-time cleanup of legacy dev data
    clearLegacyStorage();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConsultationClick = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Database via API
    try {
      const API_URL = ''; // Relative path handled by Vite proxy
      await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString()
        })
      });
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '' });
    } catch (err) {
      console.error("Failed to save lead", err);
    }
  };

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-gray-50' : 'bg-white'}`}>
      <ScrollToTop />
      {!isAdmin && <Navbar onConsultationClick={handleConsultationClick} />}
      
      <main className={!isAdmin ? 'pt-0' : ''}>
        <Routes>
          <Route path="/" element={<Home onConsultationClick={handleConsultationClick} />} />
          <Route path="/interiors" element={<Interiors onConsultationClick={handleConsultationClick} />} />
          <Route path="/about-us" element={<AboutUs onConsultationClick={handleConsultationClick} />} />
          <Route path="/what-we-do" element={<WhatWeDo onConsultationClick={handleConsultationClick} />} />
          <Route path="/design-ideas" element={<DesignIdeas onConsultationClick={handleConsultationClick} />} />
          <Route path="/magazine" element={<Magazine onConsultationClick={handleConsultationClick} />} />
          <Route path="/projects" element={<Projects onConsultationClick={handleConsultationClick} />} />
          <Route path="/project/:id" element={<ProjectDetail onConsultationClick={handleConsultationClick} />} />
          <Route path="/offering/:id" element={<OfferingDetail onConsultationClick={handleConsultationClick} />} />
          <Route path="/cities" element={<Cities onConsultationClick={handleConsultationClick} />} />
          {/* Legacy static offering routes — redirect to dynamic ones */}
          <Route path="/modular-kitchens" element={<Navigate to="/offering/modular-kitchens" replace />} />
          <Route path="/wardrobes" element={<Navigate to="/offering/wardrobes" replace />} />
          <Route path="/living-room" element={<Navigate to="/offering/living-room" replace />} />
          <Route path="/bedroom" element={<Navigate to="/offering/bedroom" replace />} />
          <Route path="/bathroom" element={<Navigate to="/offering/bathroom" replace />} />
          <Route path="/full-home" element={<Navigate to="/offering/full-home" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="hero" element={<SectionEditor sectionKey="hero" />} />
            <Route path="sections" element={<SectionEditor sectionKey="offerings" />} />
            <Route path="gallery" element={<SectionEditor sectionKey="projects" />} />
            <Route path="blogs" element={<SectionEditor sectionKey="blogs" />} />
            <Route path="testimonials" element={<SectionEditor sectionKey="testimonials" />} />
            <Route path="faqs" element={<SectionEditor sectionKey="faqs" />} />
            <Route path="pricing" element={<SectionEditor sectionKey="pricing" />} />
          </Route>
        </Routes>
      </main>

      {!isAdmin && (
        <>
          <Footer onConsultationClick={handleConsultationClick} />
          
          {/* Sticky Mobile CTA */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 p-4 flex items-center space-x-4">
            <button 
              onClick={handleConsultationClick}
              className="flex-1 bg-brand-orange text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-orange/20"
            >
              Book Free Consultation
            </button>
            <a
              href="tel:+919787911133"
              className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919787911133"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>

          {/* Consultation Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
                >
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>

                  <div className="p-10">
                    {isSubmitted ? (
                      <div className="text-center py-10">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Consultation Booked!</h3>
                        <p className="text-gray-600">Our expert designer will call you within 24 hours to schedule your free session.</p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">Book Free Consultation</h3>
                          <p className="text-gray-500">Get a free 3D design and quote for your home.</p>
                        </div>

                        <form onSubmit={handleModalSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                              placeholder="+91 00000 00000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                              placeholder="name@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              required
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all text-gray-900"
                              placeholder="Enter your city"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-black transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center space-x-2"
                          >
                            <Calendar className="w-5 h-5" />
                            <span>Confirm Booking</span>
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
