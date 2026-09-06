import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Heart } from 'lucide-react';
import { NarrativeScreen } from '../types';
import { DoodleHeart, DoodleButterfly, DoodleStar } from './CuteDoodles';
import cuteCoupleImg from '../assets/images/cute_couple_doodle_1788737365864.jpg';
import cuteTalkingImg from '../assets/images/cute_doodle_butterflies_1788737381261.jpg';

interface StoryCardProps {
  screen: NarrativeScreen;
  onNext: () => void;
  onPrev?: () => void;
  canGoBack?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  screen,
  onNext,
  onPrev,
  canGoBack = false,
}) => {
  const isPlayful = screen.id === 10;
  const isScreen12 = screen.id === 12;
  const isIntro = screen.id === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full max-w-lg mx-auto rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 relative ${
        isPlayful ? 'luxury-card-playful' : 'luxury-card'
      }`}
    >
      {/* Dark Luxury Corner Accents */}
      <div
        className={`absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-l-2 ${
          isPlayful ? 'border-amber-400/40' : 'border-pink-500/30'
        } rounded-tl-xl pointer-events-none`}
      />
      <div
        className={`absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-r-2 ${
          isPlayful ? 'border-amber-400/40' : 'border-pink-500/30'
        } rounded-br-xl pointer-events-none`}
      />

      {/* Progress / Step Badge */}
      <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          {isIntro && <DoodleHeart size={18} />}
          {isPlayful && <DoodleStar size={18} />}
          {!isIntro && !isPlayful && <DoodleButterfly size={18} />}
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold font-mono">
            {screen.category || 'Personal Letter'}
          </span>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold px-3.5 py-0.5 border border-white/10 rounded-full font-mono">
          {screen.badge}
        </span>
      </div>

      {/* Cute Cartoon Illustration for Intro & Teasing Screen */}
      {isIntro && (
        <div className="relative mb-5 flex justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-pink-400/30 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
            <img
              src={cuteCoupleImg}
              alt="Cute cartoon doodle couple"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1 inset-x-0 text-center">
              <span className="text-[9px] tracking-widest uppercase font-mono text-pink-200/90">
                To Mr. Robot 💌
              </span>
            </div>
          </div>
        </div>
      )}

      {isPlayful && (
        <div className="relative mb-5 flex justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-amber-400/30 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
            <img
              src={cuteTalkingImg}
              alt="Cute doodle talking and teasing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1 inset-x-0 text-center">
              <span className="text-[9px] tracking-widest uppercase font-mono text-amber-200/90">
                Just a little tease 🙈
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Heading with Glow & Divider */}
      <div className="text-center mb-6 space-y-3">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-serif glow-text italic font-light tracking-tight leading-tight ${
            isPlayful ? 'text-amber-100' : 'text-white'
          }`}
        >
          {screen.heading}
        </h2>
        <div
          className={`h-[1px] w-20 sm:w-24 mx-auto ${
            isPlayful
              ? 'bg-gradient-to-r from-transparent via-amber-400/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-pink-400/40 to-transparent'
          }`}
        />
      </div>

      {/* Content Text with Subtle Fade */}
      <div className="text-center my-6 space-y-4">
        <div className="whitespace-pre-line text-pink-50/90 leading-relaxed text-base sm:text-lg font-light tracking-wide px-2">
          {screen.text}
        </div>

        {/* Screen 5: Subtle Pause Animation */}
        {screen.hasPauseAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="pt-2 flex items-center justify-center gap-2 text-pink-300/60"
          >
            <DoodleButterfly size={16} />
            <span className="text-xs font-serif italic tracking-widest uppercase">
              a quiet moment
            </span>
            <DoodleHeart size={16} />
          </motion.div>
        )}

        {/* Screen 12: Final Highlighted Line */}
        {screen.highlightText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-4"
          >
            <div className="py-3 px-6 rounded-2xl bg-white/[0.04] border border-pink-500/25 max-w-sm mx-auto shadow-[0_0_30px_rgba(225,29,72,0.18)]">
              <p className="text-base sm:text-lg font-serif italic text-pink-200 glow-text">
                "{screen.highlightText}"
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-col items-center gap-3">
        <div className="w-full flex items-center justify-center gap-3">
          {canGoBack && onPrev && (
            <button
              id={`story-card-prev-${screen.id}`}
              onClick={onPrev}
              className="px-5 py-3.5 luxury-btn-secondary rounded-full text-xs uppercase tracking-[0.16em] font-medium text-pink-200/80 flex items-center justify-center gap-1.5 min-h-[48px]"
              aria-label="Previous screen"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button
            id={`story-card-btn-${screen.id}`}
            onClick={onNext}
            className={`flex-1 min-h-[48px] px-8 sm:px-12 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center justify-center gap-2 ${
              isPlayful
                ? 'bg-gradient-to-r from-[#8a4b08] to-[#5e172a] hover:from-[#a75d0d] hover:to-[#771d36] shadow-[0_0_30px_rgba(217,119,6,0.3)] border border-white/15'
                : 'luxury-btn-primary'
            }`}
          >
            <span>{screen.buttonText}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[10px] opacity-30 italic font-serif tracking-widest text-center flex items-center justify-center gap-1.5">
          <span>{isPlayful ? 'A playful confession' : 'Digital letter for Nachiket'}</span>
          <Heart className="w-2.5 h-2.5 fill-pink-300 text-pink-300" />
        </div>
      </div>
    </motion.div>
  );
};

