import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface MagazineProps {
  onConsultationClick: () => void;
}

export default function Magazine({ onConsultationClick }: MagazineProps) {
  const { content, loading } = useContent();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  if (loading) return <div className="pt-32 text-center text-gray-400 font-bold">Loading Magazine...</div>;

  const blogs = content.blogs || { title: 'Magazine', description: '', items: [] };
  const articles = blogs.items;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Featured Header */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-brand-black rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gray-800 group">
            <div className="lg:w-1/2 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="Featured Article" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <span className="text-brand-orange font-bold uppercase tracking-widest mb-4">Featured Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Elevating Luxury: The 2026 Home Interior Trends</h2>
              <p className="text-xl text-gray-400 mb-8 font-light leading-relaxed">Explore the themes, materials, and technologies that are defining the next era of high-end home design.</p>
              <button 
                onClick={onConsultationClick}
                className="flex items-center space-x-3 text-white font-bold hover:text-brand-orange transition-colors group/btn w-fit"
              >
                <span className="text-xl border-b-2 border-brand-orange pb-1">Read Full Story</span>
                <ArrowRight className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">{blogs.title}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 md:pb-0 h-14 items-center">
              {['All', 'Kitchen', 'Bedroom', 'Trends', 'Decor'].map((cat) => (
                <button key={cat} className="px-6 py-2 rounded-full border border-gray-200 hover:border-brand-orange hover:text-brand-orange transition-all font-bold text-sm whitespace-nowrap">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={onConsultationClick}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-black shadow-sm">
                    {article.category}
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-brand-orange" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-brand-orange" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors duration-300">{article.title}</h3>
                  <p className="text-lg text-gray-500 mb-6 font-light leading-relaxed line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{article.author}</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-200 group-hover:text-brand-orange transform group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={onConsultationClick}
              className="bg-gray-100 text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-brand-orange hover:text-white transition-all shadow-sm"
            >
              Show More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] text-center border border-gray-100 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Join our newsletter</h2>
              <p className="text-xl text-gray-600 mb-10 font-light">Stay updated with the latest design trends, expert advice, and interior inspiration.</p>
              
              {isSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-orange/10 p-8 rounded-[2rem] border border-brand-orange/20"
                >
                  <h4 className="text-2xl font-bold text-brand-orange mb-2">Welcome to the Club!</h4>
                  <p className="text-gray-600">You've successfully subscribed to our weekly design digest.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="flex-1 px-8 py-5 rounded-full border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all text-lg"
                  />
                  <button type="submit" className="px-10 py-5 bg-brand-orange text-white rounded-full text-lg font-bold hover:bg-brand-black transition-all shadow-lg shadow-brand-orange/20">
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
