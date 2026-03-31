import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onConsultationClick }: { onConsultationClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'What we do', href: '/what-we-do' },
    { name: 'Gallery', href: '/projects' },
    { name: 'Blogs', href: '/magazine' },
    { name: 'Contact', href: '/#footer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${(isScrolled || !isHomePage) ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/src/assets/logo2.png"
                alt="ACE Interiors"
                className={`h-12 w-auto transition-all duration-300 ${(isScrolled || !isHomePage) ? 'brightness-100' : 'brightness-0 invert'}`}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-orange ${(isScrolled || !isHomePage) ? 'text-gray-700' : 'text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-black transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${(isScrolled || !isHomePage) ? 'text-gray-700' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <img src="/src/assets/logo2.png" alt="ACE" className="h-8 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <div className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={link.name}
                    >
                      <Link
                        to={link.href}
                        className="block py-4 text-xl font-bold text-gray-900 hover:text-brand-orange transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Specialist</p>
                    <a href="tel:+919787911133" className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">+91 97879 11133</p>
                        <p className="text-xs text-gray-500">Call for immediate quote</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onConsultationClick?.();
                  }}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-base hover:bg-brand-black transition-all shadow-lg shadow-brand-orange/20 flex justify-center items-center space-x-3"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
