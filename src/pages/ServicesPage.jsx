import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAFETY_GUIDELINES } from '../data/initialData';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  Headphones,
  Gift,
  ArrowRight,
  Flame,
  X,
} from 'lucide-react';

export const ServicesPage = () => {
  const { navigate, showToast } = useApp();
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportForm, setSupportForm] = useState({ name: '', phone: '', query: '' });

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportForm.name || !supportForm.phone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportModalOpen(false);
      setSupportForm({ name: '', phone: '', query: '' });
      showToast('Support ticket #TKT-8842 created. Our Sivakasi team will contact you!', 'success');
    }, 1200);
  };

  const services = [
    {
      id: 'online-shopping',
      title: 'Online Shopping',
      desc: 'Browse 20+ varieties of genuine Sivakasi fireworks with transparent prices, instant stock visibility, and detailed specifications.',
      icon: ShoppingBag,
      color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400',
      actionLabel: 'Go to Shop',
      action: () => navigate('shop'),
    },
    {
      id: 'quality-safety',
      title: 'Quality & Safety',
      desc: 'Strictly 100% PESO certified eco-friendly green fireworks. Tested for minimal smoke emissions and zero banned chemicals.',
      icon: ShieldCheck,
      color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400',
      actionLabel: 'View Safety Guide',
      action: () => {
        const el = document.getElementById('safety-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'reliable-delivery',
      title: 'Fast & Reliable Delivery',
      desc: 'Dispatched through authorized fireworks carrier logistics across India. Multi-layer shockproof, fire-retardant packing.',
      icon: Truck,
      color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400',
      actionLabel: 'Track Existing Orders',
      action: () => navigate('orders'),
    },
    {
      id: 'best-prices',
      title: 'Best Wholesale Prices',
      desc: 'Direct factory pricing with up to 40% festival discount. No middlemen commission, passing maximum savings to families.',
      icon: Tag,
      color: 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400',
      actionLabel: 'Explore Offers',
      action: () => navigate('offers'),
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      desc: 'Dedicated festival helpline for assistance with bulk school/corporate orders, custom box assembly, and delivery status.',
      icon: Headphones,
      color: 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-400',
      actionLabel: 'Open Help Desk',
      action: () => setSupportModalOpen(true),
    },
    {
      id: 'festival-packs',
      title: 'Special Festival Packs',
      desc: 'Specially assembled gift hampers for toddlers, children, teenagers, and multi-family community celebrations.',
      icon: Gift,
      color: 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400',
      actionLabel: 'View Family Packs',
      action: () => navigate('shop', { category: 'gift-boxes' }),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold text-red-700 dark:text-amber-400 uppercase tracking-widest mb-2 bg-red-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-red-200 dark:border-amber-900/50">
          Our Services & Commitment
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
          More Than Just Crackers
        </h1>
        <p className="text-lg sm:text-xl text-maroon-800 dark:text-amber-300 font-semibold mb-3">
          We're Your Celebration Partner
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          From sourcing authentic Sivakasi pyrotechnics to doorstep delivery and family safety instructions, we guarantee a sparkling festival for your loved ones.
        </p>
      </div>

      {/* 6 Functional Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${svc.color} flex items-center justify-center mb-5 shadow-inner`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {svc.desc}
                </p>
              </div>

              {/* Working Action Button */}
              <button
                onClick={svc.action}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-red-50 dark:bg-gray-800/80 dark:hover:bg-amber-950/30 text-gray-900 dark:text-gray-200 hover:text-red-700 dark:hover:text-amber-400 font-bold text-xs border border-gray-200 dark:border-gray-700 transition-colors flex items-center justify-between"
              >
                <span>{svc.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Safety First Responsible Use Reminders */}
      <section id="safety-section" className="bg-amber-50/70 dark:bg-[#1E2026] rounded-3xl border border-amber-200/80 dark:border-gray-800 p-8 sm:p-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Safety First
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Essential fireworks safety guidelines for safe and joyous festivities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {SAFETY_GUIDELINES.map((guide, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#15161A] p-5 rounded-2xl border border-amber-200/50 dark:border-gray-800 shadow-sm flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                0{idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  {guide.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1E2026] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
            <button
              onClick={() => setSupportModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Festival Support Desk
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Need assistance with product selection, bulk order discounts, or dispatch queries? Send us a quick note.
            </p>

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={supportForm.name}
                  onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={supportForm.phone}
                  onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })}
                  placeholder="e.g. 98410 12345"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Query / Requirement
                </label>
                <textarea
                  rows={3}
                  value={supportForm.query}
                  onChange={(e) => setSupportForm({ ...supportForm, query: e.target.value })}
                  placeholder="e.g. Inquiring for 5 Diwali gift hampers for apartment society"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={supportSubmitted}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white text-xs font-bold shadow transition-all"
                >
                  {supportSubmitted ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
