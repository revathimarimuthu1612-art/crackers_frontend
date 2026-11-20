import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

// Crisp Brand Social Media SVGs
const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.416V8z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const Footer = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#18191E] text-gray-300 border-t border-gray-800 pt-12 pb-24 lg:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer transition-transform"
              title="Admin Portal"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maroon-800 to-red-600 flex items-center justify-center text-amber-300 shadow group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Sivakasi <span className="text-amber-400">Sparkles</span>
              </span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for authentic Sivakasi festival crackers and fireworks. 100% PESO tested, green firework certified, delivering joy safely to homes.
            </p>
            <div className="inline-flex items-center gap-2 text-xs bg-amber-950/40 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-800/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Govt. Licensed Fireworks Distributor</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shop Crackers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('categories')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Services & Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('offers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Festival Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media Links & Connect */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Connect With Us
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Follow our official social media channels for Diwali festive offers, cracker demonstration videos, and instant booking updates.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-600 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                title="Instagram"
              >
                <InstagramIcon />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                title="Facebook"
              >
                <FacebookIcon />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919943830644"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                title="WhatsApp Direct Support"
              >
                <WhatsAppIcon />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                title="YouTube Demos"
              >
                <YoutubeIcon />
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-sky-500 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-md group"
                title="Twitter / X"
              >
                <TwitterIcon />
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800/80 text-xs text-amber-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Diwali Festive Support Active 24/7</span>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Store & Contact Info
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Express Highway Road, Sivakasi, Tamil Nadu - 626123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 9943830644</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>support@sivakasisparkles.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} Sivakasi Sparkles. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-gray-400">
            PESO Certified & 100% Genuine Sivakasi Fireworks
          </p>
        </div>
      </div>
    </footer>
  );
};
