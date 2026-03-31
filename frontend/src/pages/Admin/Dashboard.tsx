import React, { useState, useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
import { 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Activity,
  Zap,
  Target,
  BarChart3,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const API_URL = ''; // Relative path via Vite proxy

export default function Dashboard() {
  const { content } = useContent();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leads`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Mock data for visualizations
  const leadVelocity = [30, 45, 35, 60, 55, 80, 75]; // Last 7 days
  const conversionData = [
    { label: 'Total Inquiries', value: leads.length * 3.5 || 450, color: 'bg-blue-500' },
    { label: 'Design Meetings', value: leads.length || 120, color: 'bg-indigo-500' },
    { label: 'Project Bookings', value: Math.floor(leads.length * 0.2) || 45, color: 'bg-emerald-500' },
  ];

  const stats = [
    { 
      name: 'Total Leads', 
      value: leads.length, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      trend: '+12%',
      chart: [20, 35, 25, 45, 30, 50]
    },
    { 
      name: 'Active Projects', 
      value: content.projects.items.length, 
      icon: ImageIcon, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      trend: '+4',
      chart: [10, 15, 12, 18, 20, 22]
    },
    { 
      name: 'User Satisfaction', 
      value: '98%', 
      icon: MessageSquare, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      trend: '+2.4%',
      chart: [90, 92, 95, 94, 98, 98]
    },
    { 
      name: 'System Health', 
      value: '99.9%', 
      icon: Activity, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      trend: 'Stable',
      chart: [100, 100, 99, 100, 100, 100]
    },
  ];

  const recentLogs = [
    { id: 1, event: 'API_LEAD_CAPTURE', details: 'Source: Home_Hero_Modal', time: '2 mins ago', status: 'success' },
    { id: 2, event: 'CONTENT_SYNC_COMPLETE', details: 'Section: Gallery_Update', time: '15 mins ago', status: 'success' },
    { id: 3, event: 'DB_BACKUP_GENERATED', details: 'Size: 1.2MB', time: '1 hour ago', status: 'success' },
    { id: 4, event: 'AUTH_SESSION_RENEWED', details: 'User: SYSTEM', time: '2 hours ago', status: 'info' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.name} 
            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
            {/* Sparkline */}
            <div className="mt-4 flex items-end space-x-1 h-8">
              {stat.chart.map((v, i) => (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm transition-all duration-500 ${stat.bg.replace('bg-', 'bg-opacity-40 bg-')}`}
                  style={{ height: `${(v / Math.max(...stat.chart)) * 100}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Technical Logs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">System Event Logs</h3>
                  <p className="text-xs text-gray-500">Real-time infrastructure activity</p>
                </div>
              </div>
              <button className="text-xs font-bold text-gray-400 hover:text-brand-orange uppercase tracking-widest border border-gray-200 px-4 py-2 rounded-xl transition-all">Clear Logs</button>
            </div>
            <div className="p-4">
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-blue-100 font-mono">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-6 py-4 font-bold text-gray-500">EVENT_ID</th>
                      <th className="px-6 py-4 font-bold text-gray-500">DESCRIPTION</th>
                      <th className="px-6 py-4 font-bold text-gray-500">TIMESTAMP</th>
                      <th className="px-6 py-4 font-bold text-gray-500">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 text-brand-orange font-bold">{log.event}</td>
                        <td className="px-6 py-4 text-gray-400 group-hover:text-white transition-colors">{log.details}</td>
                        <td className="px-6 py-4 text-gray-500">{log.time}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-1 ${log.status === 'success' ? 'text-emerald-400' : 'text-blue-400'}`}>
                            <div className={`w-1 h-1 rounded-full ${log.status === 'success' ? 'bg-emerald-400' : 'bg-blue-400'} animate-pulse`} />
                            <span>{log.status.toUpperCase()}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lead Growth Chart */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Lead Velocity</h3>
                </div>
                <select className="text-xs font-bold text-gray-500 bg-gray-50 border-none outline-none focus:ring-0 rounded-lg px-2 py-1">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="flex items-end justify-between space-x-2 h-48 border-b border-gray-50 pb-2">
                {leadVelocity.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded pointer-events-none">
                      {v}
                    </div>
                    <div 
                      className="w-full bg-blue-500/10 hover:bg-blue-500 rounded-t-xl transition-all duration-500 cursor-help"
                      style={{ height: `${(v / 100) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-gray-900">Conversion Funnel</h3>
              </div>
              <div className="space-y-4">
                {conversionData.map((stage, i) => (
                  <div key={stage.label}>
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                      <span>{stage.label}</span>
                      <span>{stage.value}</span>
                    </div>
                    <div className="h-4 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.value / 450) * 100}%` }}
                        transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                        className={`h-full ${stage.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-gray-900">10.0%</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">C-Rate (Overall)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-500">+1.2%</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Since last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Leads & Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-gray-900">Latest Leads</h3>
              </div>
              <Link to="/admin/leads" className="text-[10px] font-bold text-brand-orange uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="flex-1 divide-y divide-gray-50">
              {leads.slice(-4).reverse().map((lead: any, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  key={lead.id} 
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110 uppercase">
                        {lead.name ? lead.name.charAt(0) : '?'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 truncate max-w-[120px]">{lead.name || 'Anonymous'}</p>
                      <p className="text-[10px] text-gray-400 font-mono tracking-tighter">{(lead.city || 'Unknown').toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange transition-colors ml-auto" />
                    <span className="text-[10px] text-gray-400 font-bold">{lead.date ? new Date(lead.date).toLocaleDateString() : 'Invalid Date'}</span>
                  </div>
                </motion.div>
              ))}
              {leads.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">No Incoming Data</p>
                </div>
              )}
            </div>
            <div className="p-8 bg-gray-50/50 mt-auto border-t border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Deploy</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 p-3 rounded-xl hover:border-brand-orange transition-all group">
                  <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors" />
                  <span className="text-xs font-bold text-gray-600">New Project</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 p-3 rounded-xl hover:border-brand-orange transition-all group">
                  <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors" />
                  <span className="text-xs font-bold text-gray-600">Sync Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
