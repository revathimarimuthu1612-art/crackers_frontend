import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

// Dedicated, High-Definition, Vivid Firework Category Icons

// 1. Sparklers (Sparkler Stick with 360° Bursting Fire Sparks)
const SparklersIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 26L21 15" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <path d="M21 15L25 11" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="21" cy="15" r="3.5" fill="#F59E0B" />
    <path d="M21 5V8M21 22V25M11 15H14M28 15H31M14 8L16.5 10.5M25.5 19.5L28 22M25.5 8.5L23 11M16.5 19.5L14 22" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <circle cx="21" cy="5" r="1.5" fill="#FBBF24" />
    <circle cx="31" cy="15" r="1.5" fill="#FBBF24" />
    <circle cx="11" cy="15" r="1.5" fill="#FBBF24" />
    <circle cx="21" cy="25" r="1.5" fill="#FBBF24" />
  </svg>
);

// 2. Sky Rockets (Festive Sky Rocket with Launch Plume)
const RocketsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 31L19 19" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M17 20L23 14L20 11L14 17L17 20Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
    <path d="M23 14L29 8L20 11L23 14Z" fill="#F59E0B" />
    <path d="M13 18L7 24L11 20L8 28L15 22L13 18Z" fill="#F97316" />
    <path d="M12 19L9 22L11 20L9 25L13 22L12 19Z" fill="#FBBF24" />
  </svg>
);

// 3. Flower Pots / Fountain (Cone Fireworks Shooting Fountain Sparks)
const FlowerPotsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cone Anar Body */}
    <path d="M10 29L18 16L26 29H10Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
    <path d="M13 29L18 18L23 29H13Z" fill="#F59E0B" />
    {/* Cascading Sparks Fountain */}
    <path d="M18 16C18 16 11 8 9 4M18 16C18 16 14 6 14 2M18 16C18 16 18 5 18 1M18 16C18 16 22 6 22 2M18 16C18 16 25 8 27 4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="4" r="1.5" fill="#FBBF24" />
    <circle cx="14" cy="2" r="1.5" fill="#F97316" />
    <circle cx="18" cy="1" r="1.5" fill="#FBBF24" />
    <circle cx="22" cy="2" r="1.5" fill="#F97316" />
    <circle cx="27" cy="4" r="1.5" fill="#FBBF24" />
  </svg>
);

// 4. Fancy Aerial Shots (Multi-Shot Cake Box Bursting Sky Fireworks)
const AerialShotsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="21" width="18" height="10" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
    <rect x="12" y="19" width="12" height="3" fill="#D97706" />
    {/* Midnight Sky Fireworks Burst */}
    <path d="M18 3L19.5 7.5L24 9L19.5 10.5L18 15L16.5 10.5L12 9L16.5 7.5L18 3Z" fill="#F59E0B" />
    <path d="M8 6L9 8L11 9L9 10L8 12L7 10L5 9L7 8L8 6Z" fill="#EF4444" />
    <path d="M28 6L29 8L31 9L29 10L28 12L27 10L25 9L27 8L28 6Z" fill="#3B82F6" />
  </svg>
);

// 5. Ground Chakkars (Spinning Fiery Wheel)
const GroundChakkarsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="12" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    <circle cx="18" cy="18" r="7" fill="#FBBF24" />
    <circle cx="18" cy="18" r="3.5" fill="#DC2626" />
    <path d="M18 3C26.3 3 33 9.7 33 18" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
    <path d="M18 33C9.7 33 3 26.3 3 18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
  </svg>
);

// 6. Sound Crackers (Red Garlands / Lakshmi Crackers)
const SoundCrackersIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 7C14 10 22 25 28 28" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="9" y="10" width="5" height="11" rx="1.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" transform="rotate(-20 9 10)" />
    <rect x="15" y="16" width="5" height="11" rx="1.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" transform="rotate(15 15 16)" />
    <rect x="21" y="21" width="5" height="11" rx="1.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" transform="rotate(-10 21 21)" />
    <circle cx="7" cy="6" r="3" fill="#F59E0B" />
    <path d="M7 2V0M3 4H1M7 10V12M11 8H13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 7. Kids Special (Magic Wand & Colorful Pop Snappers)
const KidsSpecialIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 27L19 17" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <path d="M19 17L22 14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 6L23.5 9.5L27 11L23.5 12.5L22 16L20.5 12.5L17 11L20.5 9.5L22 6Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
    <circle cx="29" cy="7" r="2" fill="#EC4899" />
    <circle cx="13" cy="6" r="2" fill="#10B981" />
    <circle cx="30" cy="18" r="2" fill="#6366F1" />
  </svg>
);

// 8. Gift Boxes & Combos (Festival Hamper Gift Box)
const GiftBoxesIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="16" width="22" height="14" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
    <rect x="5" y="12" width="26" height="5" rx="1.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    <rect x="16" y="12" width="4" height="18" fill="#DC2626" />
    <path d="M14 9C11 6 9 9 16 12C23 9 21 6 18 9Z" fill="#DC2626" />
  </svg>
);

const iconMap = {
  sparklers: SparklersIcon,
  Sparkles: SparklersIcon,
  rockets: RocketsIcon,
  Rocket: RocketsIcon,
  'flower-pots': FlowerPotsIcon,
  Flower2: FlowerPotsIcon,
  'aerial-shots': AerialShotsIcon,
  Zap: AerialShotsIcon,
  chakkars: GroundChakkarsIcon,
  Disc: GroundChakkarsIcon,
  'sound-crackers': SoundCrackersIcon,
  Volume2: SoundCrackersIcon,
  'kids-special': KidsSpecialIcon,
  Smile: KidsSpecialIcon,
  'gift-boxes': GiftBoxesIcon,
  Gift: GiftBoxesIcon,
};

export const CategoryCard = ({ category }) => {
  const { navigate } = useApp();

  // Pick dedicated firework icon component by category ID or icon name
  const IconComponent =
    iconMap[category.id] || iconMap[category.icon] || SparklersIcon;

  const handleClick = () => {
    navigate('shop', { category: category.id });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Background Gradient Hover Accent */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-red-600/20 blur-xl group-hover:scale-150 transition-transform"></div>

      <div>
        {/* Crystal Clear Firework Icon & Count Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-700/80 border border-amber-200/70 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm flex-shrink-0">
            <IconComponent />
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-gray-800 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-gray-700 shadow-sm">
            {category.count || 4}+ Items
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors mb-1.5">
          {category.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      {/* Action Prompt */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-maroon-800 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
        <span>Explore Products</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};
