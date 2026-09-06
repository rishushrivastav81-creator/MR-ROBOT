import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Heart, Sparkles, Send, Check } from 'lucide-react';
import { DoodleButterfly, DoodleHeart, DoodleStar } from './CuteDoodles';
import cuteButterflyImg from '../assets/images/cute_butterfly_moment_1788737394517.jpg';

interface ExactMomentCardProps {
  initialMoment?: string;
  savedMoment?: string;
  onNext: () => void;
  onPrev?: () => void;
  onSaveMoment?: (moment: string) => void;
  onSubmit?: (moment: string) => void;
}

export const ExactMomentCard: React.FC<ExactMomentCardProps> = ({
  initialMoment = '',
  savedMoment = '',
  onNext,
  onPrev,
  onSaveMoment,
  onSubmit,
}) => {
  const currentInitial = savedMoment || initialMoment || '';
  const [momentText, setMomentText] = useState<string>(currentInitial);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(Boolean(currentInitial.trim()));
  const [justSavedNotice, setJustSavedNotice] = useState<boolean>(false);

  const inspirationPrompts = [
    'That late night conversation...',
    'The way you laughed at my silly joke...',
    'The moment I realized I missed you when you weren’t around...',
    'When everything suddenly felt comfortable with you...',
  ];

  const handleApplyPrompt = (prompt: string) => {
    if (!momentText.trim()) {
      setMomentText(prompt + ' ');
    } else {
      setMomentText((prev) => `${prev.trim()} ${prompt} `);
    }
  };

  const handleSaveOnly = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = momentText.trim();
    if (trimmed.length > 0) {
      if (onSaveMoment) onSaveMoment(trimmed);
      if (onSubmit) onSubmit(trimmed);
      setIsSubmitted(true);
      setJustSavedNotice(true);
      setTimeout(() => setJustSavedNotice(false), 3000);
    }
  };

  const handleProceedToFinal = () => {
    const trimmed = momentText.trim();
    if (trimmed.length > 0) {
      if (onSaveMoment) onSaveMoment(trimmed);
      if (onSubmit) onSubmit(trimmed);
    }
    if (onNext) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 relative luxury-card"
    >
      {/* Corner Accents */}
      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-l-2 border-pink-500/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-r-2 border-pink-500/30 rounded-br-xl pointer-events-none" />

      {/* Floating Header Badges */}
      <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <DoodleButterfly size={20} />
          <span className="text-[10px] tracking-[0.3em] uppercase text-pink-300 font-semibold font-mono">
            Your Turn // Butterflies
          </span>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold px-3 py-0.5 border border-white/10 rounded-full font-mono">
          13 / 14
        </span>
      </div>

      {/* Romantic Illustration Banner */}
      <div className="relative mb-5 flex flex-col items-center">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-pink-400/30 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
          <img
            src={cuteButterflyImg}
            alt="Cute cartoon butterflies moment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-1.5 inset-x-0 text-center">
            <span className="text-[10px] tracking-wider font-serif italic text-pink-100">
              Butterflies in your stomach ✨
            </span>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-5 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif glow-text italic font-light tracking-tight text-white leading-tight">
          Now tell me, Mr. Robot...
        </h2>
        <p className="text-pink-200/90 text-sm sm:text-base font-light italic leading-relaxed">
          What was the exact moment you fell for me and felt butterflies in your stomach? 🦋
        </p>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mx-auto pt-1" />
      </div>

      {/* Interactive Form or Saved State */}
      {!isSubmitted ? (
        <form onSubmit={handleSaveOnly} className="space-y-4">
          <div className="relative">
            <textarea
              id="exact-moment-textarea"
              value={momentText}
              onChange={(e) => setMomentText(e.target.value)}
              placeholder="Take your time... tell me about that exact second, what was happening, what I said, or how it felt..."
              rows={4}
              className="w-full p-4 rounded-2xl bg-black/40 border border-pink-500/25 text-pink-50 placeholder-pink-300/30 text-sm sm:text-base font-light focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none shadow-inner"
            />
            <div className="absolute bottom-3 right-3 text-pink-300/40 text-[11px] font-mono">
              {momentText.length} characters
            </div>
          </div>

          {/* Quick inspiration chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] tracking-wider uppercase text-pink-300/50 font-mono block text-left">
              Quick prompts if words are hard:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {inspirationPrompts.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleApplyPrompt(p)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-pink-500/20 text-pink-200/75 hover:text-white border border-white/10 transition-colors text-left cursor-pointer"
                >
                  + {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="save-moment-in-heart-btn"
            type="button"
            onClick={handleSaveOnly}
            disabled={!momentText.trim()}
            className="w-full min-h-[48px] px-6 py-3.5 rounded-full luxury-btn-primary text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(244,63,94,0.4)] cursor-pointer"
          >
            <span>Save our moment in my heart</span>
            <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Confession Box */}
          <div className="p-5 rounded-2xl bg-pink-950/30 border border-pink-500/30 relative text-left shadow-[0_0_30px_rgba(244,63,94,0.2)]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink-500/20">
              <span className="text-[10px] uppercase font-mono tracking-widest text-pink-300/70 flex items-center gap-1.5">
                <Check className="w-3 h-3 text-pink-400" />
                Locked in Ishu's heart
              </span>
              <DoodleHeart size={18} />
            </div>
            <p className="text-pink-100 font-serif italic text-base leading-relaxed whitespace-pre-line">
              "{momentText}"
            </p>
            <div className="text-right mt-2">
              <span className="text-xs text-pink-300/50 font-serif italic">
                — Mr. Robot's confession
              </span>
            </div>
          </div>

          {justSavedNotice && (
            <div className="text-xs font-mono text-emerald-300 text-center bg-emerald-950/40 border border-emerald-500/30 py-1.5 px-3 rounded-xl animate-fade-in">
              ✨ Confession locked safely in Ishu's diary and logs!
            </div>
          )}

          <p className="text-xs font-serif italic text-pink-200/80 text-center">
            "I'm keeping this locked in my heart. Now read my final words..." 🦋
          </p>

          {/* Direct Proceed Button */}
          <button
            id="proceed-to-final-after-save-btn"
            type="button"
            onClick={handleProceedToFinal}
            className="w-full min-h-[48px] px-6 py-3.5 rounded-full luxury-btn-primary text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.5)] cursor-pointer"
          >
            <span>Read my final words</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Edit option */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-[11px] text-pink-300/60 hover:text-pink-100 underline tracking-wider font-mono uppercase cursor-pointer"
            >
              Edit my answer
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation Footer */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-3">
        {onPrev && (
          <button
            id="exact-moment-back-btn"
            type="button"
            onClick={onPrev}
            className="px-5 py-3.5 luxury-btn-secondary rounded-full text-xs uppercase tracking-[0.16em] font-medium text-pink-200/80 flex items-center justify-center gap-1.5 min-h-[48px] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}

        <button
          id="read-my-final-words-footer-btn"
          type="button"
          onClick={handleProceedToFinal}
          className="flex-1 min-h-[48px] px-6 py-3.5 rounded-full luxury-btn-primary text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)]"
        >
          <span>Read my final words</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
