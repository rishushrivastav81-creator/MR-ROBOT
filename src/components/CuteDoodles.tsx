import React from 'react';
import { motion } from 'motion/react';

// Cute hand-drawn SVG Doodle Heart with blushing cheeks
export const DoodleHeart: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)] ${className}`}
    animate={{
      scale: [1, 1.15, 0.98, 1.1, 1],
      rotate: [-2, 3, -1, 2, -2],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {/* Hand-drawn heart outline */}
    <path
      d="M24 39.5C23.2 39 10 29.8 6.5 21C3.2 12.8 9.5 5 18 6.8C20.6 7.4 22.8 9.2 24 11.2C25.2 9.2 27.4 7.4 30 6.8C38.5 5 44.8 12.8 41.5 21C38 29.8 24.8 39 24 39.5Z"
      fill="rgba(244, 63, 94, 0.35)"
      stroke="#fb7185"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cute eyes */}
    <circle cx="18" cy="18" r="1.8" fill="#ffe4e6" />
    <circle cx="30" cy="18" r="1.8" fill="#ffe4e6" />
    {/* Cute smile */}
    <path
      d="M21 22.5C22.5 24.5 25.5 24.5 27 22.5"
      stroke="#ffe4e6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Blushing cheeks */}
    <circle cx="14" cy="21" r="2.2" fill="rgba(251, 113, 133, 0.7)" />
    <circle cx="34" cy="21" r="2.2" fill="rgba(251, 113, 133, 0.7)" />
  </motion.svg>
);

// Cute animated doodle butterfly
export const DoodleButterfly: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)] ${className}`}
    animate={{
      y: [0, -6, 2, -5, 0],
      rotate: [-3, 4, -2, 3, -3],
    }}
    transition={{
      duration: 3.2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {/* Left upper wing */}
    <motion.path
      d="M24 24C16 14 4 15 7 27C9 34 23 27 24 26"
      fill="rgba(244, 114, 182, 0.3)"
      stroke="#f472b6"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ scaleX: [1, 0.6, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originX: '24px', originY: '25px' }}
    />
    {/* Right upper wing */}
    <motion.path
      d="M26 24C34 14 46 15 43 27C41 34 27 27 26 26"
      fill="rgba(244, 114, 182, 0.3)"
      stroke="#f472b6"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ scaleX: [1, 0.6, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originX: '26px', originY: '25px' }}
    />
    {/* Body */}
    <path
      d="M25 18C25.5 22 25.5 28 25 33"
      stroke="#fbcfe8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Antennae */}
    <path
      d="M24 18C21 13 18 14 17 15"
      stroke="#fbcfe8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M26 18C29 13 32 14 33 15"
      stroke="#fbcfe8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

// Cute doodle sparkle star
export const DoodleStar: React.FC<{ className?: string; size?: number; delay?: number }> = ({
  className = '',
  size = 22,
  delay = 0,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    animate={{
      scale: [0.7, 1.2, 0.8, 1.1, 0.7],
      rotate: [0, 45, 90, 135, 180],
      opacity: [0.4, 0.95, 0.5, 0.9, 0.4],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <path
      d="M16 2C16 10 20 14 28 16C20 18 16 22 16 30C16 22 12 18 4 16C12 14 16 10 16 2Z"
      fill="rgba(253, 230, 138, 0.45)"
      stroke="#fde68a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

// Cute Bak-Bak Talking Doodle (Headphones + Chat bubble with heart)
export const DoodleBakBak: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs ${className}`}
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <span className="text-base" role="img" aria-label="headphones">🎧</span>
    <span className="font-serif italic text-pink-200 font-medium">Bak-bak mode on</span>
    <span className="text-sm" role="img" aria-label="bubble">💭</span>
  </motion.div>
);

// Floating romantic doodle sticker container
export const FloatingRomanticDoodles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top Left fluttering butterfly */}
      <div className="absolute top-12 left-4 sm:left-12 opacity-60">
        <DoodleButterfly size={36} />
      </div>

      {/* Top Right cute heart */}
      <div className="absolute top-20 right-6 sm:right-16 opacity-70">
        <DoodleHeart size={30} />
      </div>

      {/* Mid Left twinkle star */}
      <div className="absolute top-1/3 left-3 sm:left-8 opacity-50">
        <DoodleStar size={24} delay={0.4} />
      </div>

      {/* Mid Right cute butterfly */}
      <div className="absolute top-1/2 right-4 sm:right-10 opacity-60">
        <DoodleButterfly size={28} />
      </div>

      {/* Lower Left cute heart */}
      <div className="absolute bottom-28 left-6 sm:left-14 opacity-60">
        <DoodleHeart size={26} />
      </div>

      {/* Lower Right sparkle star */}
      <div className="absolute bottom-24 right-5 sm:right-12 opacity-50">
        <DoodleStar size={26} delay={0.8} />
      </div>
    </div>
  );
};
