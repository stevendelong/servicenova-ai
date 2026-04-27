'use client';

import React from 'react';
import { LayoutDashboard, Users, Calendar, MessageSquare, Settings, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Conversations', href: '/dashboard/conversations', icon: MessageSquare },
    { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-[#0f1115] hidden md:flex flex-col shrink-0">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ServiceNova</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-400' : ''}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button
          onClick={() => signOut({ redirectUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
