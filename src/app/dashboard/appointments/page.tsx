'use client'

import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function AppointmentsPage() {
  const { isLoaded, user } = useUser();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      fetch('/api/ghl/appointments')
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setAppointments(data.appointments || []);
          }
        })
        .catch(() => setError('Failed to load appointments.'))
        .finally(() => setIsLoading(false));
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Appointments</h1>
          <p className="text-slate-400 mt-1">Manage your schedule and view upcoming jobs booked by ServiceNova AI.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-white/5 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Manual Booking
          </button>
          <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-500/20">
            Export Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Preview Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-brand-400" /> {new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 border border-white/5">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 border border-white/5">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                // Basic mock calendar visualization for now
                const isToday = day === new Date().getDate();
                const hasAppt = false; // We'd map this to real appointments if needed
                
                return (
                  <div 
                    key={i} 
                    className={`aspect-square sm:aspect-video rounded-xl border flex flex-col items-center justify-center relative cursor-pointer transition-all ${
                      isToday ? 'bg-brand-500 border-brand-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 
                      'bg-slate-900/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className={`text-xs font-bold ${isToday ? 'text-white' : 'text-slate-400'}`}>{day}</span>
                    {hasAppt && !isToday && (
                      <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-brand-500"></div>
                    )}
                    {isToday && (
                       <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-2xl border-white/5 min-h-[200px] flex flex-col">
             <div className="p-6 border-b border-white/5 bg-slate-900/50">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Jobs</h2>
             </div>
             
             {isLoading ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                </div>
             ) : error ? (
                <div className="flex-1 flex items-center justify-center p-8 text-slate-400">
                  {error}
                </div>
             ) : appointments.length > 0 ? (
               <div className="divide-y divide-white/5">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-xs bg-emerald-500/10 border-emerald-500/20 text-emerald-400`}>
                          {appt.contactName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{appt.contactName}</p>
                          <p className="text-xs text-slate-400">{appt.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{new Date(appt.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <p className="text-xs text-slate-500">{new Date(appt.startTime).toLocaleDateString()}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" /> {appt.status}
                        </span>
                      </div>
                    </div>
                  ))}
               </div>
             ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-sm text-slate-500">
                  No upcoming appointments found.
                </div>
             )}
          </div>
        </div>

        {/* Dispatch Stats Sidebar */}
        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Dispatch Summary</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Upcoming Jobs (30 Days)</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold text-white">{appointments.length} Jobs</span>
                    </div>
                 </div>
                 {/* <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">AI Utilization</p>
                    <p className="text-2xl font-bold text-white">92%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                       <div className="bg-brand-500 h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                    </div>
                 </div> */}
              </div>
           </div>

           <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
              <div className="space-y-3">
                 <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 border border-white/5 transition-all text-sm font-medium text-slate-300">
                    Reschedule Last Job
                 </button>
                 <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 border border-white/5 transition-all text-sm font-medium text-slate-300">
                    Blackout Hours
                 </button>
                 <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 border border-white/5 transition-all text-sm font-medium text-slate-300">
                    Service Area Settings
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
