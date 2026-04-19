import React from 'react';
import { ArrowUpRight, CalendarCheck, PhoneMissed, DollarSign, Bot, ArrowRight, Zap } from 'lucide-react';

export default function DashboardOverview() {
  const kpis = [
    {
      title: 'Total AI Leads',
      value: '142',
      change: '+12%',
      trend: 'up',
      icon: PhoneMissed,
      color: 'blue'
    },
    {
      title: 'AI Conversion Rate',
      value: '68%',
      change: '+4%',
      trend: 'up',
      icon: Bot,
      color: 'brand'
    },
    {
      title: 'Booked Appointments',
      value: '45',
      change: '+18%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'emerald'
    },
    {
      title: 'Estimated Revenue',
      value: '$22,500',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, Steve.</h1>
          <p className="text-slate-400 mt-1">Here is how ServiceNova AI has been performing for Elite Air this week.</p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2">
          <Zap className="w-4 h-4" /> GoLive Engine Active
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const colorClasses = {
            blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
            brand: 'text-brand-400 bg-brand-400/10 border-brand-400/20',
            emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
            purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
          }[kpi.color];

          const Icon = kpi.icon;

          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl border ${colorClasses}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {kpi.change} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-white tracking-tight">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-white/5 h-[400px] flex flex-col">
          <h2 className="text-lg font-bold mb-6 text-white">Lead Conversion Funnel</h2>
          <div className="flex-1 border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-slate-800/30">
            <span className="text-slate-500 text-sm">Revenue projection graph rendering...</span>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col h-[400px]">
          <h2 className="text-lg font-bold mb-6 text-white">Live AI Activity</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            <div className="relative pl-6 border-l border-emerald-500/30 pb-2">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <p className="text-sm font-medium text-white mb-1">Appointment Booked</p>
              <p className="text-xs text-slate-400 mb-2">ServiceNova AI scheduled an AC repair for John Doe tomorrow at 2:00 PM.</p>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">2 mins ago</span>
            </div>

            <div className="relative pl-6 border-l border-white/10 pb-2">
              <div className="absolute w-3 h-3 bg-brand-500 rounded-full -left-[6.5px] top-1"></div>
              <p className="text-sm font-medium text-white mb-1">Lead Captured</p>
              <p className="text-xs text-slate-400 mb-2">Missed call converted to SMS chat. Qualifying current issue.</p>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">14 mins ago</span>
            </div>

            <div className="relative pl-6 border-l border-white/10 pb-2">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1"></div>
              <p className="text-sm font-medium text-white mb-1">Customer Service handled</p>
              <p className="text-xs text-slate-400 mb-2">Resolved warranty question for existing customer via web-widget.</p>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">1 hr ago</span>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1"></div>
              <p className="text-sm font-medium text-white mb-1">Review Secured</p>
              <p className="text-xs text-slate-400 mb-2">Automated follow-up resulted in a 5-star Google review.</p>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">3 hrs ago</span>
            </div>
          </div>
          
          <button className="w-full mt-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
            View All Activity <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
