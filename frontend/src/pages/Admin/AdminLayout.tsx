import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  LogOut,
  Menu,
  ChevronLeft,
  Briefcase,
  Home,
  CreditCard,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero', href: '/admin/hero', icon: Home },
  { name: 'Offerings', href: '/admin/sections', icon: Briefcase },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: BookOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Pricing', href: '/admin/pricing', icon: CreditCard },
];

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ... (Sidebar motion.aside remains unchanged) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen overflow-hidden z-30 shadow-sm"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight whitespace-nowrap">Admin CMS</span>
              </motion.div>
            ) : (
              <motion.div 
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white mx-auto"
              >
                <Settings className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all group relative ${
                  isActive 
                    ? 'bg-orange-50 text-brand-orange font-bold' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={!isSidebarOpen ? link.name : ''}
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-orange' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 whitespace-nowrap truncate"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && isSidebarOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2 overflow-hidden">
          <Link 
            to="/" 
            className="flex items-center px-4 py-3 text-gray-500 hover:text-brand-orange transition-colors"
            title={!isSidebarOpen ? 'View Website' : ''}
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3 whitespace-nowrap">View Website</span>}
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
            title={!isSidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3 whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest truncate max-w-[200px]">
              {sidebarLinks.find(l => l.href === location.pathname)?.name || 'Admin'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-bold text-gray-900 leading-none">Engineering Admin</span>
              <span className="text-[10px] text-brand-orange font-bold uppercase tracking-tighter">System Access: Root</span>
            </div>
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-orange-500/20">
              EA
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
