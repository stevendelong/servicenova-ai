import React from 'react';
import { Search, Filter, MoreVertical, Send, User, Bot, Phone, MapPin, Calendar } from 'lucide-react';

export default function ConversationsPage() {
  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Yes please, ASAP.', time: '2m ago', active: true, status: 'Booked' },
    { id: 2, name: 'Sarah Wilson', lastMessage: 'How much for a new unit?', time: '14m ago', active: false, status: 'Qualifying' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Thank you for the help!', time: '1h ago', active: false, status: 'Resolved' },
    { id: 4, name: 'Emily Brown', lastMessage: 'Do you work on weekends?', time: '3h ago', active: false, status: 'Answering' },
  ];

  return (
    <div className="h-full flex flex-col -m-8">
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Side */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-[#0f1115]/30">
          <div className="p-4 border-b border-white/5 space-y-4">
            <h1 className="text-xl font-bold text-white">AI Conversations</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search leads..." 
                className="w-full bg-slate-900/50 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 border border-white/5">
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${chat.id === 1 ? 'bg-brand-500/5 border-l-2 border-l-brand-500' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-white">{chat.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate mb-2">{chat.lastMessage}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  chat.status === 'Booked' ? 'bg-emerald-500/10 text-emerald-400' : 
                  chat.status === 'Qualifying' ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {chat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0a0c0f]">
          {/* Chat Header */}
          <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0f1115]/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                JD
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">John Doe</h2>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ServiceNova AI Handling
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col items-center justify-center mb-8">
               <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Today</span>
            </div>

            {/* AI Message */}
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div className="bg-slate-800/80 border border-white/5 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                <p className="text-sm text-slate-100 italic mb-2 opacity-60">Missed call detected. Initializing auto-response...</p>
                <p className="text-sm text-slate-100">Hi, this is ServiceNova AI for Elite Air. We noticed we missed your call. How can we help you today?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-sm shadow-xl">
                <p className="text-sm text-white font-medium">My AC is leaking water heavily and stopped cooling. Can you send someone today?</p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div className="bg-slate-800/80 border border-white/5 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                <p className="text-sm text-slate-100 italic mb-2 opacity-60">Scanning calendar for emergency dispatch...</p>
                <p className="text-sm text-slate-100">I can dispatch an emergency tech between 2PM - 4PM today. It's a $79 dispatch fee. Should I book this for you?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-sm shadow-xl">
                <p className="text-sm text-white font-medium">Yes please, ASAP.</p>
              </div>
            </div>
            
             {/* AI Message - Final confirmation */}
             <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bg-slate-800/80 border border-emerald-500/20 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                <p className="text-sm text-white font-semibold flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-emerald-400" /> Appointment Confirmed
                </p>
                <p className="text-sm text-slate-300">Great! You're all set for today between 2PM-4PM. Our tech will text you when they're on the way.</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-[#0f1115]/50">
            <div className="max-w-4xl mx-auto flex gap-3">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Take over or tell AI what to say..." 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition-all shadow-inner"
                />
              </div>
              <button className="bg-brand-600 hover:bg-brand-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-brand-500/20 shrink-0">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-2 font-medium tracking-wide">
              PRO TIP: You can take over this conversation manually at any time.
            </p>
          </div>
        </div>

        {/* Lead Details (Right Sidebar) */}
        <div className="w-72 border-l border-white/5 hidden xl:flex flex-col bg-[#0f1115]/30">
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Lead Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">(555) 012-3456</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">Tampa, FL (33602)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Current Booking</h3>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-xs text-emerald-400 font-bold mb-1">Confirmed Appointment</p>
                <p className="text-sm text-white font-medium">AC Repair - Emergency</p>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Apr 19, 2:00 PM - 4:00 PM
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">AI Log</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <p className="text-xs text-slate-400"><span className="text-slate-200 font-medium">Booked</span> - Successfully scheduled emergency repair.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5"></div>
                  <p className="text-xs text-slate-400"><span className="text-slate-200 font-medium">Qualified</span> - Issue identified as AC leaking water.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
