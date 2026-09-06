import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, ChevronDown, ChevronUp, Lock, Sparkles, Heart, FileText, Download, Copy, Check } from 'lucide-react';
import { MATTER_CARDS } from '../data/storyData';
import { AnswersMap } from '../types';
import { DoodleHeart, DoodleButterfly, DoodleStar } from './CuteDoodles';
import { generateLogText, downloadFile } from '../utils/confessionLogger';

interface FinalScreenProps {
  onRestart: () => void;
  answers: AnswersMap;
  savedMoment?: string;
  onOpenLogModal?: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  onRestart,
  answers,
  savedMoment,
  onOpenLogModal,
}) => {
  const [showSummary, setShowSummary] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const answeredCount = Object.keys(answers).length;

  const handleDownloadTxt = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const text = generateLogText(answers, savedMoment || '');
    downloadFile(`mr_robot_confession_log_${timestamp}.txt`, text, 'text/plain');
  };

  const handleCopyLog = () => {
    const text = generateLogText(answers, savedMoment || '');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 relative luxury-card"
    >
      {/* Dark Luxury Corner Accents */}
      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-l-2 border-pink-500/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-r-2 border-pink-500/30 rounded-br-xl pointer-events-none" />

      {/* Subtle butterfly and heart accents */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <DoodleHeart size={22} />
        <DoodleButterfly size={32} />
        <DoodleStar size={20} />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-white/[0.08]">
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold font-mono">
          Final Note // To Mr. Robot
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold px-3.5 py-0.5 border border-white/10 rounded-full font-mono">
          14 / 14
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-6 space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif glow-text italic font-light tracking-tight text-white leading-tight">
          One last thing, Mr. Robot.
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mx-auto" />
      </div>

      {/* Narrative Text */}
      <div className="text-center my-6 space-y-5">
        <p className="whitespace-pre-line text-pink-50/90 leading-relaxed text-base sm:text-lg font-light tracking-wide px-2">
          {`Thank you for making me feel something
I wasn't expecting to feel.

I don't know exactly where this story ends.

But I'm willing to find out.

With you.`}
        </p>

        {/* Sender Signature */}
        <div className="pt-4 text-right pr-4 sm:pr-8">
          <p className="font-serif italic text-xl sm:text-2xl text-pink-200 tracking-wider">
            — Ishu
          </p>
        </div>
      </div>

      {/* Mr. Robot's Butterfly Moment Box (if entered) */}
      {savedMoment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-5 p-4 rounded-2xl bg-pink-950/25 border border-pink-500/20 text-left shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-pink-500/15">
            <span className="text-[10px] uppercase font-mono tracking-widest text-pink-300/60 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-pink-400" />
              Your exact butterfly moment:
            </span>
            <span className="text-xs">🦋</span>
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-pink-100/90 leading-relaxed">
            "{savedMoment}"
          </p>
        </motion.div>
      )}

      {/* Mr. Robot's Confession File & Answers Log Box */}
      <div className="my-6 p-5 rounded-3xl bg-gradient-to-br from-pink-950/40 via-purple-950/25 to-black/40 border border-pink-500/30 text-left shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(244,63,94,0.15)]">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-pink-500/20">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-pink-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-pink-200 font-semibold">
              Confession File & Log
            </span>
          </div>
          <span className="text-[10px] font-mono text-pink-300/70 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">
            mr_robot_confession.txt
          </span>
        </div>

        <p className="text-xs text-pink-100/80 leading-relaxed mb-3">
          All your answers, feelings, and exact butterfly moment have been safely recorded and logged for Ishu.
        </p>

        {/* Quick action buttons for File & Log */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {onOpenLogModal && (
            <button
              onClick={onOpenLogModal}
              className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-xs font-medium text-pink-100 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-pink-300" />
              <span>View Full Log</span>
            </button>
          )}

          <button
            onClick={handleDownloadTxt}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border border-pink-300/40 text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.25)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TXT</span>
          </button>

          <button
            onClick={handleCopyLog}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-medium text-pink-200 hover:text-white transition-all"
            title="Copy log to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Safe Answers Privacy Note */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-300/50 uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5 text-pink-400/60" />
          <span>Your answers are safe here.</span>
        </div>

        {/* Optional Collapsible Summary of Screen 9 Answers */}
        {answeredCount > 0 && (
          <div className="w-full">
            <button
              id="toggle-final-summary-btn"
              onClick={() => setShowSummary(!showSummary)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-pink-200/80 text-xs tracking-wider uppercase font-mono transition-colors border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                What matters to us ({answeredCount}/{MATTER_CARDS.length})
              </span>
              {showSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1"
              >
                {MATTER_CARDS.map((card) => {
                  const answer = answers[card.id];
                  return (
                    <div
                      key={card.id}
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-left flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="text-pink-100 font-medium">{card.question}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-200 text-[11px] font-medium whitespace-nowrap border border-pink-500/25">
                        {answer || '—'}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        )}

        {/* Read from the beginning */}
        <button
          id="restart-to-mr-robot-btn"
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-pink-200/70 hover:text-white text-xs uppercase tracking-[0.15em] transition-all min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Read from the beginning</span>
        </button>
      </div>
    </motion.div>
  );
};
