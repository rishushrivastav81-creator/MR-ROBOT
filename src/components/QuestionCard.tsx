import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronLeft } from 'lucide-react';
import { MatterCard } from '../types';
import { DoodleHeart, DoodleButterfly, DoodleStar, DoodleBakBak } from './CuteDoodles';

interface MatterCardProps {
  card: MatterCard;
  currentIndex: number;
  totalCards: number;
  onAnswer: (choice: string) => void;
  onPrev?: () => void;
  selectedAnswer?: string;
}

export const QuestionCard: React.FC<MatterCardProps> = ({
  card,
  currentIndex,
  totalCards,
  onAnswer,
  onPrev,
  selectedAnswer,
}) => {
  const cardBadge = `Card ${String(currentIndex + 1).padStart(2, '0')} / ${String(totalCards).padStart(2, '0')}`;
  const isBakBak = card.id === 10;
  const isRemember = card.id === 11;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 relative luxury-card"
    >
      {/* Dark Luxury Corner Accents */}
      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-l-2 border-pink-500/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-r-2 border-pink-500/30 rounded-br-xl pointer-events-none" />

      {/* Header bar with card progress indicator */}
      <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          {card.hasButterfly && <DoodleButterfly size={18} />}
          {isBakBak && <DoodleHeart size={18} />}
          {isRemember && <DoodleStar size={18} />}
          {!card.hasButterfly && !isBakBak && !isRemember && <DoodleHeart size={16} />}
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold font-mono">
            Screen 09 // What Matters To Me
          </span>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold px-3.5 py-0.5 border border-white/10 rounded-full font-mono">
          {cardBadge}
        </span>
      </div>

      {/* Animated Doodle Element */}
      {card.hasButterfly && (
        <div className="flex justify-center -mt-1 mb-3">
          <DoodleButterfly size={36} />
        </div>
      )}

      {isBakBak && (
        <div className="flex justify-center -mt-1 mb-3">
          <DoodleBakBak />
        </div>
      )}

      {isRemember && (
        <div className="flex justify-center -mt-1 mb-3 gap-2 items-center">
          <DoodleStar size={24} />
          <span className="text-xs font-serif italic text-pink-200/90 tracking-wider">
            keeping your memories close
          </span>
          <DoodleHeart size={20} />
        </div>
      )}

      {/* Heading with Luxury Glow & Gradient Divider */}
      <div className="text-center mb-5 space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif glow-text italic font-light tracking-tight leading-tight text-white">
          {card.question}
        </h2>
        <div className="h-[1px] w-20 sm:w-24 mx-auto bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
      </div>

      {/* Supporting Text */}
      <div className="text-center my-6">
        <p className="whitespace-pre-line text-pink-50/85 leading-relaxed text-base sm:text-lg font-light tracking-wide px-2">
          {card.supporting}
        </p>
      </div>

      {/* Options: "Yes ❤️" & "I'll try" */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-col items-center gap-3">
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          {currentIndex > 0 && onPrev && (
            <button
              id="matter-card-prev-btn"
              onClick={onPrev}
              className="w-full sm:w-auto px-5 py-3.5 luxury-btn-secondary rounded-full text-xs uppercase tracking-[0.16em] font-medium text-pink-200/80 flex items-center justify-center gap-1.5 min-h-[48px]"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="inline">Back</span>
            </button>
          )}

          {card.options.map((option, idx) => {
            const isPrimary = idx === 0;
            const isChosen = selectedAnswer === option;

            return (
              <button
                key={option}
                id={`matter-c${card.id}-opt-${idx}`}
                onClick={() => onAnswer(option)}
                className={`w-full ${currentIndex > 0 ? 'sm:flex-1' : 'sm:w-1/2'} min-h-[48px] px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isChosen
                    ? 'bg-pink-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)] scale-[1.01] border border-white/25'
                    : isPrimary
                    ? 'luxury-btn-primary text-white'
                    : 'luxury-btn-secondary'
                }`}
              >
                <span>{option}</span>
                {isPrimary && <Sparkles className="w-3.5 h-3.5 text-pink-200/60" />}
              </button>
            );
          })}
        </div>

        <div className="text-[10px] opacity-30 italic font-serif tracking-widest text-center mt-1 flex items-center justify-center gap-1.5">
          <span>Honest conversation • Not a test</span>
          <DoodleHeart size={12} />
        </div>
      </div>
    </motion.div>
  );
};
