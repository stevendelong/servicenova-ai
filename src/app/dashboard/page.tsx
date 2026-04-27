'use client'

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarCheck, PhoneMissed, DollarSign, Bot, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface DashboardStats {
  totalLeads: number;
  conversionRate: number;
  bookedAppointments: number;
  estimatedRevenue: number;
}

interface ActivityItem {
  type: 'call' | 'message';
  contactName: string;
  lastMessage: string;
  time: string;
}

export default function DashboardOverview() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      fetch('/api/ghl/stats')
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setStats(data.stats);
            setActivity(data.recentActivity || []);
          }
        })
        .catch(() => setError('Failed to load dashboard data.'))
        .finally(() => setIsLoading(false));
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <p className="text-sm text-slate-400">If you just signed up, your AI engine is currently being provisioned. Please check back shortly.</p>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total AI Leads',
      value: stats?.totalLeads || '0',
      change: '+12%',
      trend: 'up',
      icon: PhoneMissed,
      color: 'blue' as const
    },
    {
      title: 'AI Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      change: '+4%',
      trend: 'up',
      icon: Bot,
      color: 'brand' as const
    },
    {
      title: 'Booked Appointments',
      value: stats?.bookedAppointments || '0',
      change: '+18%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'emerald' as const
    },
    {
      title: 'Estimated Revenue',
      value: `$${(stats?.estimatedRevenue || 0).toLocaleString()}`,
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple' as const
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, {user?.firstName || 'Partner'}.</h1>
          <p className="text-slate-400 mt-1">Here is how ServiceNova AI has been performing for your business.</p>
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
                {/* <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {kpi.change} <ArrowUpRight className="w-3 h-3" />
                </span> */}
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
            {activity.length > 0 ? (
              activity.map((item, idx) => (
                <div key={idx} className={`relative pl-6 border-l ${idx === 0 ? 'border-emerald-500/30' : 'border-white/10'} pb-2`}>
                  <div className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-1 ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-brand-500'}`}></div>
                  <p className="text-sm font-medium text-white mb-1">
                    {item.type === 'call' ? 'Call Processed' : 'Message Handled'}
                  </p>
                  <p className="text-xs text-slate-400 mb-2 truncate">
                    {item.contactName}: {item.lastMessage}
                  </p>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    {new Date(item.time).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
               <p className="text-sm text-slate-500 italic">No recent activity detected.</p>
            )}
          </div>
          
          <button className="w-full mt-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
            View All Activity <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
