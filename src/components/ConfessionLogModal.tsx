import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Copy, Check, X, ShieldCheck, Clock, Sparkles, Send } from 'lucide-react';
import { AnswersMap } from '../types';
import { MATTER_CARDS } from '../data/storyData';
import { generateLogText, downloadFile, generateWhatsAppUrl } from '../utils/confessionLogger';
import { DoodleHeart, DoodleButterfly } from './CuteDoodles';

interface ConfessionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: AnswersMap;
  exactMoment: string;
}

export const ConfessionLogModal: React.FC<ConfessionLogModalProps> = ({
  isOpen,
  onClose,
  answers,
  exactMoment,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw' | 'json'>('formatted');

  if (!isOpen) return null;

  const logText = generateLogText(answers, exactMoment);
  const answeredCount = Object.keys(answers).length;
  const totalCount = MATTER_CARDS.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(logText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadFile(`mr_robot_confession_log_${timestamp}.txt`, logText, 'text/plain');
  };

  const handleDownloadJson = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const jsonData = JSON.stringify(
      {
        recipient: 'Mr. Robot (Nachiket)',
        from: 'Ishu',
        loggedAt: new Date().toISOString(),
        exactButterflyMoment: exactMoment || null,
        totalQuestions: totalCount,
        answeredQuestions: answeredCount,
        responses: MATTER_CARDS.map((card, i) => ({
          cardIndex: i + 1,
          id: card.id,
          question: card.question,
          supporting: card.supporting,
          hisAnswer: answers[card.id] || null,
        })),
      },
      null,
      2
    );
    downloadFile(`mr_robot_answers_${timestamp}.json`, jsonData, 'application/json');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#1a050d]/95 border border-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.2)] overflow-hidden text-pink-100"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-pink-500/20 bg-pink-950/30">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-pink-400" />
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                  <span>Ishu’s Secret Confession & Answers Log</span>
                  <DoodleHeart size={14} />
                </h3>
                <p className="text-[11px] font-mono text-pink-300/60">
                  FILE: mr_robot_confession_log.txt • {answeredCount}/{totalCount} answers logged
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-pink-200/60 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="px-5 py-2.5 bg-black/30 border-b border-pink-500/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-300/80 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Log Active
              </span>
              <span className="flex items-center gap-1 text-pink-300/60 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* View switcher */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`px-2.5 py-0.5 text-[11px] rounded font-medium transition-all ${
                  activeTab === 'formatted'
                    ? 'bg-pink-600/60 text-white shadow-sm'
                    : 'text-pink-200/50 hover:text-pink-100'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-2.5 py-0.5 text-[11px] rounded font-mono transition-all ${
                  activeTab === 'raw'
                    ? 'bg-pink-600/60 text-white shadow-sm'
                    : 'text-pink-200/50 hover:text-pink-100'
                }`}
              >
                Text File (.txt)
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-2.5 py-0.5 text-[11px] rounded font-mono transition-all ${
                  activeTab === 'json'
                    ? 'bg-pink-600/60 text-white shadow-sm'
                    : 'text-pink-200/50 hover:text-pink-100'
                }`}
              >
                JSON (.json)
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* View: Formatted Cards */}
            {activeTab === 'formatted' && (
              <div className="space-y-4">
                {/* Exact Butterfly Moment Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-pink-950/40 border border-pink-500/30">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink-500/20">
                    <span className="text-xs uppercase font-mono tracking-wider text-pink-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      His Butterfly Moment Confession
                    </span>
                    <DoodleButterfly size={18} />
                  </div>
                  {exactMoment && exactMoment.trim() ? (
                    <p className="font-serif italic text-sm sm:text-base text-pink-100 leading-relaxed bg-black/20 p-3 rounded-xl border border-pink-500/20">
                      "{exactMoment.trim()}"
                    </p>
                  ) : (
                    <p className="text-xs text-pink-300/50 italic">
                      Waiting for Mr. Robot to enter the exact moment he fell for Ishu (Screen 13)...
                    </p>
                  )}
                </div>

                {/* Question Cards Answers List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-pink-300/70">
                    Answers to "What Matters To Me" ({answeredCount}/{totalCount}):
                  </h4>

                  {MATTER_CARDS.map((card, idx) => {
                    const ans = answers[card.id];
                    const isAnswered = !!ans;
                    return (
                      <div
                        key={card.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isAnswered
                            ? 'bg-pink-950/20 border-pink-500/25'
                            : 'bg-black/20 border-white/5 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300">
                                #{String(idx + 1).padStart(2, '0')}
                              </span>
                              <p className="text-xs font-medium text-pink-100">{card.question}</p>
                            </div>
                            <p className="text-[11px] text-pink-300/60 line-clamp-1 italic pl-7">
                              {card.supporting.split('\n')[0]}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            {isAnswered ? (
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                  ans.includes('Yes')
                                    ? 'bg-pink-500/20 border-pink-400/40 text-pink-200'
                                    : 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                                }`}
                              >
                                {ans}
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-pink-300/40 italic">
                                Waiting for answer...
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View: Raw Text File (.txt) */}
            {activeTab === 'raw' && (
              <div className="relative">
                <pre className="p-4 rounded-xl bg-black/60 border border-pink-500/20 font-mono text-[11px] leading-relaxed text-pink-200/90 overflow-x-auto whitespace-pre-wrap select-all">
                  {logText}
                </pre>
              </div>
            )}

            {/* View: JSON format */}
            {activeTab === 'json' && (
              <div className="relative">
                <pre className="p-4 rounded-xl bg-black/60 border border-pink-500/20 font-mono text-[11px] leading-relaxed text-pink-200/80 overflow-x-auto whitespace-pre-wrap select-all">
                  {JSON.stringify(
                    {
                      timestamp: new Date().toISOString(),
                      letterTo: 'Mr. Robot (Nachiket)',
                      from: 'Ishu',
                      exactButterflyMoment: exactMoment || null,
                      answers: answers,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-3.5 border-t border-pink-500/20 bg-pink-950/40 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-pink-300/50 font-serif italic">
              Saved automatically to Ishu's secret browser storage
            </div>

            <div className="flex items-center gap-2">
              <a
                href={generateWhatsAppUrl(answers, exactMoment)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-xs font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                title="Send confession directly to Ishu on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp to Ishu</span>
              </a>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-medium text-pink-200 hover:text-white transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border border-pink-400/40 text-xs font-semibold text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download .TXT
              </button>

              <button
                onClick={handleDownloadJson}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-pink-300 hover:text-pink-100 transition-all"
                title="Download JSON record"
              >
                JSON
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
