'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Calendar, MessageSquare, Zap } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingSuccessPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const steps = [
    {
      icon: <Calendar className="w-5 h-5 text-brand-400" />,
      title: 'Setup Call Scheduled',
      desc: 'Check your email for a calendar invite within 24 hours.',
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-400" />,
      title: 'AI Engine Provisioned',
      desc: 'We will configure your AI workflows in GoHighLevel.',
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-brand-400" />,
      title: 'Live in 7 Days',
      desc: 'Your AI will be answering leads and booking jobs within a week.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white flex items-center justify-center px-4">
      <div
        className="max-w-lg w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Success Badge */}
        <div className="w-20 h-20 rounded-full bg-brand-500/20 border-2 border-brand-500/40 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-brand-400" />
        </div>

        <h1 className="text-4xl font-bold mb-4">
          You&apos;re in. Let&apos;s get you booked.
        </h1>
        <p className="text-slate-400 text-lg mb-12">
          Payment received. Your ServiceNova AI onboarding has officially started.
          A member of our team will be in touch within 24 hours.
        </p>

        {/* Next Steps */}
        <div className="text-left space-y-4 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <p className="font-semibold text-white">{step.title}</p>
                <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-brand-500/30"
        >
          View Your Dashboard →
        </Link>

        <p className="text-slate-600 text-sm mt-6">
          Questions? Reach us at{' '}
          <a href="mailto:hello@servicenova.ai" className="text-brand-400 hover:underline">
            hello@servicenova.ai
          </a>
        </p>
      </div>
    </div>
  )
}
