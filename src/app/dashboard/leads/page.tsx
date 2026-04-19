import React from 'react';
import { Search, Filter, Download, MoreHorizontal, User, Mail, Phone, Calendar, ArrowUpRight } from 'lucide-react';

export default function LeadsPage() {
  const leads = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 012-3456', source: 'Google LSA', status: 'Booked', date: 'Apr 19, 2026' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah.w@hotmail.com', phone: '(555) 019-8877', source: 'Facebook Ads', status: 'Qualifying', date: 'Apr 19, 2026' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@gmail.com', phone: '(555) 011-2233', source: 'Web Chat', status: 'Nurture', date: 'Apr 18, 2026' },
    { id: 4, name: 'Emily Brown', email: 'emily@corporate.com', phone: '(555) 015-4433', source: 'Direct/Referral', status: 'Completed', date: 'Apr 17, 2026' },
    { id: 5, name: 'David Miller', email: 'dmiller@outlook.com', phone: '(555) 012-9900', source: 'Google LSA', status: 'Lost', date: 'Apr 16, 2026' },
    { id: 6, name: 'Jessica Taylor', email: 'jtaylor@hvac.com', phone: '(555) 018-7766', source: 'Web Chat', status: 'Booked', date: 'Apr 15, 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Lead Database</h1>
          <p className="text-slate-400 mt-1">Manage every prospect captured by the ServiceNova AI engine.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-white/5 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border-white/5 overflow-hidden">
        {/* Table Header / Filters */}
        <div className="p-4 border-b border-white/5 bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, phone, or email..." 
              className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4" /> All Sources
            </button>
            <button className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors">
              <Calendar className="w-4 h-4" /> Last 30 Days
            </button>
          </div>
        </div>

        {/* Lead Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/30 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-6 py-4">Lead Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs text-slate-400 font-bold group-hover:border-brand-500/50 transition-colors">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === 'Booked' ? 'bg-emerald-500/10 text-emerald-400' : 
                      lead.status === 'Qualifying' ? 'bg-brand-500/10 text-brand-400' : 
                      lead.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' :
                      lead.status === 'Nurture' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300">{lead.source}</td>
                  <td className="px-6 py-4 text-xs text-slate-300">{lead.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-brand-500/20 hover:text-brand-400 transition-all text-slate-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-800 transition-all text-slate-500">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-white/5 bg-slate-900/10 flex items-center justify-between text-xs text-slate-500">
           <span>Showing 1 to 6 of 142 leads</span>
           <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-slate-800 text-slate-400 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-slate-800 text-slate-100 italic">1</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-slate-800 text-slate-400">2</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-slate-800 text-slate-400">3</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-slate-800 text-slate-400">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
