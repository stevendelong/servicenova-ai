'use client'

import React, { useState } from 'react';
import { PhoneMissed, CalendarCheck, MessageSquare, BarChart3, ArrowRight, ShieldCheck, CheckCircle2, X, Loader2 } from 'lucide-react';

type Plan = 'platform' | 'growth' | 'premium'

const PLAN_LABELS: Record<Plan, { name: string; price: string }> = {
  platform: { name: 'Platform Access', price: '$297/mo' },
  growth:   { name: 'AI Growth Engine', price: '$997/mo' },
  premium:  { name: 'Premium Growth', price: '$1,997/mo' },
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan>('growth')
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openCheckout = (plan: Plan) => {
    setSelectedPlan(plan)
    setError('')
    setModalOpen(true)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan: selectedPlan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-50 font-sans selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">ServiceNova <span className="text-brand-400">AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-500/25">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
            Now onboarding HVAC & Plumbing businesses
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            AI that books jobs <br />
            <span className="text-brand-400">24/7.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Turn every missed call into a booked job. ServiceNova AI is the proprietary engine that catches leads, answers FAQs, and fills your calendar—without hiring more staff.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => openCheckout('growth')} className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
              Get 15 Booked Jobs Guaranteed <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-slate-700">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* The Problem / Agitation */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Every missed call is a competitor's win.</h2>
              <p className="text-lg text-slate-400 mb-8">
                Home service companies lose 40% to 70% of inbound leads because they are out on a job, understaffed, or simply unable to answer the phone in time. When an AC breaks in July, customers don't leave voicemails—they call the next company on Google.
              </p>
              <ul className="space-y-4">
                {[
                  'Catch 100% of inbound text & voice leads instantly.',
                  'Qualify urgency, location, and issue autonomously.',
                  'Put ready-to-buy customers directly on your dispatch calendar.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/20 rounded-full blur-[40px] pointer-events-none" />
              <div className="flex flex-col gap-6">
                {/* Mock Chat UI for Missed Call */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-slate-500 font-medium tracking-wider mb-2 text-center uppercase">Missed Call from (555) 019-3824</div>
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] border border-slate-700">
                    <p className="text-sm">Hi, this is ServiceNova AI for Elite Air. We noticed we missed your call. How can we help you today?</p>
                  </div>
                  <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-sm self-end max-w-[85%]">
                    <p className="text-sm">My AC is leaking water heavily and stopped cooling. Can you send someone today?</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] border border-slate-700">
                    <p className="text-sm">I can dispatch an emergency tech between 2PM - 4PM today. It's a $79 dispatch fee. Should I book this for you?</p>
                  </div>
                  <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-sm self-end max-w-[85%]">
                    <p className="text-sm">Yes please, ASAP.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] border border-emerald-500/30">
                    <p className="text-sm text-emerald-400 font-medium flex items-center gap-2"><CalendarCheck className="w-4 h-4" /> Appointment Confirmed for 2PM.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four AI Modules (Features) */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">A complete intelligence layer.</h2>
            <p className="text-lg text-slate-400">We don't just provide an answering service. ServiceNova AI is a four-engine system designed to run on top of GoHighLevel, ServiceTitan, or Jobber.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-3xl hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-6">
                <PhoneMissed className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Lead Conversion</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Responds to new leads instantly across SMS and web chat. Qualifies them with dynamic questions, handles basic objections, and delivers instant quoting if required.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-3xl hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Appointment Setter</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Syncs directly with your dispatch calendar. Books jobs, reschedules appointments, sends courtesy reminders, and handles after-hours emergency calls flawlessly.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-3xl hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Customer Service</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Automates FAQs, warranty inquiries, and maintenance reminders. Politely follows up after jobs are completed to secure 5-star Google reviews on autopilot.</p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel p-8 rounded-3xl hover:border-brand-500/50 transition-colors relative overflow-hidden">
               {/* Shine effect */}
               <div className="absolute top-0 right-0 p-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-brand-500 text-white rounded-full shadow-lg">Our SaaS Platform</span>
               </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">ServiceNova Dashboard</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Your proprietary reporting engine. Track lead sources, AI conversion rates, technician performance, and revenue projections securely in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Priced for maximum ROI.</h2>
            <p className="text-xl text-slate-400">One booked install pays for your entire system.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* SaaS Only */}
            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between border-slate-700 hover:border-slate-500 transition-colors">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Platform Access</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold">$297</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">For companies with established front-desk teams that just need the reporting layer.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> ServiceNova Dashboard</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> CRM Syncing</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> Weekly AI Reports</li>
                </ul>
              </div>
              <button onClick={() => openCheckout('platform')} className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700">Select Plan</button>
            </div>

            {/* Growth Engine - Main */}
            <div className="p-8 rounded-3xl flex flex-col justify-between bg-gradient-to-b from-brand-900 to-[#0f1115] border-2 border-brand-500 relative transform md:-translate-y-4 shadow-2xl shadow-brand-500/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">AI Growth Engine</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-white">$997</span>
                  <span className="text-brand-200">/mo</span>
                </div>
                <p className="text-sm text-brand-200 mb-6">The complete AI operating system replacing call centers and manual follow-up.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-brand-400"/> <b>Everything in Platform</b></li>
                  <li className="flex items-center gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-brand-400"/> AI Lead Conversion Engine</li>
                  <li className="flex items-center gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-brand-400"/> AI Appointment Setter</li>
                  <li className="flex items-center gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-brand-400"/> Review Generation</li>
                </ul>
              </div>
              <button onClick={() => openCheckout('growth')} className="w-full py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-bold transition-colors shadow-lg">Start 30-Day Guarantee</button>
            </div>

            {/* Premium */}
            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between border-slate-700 hover:border-slate-500 transition-colors">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Premium Growth</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold">$1,997</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">The ultimate done-for-you package including top-tier paid traffic management.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> <b>Everything in Growth</b></li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> Google Local Services Ads</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-brand-400"/> Dedicated Account Manager</li>
                </ul>
              </div>
              <button onClick={() => openCheckout('premium')} className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700">Select Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-brand-900 to-indigo-900 border border-brand-500/30 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The Ironclad Guarantee</h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              We don't get paid to build bots. We get paid to pack your schedule. <strong>If ServiceNova AI does not book you at least 15 jobs in your first 30 days, you don't pay us a dime.</strong>
            </p>
            <button onClick={() => openCheckout('growth')} className="bg-white text-brand-900 hover:bg-slate-100 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg">
              Book Your Setup Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0c0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span className="text-lg font-bold tracking-tight text-white">ServiceNova <span className="text-brand-400">AI</span></span>
          </div>
          <div className="text-slate-500 flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>&copy; {new Date().getFullYear()} ServiceNova AI. All rights reserved.</span>
          </div>
        </div>
      </footer>
      {/* Checkout Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => !loading && setModalOpen(false)}>
          <div className="w-full max-w-md bg-[#0f1115] border border-white/10 rounded-3xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Get Started</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {PLAN_LABELS[selectedPlan].name} — <span className="text-brand-400 font-semibold">{PLAN_LABELS[selectedPlan].price}</span>
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} disabled={loading} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Jane Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@yourbusiness.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  placeholder="ABC Plumbing LLC"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Checkout…</>
                ) : (
                  <>Proceed to Secure Checkout →</>
                )}
              </button>
              <p className="text-center text-slate-600 text-xs">🔒 Secured by Stripe · Cancel anytime</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
