import React from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, customer: 'John Doe', service: 'Emergency AC Repair', date: 'Today', time: '2:00 PM', status: 'Confirmed', price: '$79 Dispatch' },
    { id: 2, customer: 'Jane Smith', service: 'HVAC Maintenance', date: 'Tomorrow', time: '10:00 AM', status: 'Pending', price: '$129' },
    { id: 3, customer: 'Robert Brown', service: 'Duct Cleaning', date: 'Apr 21', time: '9:00 AM', status: 'Confirmed', price: '$299' },
    { id: 4, customer: 'Alice White', service: 'Furnace Inspection', date: 'Apr 22', time: '1:30 PM', status: 'Confirmed', price: '$89' },
  ];

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
                <CalendarIcon className="w-5 h-5 text-brand-400" /> April 2026
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
                const isToday = day === 19;
                const hasAppt = [19, 20, 21, 22, 25, 28].includes(day);
                
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

          <div className="glass-panel overflow-hidden rounded-2xl border-white/5">
             <div className="p-6 border-b border-white/5 bg-slate-900/50">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Jobs</h2>
             </div>
             <div className="divide-y divide-white/5">
                {appointments.map((appt) => (
                  <div key={appt.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-xs ${
                        appt.status === 'Confirmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                        {appt.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{appt.customer}</p>
                        <p className="text-xs text-slate-400">{appt.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{appt.time}</p>
                      <p className="text-xs text-slate-500">{appt.date}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                       {appt.status === 'Confirmed' ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> {appt.status}
                          </span>
                       ) : (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3" /> {appt.status}
                          </span>
                       )}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Dispatch Stats Sidebar */}
        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Dispatch Summary</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Today's Load</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold text-white">8 Jobs</span>
                       <span className="text-emerald-400 text-xs font-semibold mb-1">+2 from yesterday</span>
                    </div>
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">AI Utilization</p>
                    <p className="text-2xl font-bold text-white">92%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                       <div className="bg-brand-500 h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                    </div>
                 </div>
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
