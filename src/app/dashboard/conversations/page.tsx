'use client'

import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, Send, User, Bot, Phone, MapPin, Calendar, Loader2, MessageSquare } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function ConversationsPage() {
  const { isLoaded, user } = useUser();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      fetch('/api/ghl/conversations')
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            const convos = data.conversations || [];
            setConversations(convos);
            if (convos.length > 0) {
              setActiveChat(convos[0]);
            }
          }
        })
        .catch(() => setError('Failed to load conversations.'))
        .finally(() => setIsLoading(false));
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8">
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Side */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-[#0f1115]/30 hidden md:flex shrink-0">
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
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 border border-white/5 hover:bg-slate-700 transition-colors">
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
              </div>
            ) : error ? (
              <div className="p-4 text-sm text-slate-400 text-center">{error}</div>
            ) : conversations.length > 0 ? (
              conversations.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeChat?.id === chat.id ? 'bg-brand-500/5 border-l-2 border-l-brand-500' : 'border-l-2 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-white">{chat.contactName}</span>
                    <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">
                      {new Date(chat.lastMessageDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mb-2">{chat.lastMessage || 'No messages yet.'}</p>
                  {/* Status indicator pill can go here if needed */}
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400`}>
                    {chat.type === 'TYPE_PHONE' ? 'SMS' : 'Email'}
                  </span>
                </div>
              ))
            ) : (
               <div className="p-4 text-sm text-slate-500 text-center mt-4">
                 No conversations found.
               </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0a0c0f]">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#0f1115]/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                    {activeChat.contactName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-white truncate">{activeChat.contactName}</h2>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span> ServiceNova AI Handling
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area - MOCK PREVIEW FOR NOW until full message sync is built */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
                <div className="flex flex-col items-center justify-center mb-8">
                   <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     {new Date(activeChat.lastMessageDate).toLocaleDateString()}
                   </span>
                </div>

                {/* AI Message (Mock preview setup) */}
                <div className="flex gap-3 max-w-[90%] md:max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="bg-slate-800/80 border border-white/5 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                    <p className="text-sm text-slate-100 italic mb-2 opacity-60">Automated system response...</p>
                    <p className="text-sm text-slate-100">Hi, this is ServiceNova AI. How can we help you today?</p>
                  </div>
                </div>

                {/* User Message (Actual last message pulled from API) */}
                <div className="flex gap-3 max-w-[90%] md:max-w-[80%] self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-sm shadow-xl">
                    <p className="text-sm text-white font-medium">{activeChat.lastMessage || 'No actual message body retrieved yet.'}</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/5 bg-[#0f1115]/50 shrink-0">
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
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0a0c0f]">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-slate-600" />
              </div>
              <h2 className="text-lg font-medium text-white mb-2">No conversation selected</h2>
              <p className="text-sm text-slate-400">Select a lead from the sidebar to view their activity.</p>
            </div>
          )}
        </div>

        {/* Lead Details (Right Sidebar) */}
        {activeChat && (
          <div className="w-72 border-l border-white/5 hidden xl:flex flex-col bg-[#0f1115]/30 shrink-0">
            <div className="p-6 space-y-8 overflow-y-auto">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Lead Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-sm text-slate-300 break-all">Phone on file</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-sm text-slate-300">Location pending</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">AI Log</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></div>
                    <p className="text-xs text-slate-400"><span className="text-slate-200 font-medium">Message Received</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
