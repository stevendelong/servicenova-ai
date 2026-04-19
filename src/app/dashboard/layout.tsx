import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0c0f] text-slate-50 flex overflow-hidden">
      {/* Sidebar - Persistent */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="h-20 border-b border-white/5 bg-[#0f1115]/50 backdrop-blur-xl flex justify-end items-center px-8 shrink-0">
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="text-right">
              <p className="text-white leading-none">Elite Air HVAC</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Platform Access</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 font-bold shadow-inner">
              EA
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
