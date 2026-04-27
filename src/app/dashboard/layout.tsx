'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useUser } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const [tenantInfo, setTenantInfo] = useState<{ businessName: string; planTier: string } | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      // Fetch tenant info from our stats API (which reads from Supabase)
      fetch('/api/ghl/stats')
        .then(res => res.json())
        .then(data => {
          if (data.businessName) {
            setTenantInfo({
              businessName: data.businessName,
              planTier: data.planTier || 'platform',
            });
          }
        })
        .catch(() => {
          // Fallback to user metadata if API isn't provisioned yet
        });
    }
  }, [isLoaded, user]);

  const displayName = tenantInfo?.businessName || user?.firstName ? `${user?.firstName}'s Business` : 'My Business';
  const planLabel = tenantInfo?.planTier === 'premium' ? 'Premium Growth' 
    : tenantInfo?.planTier === 'growth' ? 'AI Growth Engine' 
    : 'Platform Access';

  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-slate-50 flex overflow-hidden">
      {/* Sidebar - Persistent */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="h-20 border-b border-white/5 bg-[#0f1115]/50 backdrop-blur-xl flex justify-end items-center px-8 shrink-0">
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="text-right">
              <p className="text-white leading-none">{displayName}</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">{planLabel}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 font-bold shadow-inner">
              {initials}
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
