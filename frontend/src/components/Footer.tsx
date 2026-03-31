import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';


const centres = [
  {
    name: 'Navalur Experience Centre',
    address: 'Navallur Toll Booth, Rajiv Gandhi Salai, Navalur, Chennai, Tamil Nadu 600130',
    phone: '+91 9787911133 / +91 9787922266',
  },
];

export default function Footer({ onConsultationClick }: { onConsultationClick?: () => void }) {
  return (
    <footer id="footer" className="bg-gray-900 text-white pt-24 pb-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="centres" className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24 pb-24 border-b border-gray-800">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Visit Our <br />
              <span className="text-brand-orange">Experience Centres</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Touch, feel, and experience our premium materials and designs in person. Book a guided tour today.
            </p>
            <button 
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-brand-black transition-all flex items-center space-x-2"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="lg:col-span-2 p-1">
            {centres.map((centre) => (
              <div key={centre.name} className="bg-gray-800 p-10 rounded-[3rem] border border-gray-700 hover:border-brand-orange/30 transition-all h-full flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-brand-orange mb-6 md:mb-0 shrink-0">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{centre.name}</h3>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-xl">{centre.address}</p>
                    <div className="flex items-center space-x-3 text-brand-orange text-xl font-bold">
                      <Phone className="w-6 h-6" />
                      <span>{centre.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="ACE Interiors" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transforming houses into homes with innovative designs and premium quality. The #1 interior design partner in Chennai.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/aceinteriors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/aceinteriors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/aceinteriors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/aceinteriors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-brand-orange transition-colors">Gallery</Link></li>
              <li><Link to="/what-we-do" className="hover:text-brand-orange transition-colors">What we do</Link></li>
              <li><Link to="/about-us" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link to="/magazine" className="hover:text-brand-orange transition-colors">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/offering/modular-kitchens" className="hover:text-brand-orange transition-colors">Modular Kitchens</Link></li>
              <li><Link to="/offering/wardrobes" className="hover:text-brand-orange transition-colors">Wardrobes</Link></li>
              <li><Link to="/offering/living-room" className="hover:text-brand-orange transition-colors">Living Room</Link></li>
              <li><Link to="/offering/bedroom" className="hover:text-brand-orange transition-colors">Bedroom</Link></li>
              <li><Link to="/offering/full-home" className="hover:text-brand-orange transition-colors">Full Home Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-orange" />
                <span>+91 97879 11133</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-orange" />
                <span>hello@aceinteriors.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-orange mt-1 flex-shrink-0" />
                <span>Navallur Toll Booth, Rajiv Gandhi Salai, Navalur, Chennai, Tamil Nadu 600130</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>© 2026 ACE INTERIORS. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="/privacy" target="_blank" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms" target="_blank" className="hover:text-brand-orange transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-brand-orange transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
