import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Filter,
  Loader2
} from 'lucide-react';

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = ''; // Uses relative path handled by Vite proxy

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        credentials: 'include',
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    (lead.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lead.phone || '').includes(searchTerm) ||
    (lead.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const deleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      const res = await fetch(`${API_URL}/api/leads/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setLeads(leads.filter(l => l._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  const exportLeads = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ace_interiors_leads.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
          <button 
            onClick={exportLeads}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-orange text-white rounded-2xl hover:bg-brand-black transition-all font-bold"
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-24 text-center">
              <Loader2 className="w-12 h-12 text-brand-orange animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Fetching Leads...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Location/Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Source/Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center font-bold uppercase">
                          {lead.name ? lead.name.charAt(0) : '?'}
                        </div>
                        <span className="font-bold text-gray-900">{lead.name || 'Anonymous'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{lead.phone || 'N/A'}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        {lead.city && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{lead.city}</span>
                          </div>
                        )}
                        {lead.propertyType && (
                          <div className="text-xs text-brand-orange font-bold uppercase">{lead.propertyType}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{lead.source || 'Direct Contact'}</div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{lead.date ? new Date(lead.date).toLocaleDateString() : 'New'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button 
                        onClick={() => deleteLead(lead._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filteredLeads.length === 0 && (
            <div className="p-24 text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">No Leads Captured Yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
