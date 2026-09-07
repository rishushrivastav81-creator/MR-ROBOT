import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScreenType, AnswersMap } from './types';
import { APP_INFO, SCREENS, MATTER_CARDS } from './data/storyData';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { StoryCard } from './components/StoryCard';
import { QuestionCard } from './components/QuestionCard';
import { ExactMomentCard } from './components/ExactMomentCard';
import { FinalScreen } from './components/FinalScreen';
import { FloatingRomanticDoodles } from './components/CuteDoodles';
import { ConfessionLogModal } from './components/ConfessionLogModal';
import { ShareQrModal } from './components/ShareQrModal';
import { StreamlitCodeModal } from './components/StreamlitCodeModal';
import { APP_PY_CONTENT, REQUIREMENTS_CONTENT, README_CONTENT } from './data/sourceFiles';
import { Heart, FileText, QrCode } from 'lucide-react';
import { saveConfessionLog, loadConfessionLog } from './utils/confessionLogger';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('screen_1');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [savedMoment, setSavedMoment] = useState<string>('');
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Restore saved confession answers and moment from local storage on mount
  useEffect(() => {
    const saved = loadConfessionLog();
    if (saved) {
      if (saved.answers && Object.keys(saved.answers).length > 0) {
        setAnswers(saved.answers);
      }
      if (saved.exactMoment) {
        setSavedMoment(saved.exactMoment);
      }
    }
  }, []);

  // Handlers for progression
  const goToScreen = (nextScreen: ScreenType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreen(nextScreen);
  };

  const handleAnswerCard = (choice: string) => {
    const currentCard = MATTER_CARDS[cardIndex];
    const updatedAnswers = { ...answers, [currentCard.id]: choice };
    setAnswers(updatedAnswers);
    saveConfessionLog(updatedAnswers, savedMoment);

    if (cardIndex + 1 < MATTER_CARDS.length) {
      setCardIndex((prev) => prev + 1);
    } else {
      // Completed all 11 cards -> Go to Screen 10 (A Little Teasing)
      goToScreen('screen_10_playful');
    }
  };

  const handlePrevCard = () => {
    if (cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    } else {
      goToScreen('screen_8');
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreen('screen_1');
    setCardIndex(0);
    setAnswers({});
    setSavedMoment('');
    saveConfessionLog({}, '');
  };

  // Calculate current progress step (1 to 14)
  const getStepNumber = (): number => {
    switch (screen) {
      case 'screen_1': return 1;
      case 'screen_2': return 2;
      case 'screen_3': return 3;
      case 'screen_4': return 4;
      case 'screen_5': return 5;
      case 'screen_6': return 6;
      case 'screen_7': return 7;
      case 'screen_8': return 8;
      case 'screen_9_cards': return 9;
      case 'screen_10_playful': return 10;
      case 'screen_11': return 11;
      case 'screen_12_final_answer': return 12;
      case 'screen_exact_moment': return 13;
      case 'screen_final': return 14;
      default: return 1;
    }
  };

  const currentStep = getStepNumber();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center selection:bg-rose-500/30 selection:text-rose-100 overflow-x-hidden bg-[#120308]">
      {/* Living Ambient Animated Canvas */}
      <BackgroundCanvas />

      {/* Floating Romantic Doodle Animations */}
      <FloatingRomanticDoodles />

      {/* Dark Luxury / Travel Ambient Orbs & Dot Grid Overlay */}
      <div className="fixed top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#4d0a1b] rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />
      <div className="fixed bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#630b1e] rounded-full blur-[150px] opacity-30 pointer-events-none z-0" />
      <div className="fixed top-1/4 left-1/4 w-2 h-2 bg-pink-200 rounded-full animate-pulse opacity-40 pointer-events-none z-0" />
      <div className="fixed top-2/3 right-1/3 w-3 h-3 bg-pink-300 rounded-full opacity-20 pointer-events-none z-0" />
      <div className="fixed top-10 right-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 w-full h-full pointer-events-none bg-dot-grid z-0" />

      {/* Top Header: App Title, Subtitle, Log & File Button, & Rait Zara Si Music Player */}
      <header className="relative z-30 w-full max-w-2xl mx-auto px-6 pt-6 pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30 animate-gentle-pulse" />
          <div className="flex flex-col">
            <span className="font-serif italic text-lg sm:text-xl text-white tracking-wide">
              {APP_INFO.title}
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-pink-300/50 font-mono -mt-0.5">
              Personal Letter
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Share & QR Code Button */}
          <button
            id="open-share-qr-btn"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-600/25 hover:bg-pink-600/40 border border-pink-500/40 text-pink-200 hover:text-white transition-all text-xs font-mono shadow-[0_0_12px_rgba(244,63,94,0.2)]"
            title="Share Letter & QR Code"
            aria-label="Share Letter and QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Share & QR</span>
            <span className="sm:hidden">Share</span>
          </button>

          {/* Confession Log & Answers File Button */}
          <button
            id="open-confession-log-btn"
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-pink-500/20 text-pink-200/80 hover:text-white transition-all text-xs font-mono"
            title="View Mr. Robot's Confession File & Answers Log"
            aria-label="View Confession Log"
          >
            <FileText className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Answers Log</span>
            {Object.keys(answers).length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            )}
          </button>

          <MusicPlayer />
        </div>
      </header>

      {/* Main Narrative Area */}
      <main className="relative z-20 w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {/* SCREEN 1 — INTRO */}
          {screen === 'screen_1' && (
            <StoryCard
              key="s1"
              screen={SCREENS[1]}
              onNext={() => goToScreen('screen_2')}
              canGoBack={false}
            />
          )}

          {/* SCREEN 2 — MY HONEST ANSWER */}
          {screen === 'screen_2' && (
            <StoryCard
              key="s2"
              screen={SCREENS[2]}
              onNext={() => goToScreen('screen_3')}
              onPrev={() => goToScreen('screen_1')}
              canGoBack
            />
          )}

          {/* SCREEN 3 — I REALLY DO LIKE YOU */}
          {screen === 'screen_3' && (
            <StoryCard
              key="s3"
              screen={SCREENS[3]}
              onNext={() => goToScreen('screen_4')}
              onPrev={() => goToScreen('screen_2')}
              canGoBack
            />
          )}

          {/* SCREEN 4 — THE MOMENT */}
          {screen === 'screen_4' && (
            <StoryCard
              key="s4"
              screen={SCREENS[4]}
              onNext={() => goToScreen('screen_5')}
              onPrev={() => goToScreen('screen_3')}
              canGoBack
            />
          )}

          {/* SCREEN 5 — WHY I WAS SO CALM */}
          {screen === 'screen_5' && (
            <StoryCard
              key="s5"
              screen={SCREENS[5]}
              onNext={() => goToScreen('screen_6')}
              onPrev={() => goToScreen('screen_4')}
              canGoBack
            />
          )}

          {/* SCREEN 6 — TRUST */}
          {screen === 'screen_6' && (
            <StoryCard
              key="s6"
              screen={SCREENS[6]}
              onNext={() => goToScreen('screen_7')}
              onPrev={() => goToScreen('screen_5')}
              canGoBack
            />
          )}

          {/* SCREEN 7 — CONSISTENCY */}
          {screen === 'screen_7' && (
            <StoryCard
              key="s7"
              screen={SCREENS[7]}
              onNext={() => goToScreen('screen_8')}
              onPrev={() => goToScreen('screen_6')}
              canGoBack
            />
          )}

          {/* SCREEN 8 — IF THINGS EVER CHANGE */}
          {screen === 'screen_8' && (
            <StoryCard
              key="s8"
              screen={SCREENS[8]}
              onNext={() => {
                setCardIndex(0);
                goToScreen('screen_9_cards');
              }}
              onPrev={() => goToScreen('screen_7')}
              canGoBack
            />
          )}

          {/* SCREEN 9 — THE THINGS I WANT (11 INTERACTIVE CARDS) */}
          {screen === 'screen_9_cards' && (
            <QuestionCard
              key={`card-${MATTER_CARDS[cardIndex].id}`}
              card={MATTER_CARDS[cardIndex]}
              currentIndex={cardIndex}
              totalCards={MATTER_CARDS.length}
              onAnswer={handleAnswerCard}
              onPrev={handlePrevCard}
              selectedAnswer={answers[MATTER_CARDS[cardIndex].id]}
            />
          )}

          {/* SCREEN 10 — A LITTLE TEASING */}
          {screen === 'screen_10_playful' && (
            <StoryCard
              key="s10"
              screen={SCREENS[10]}
              onNext={() => goToScreen('screen_11')}
              onPrev={() => {
                setCardIndex(MATTER_CARDS.length - 1);
                goToScreen('screen_9_cards');
              }}
              canGoBack
            />
          )}

          {/* SCREEN 11 — I'M NOT ASKING FOR FOREVER */}
          {screen === 'screen_11' && (
            <StoryCard
              key="s11"
              screen={SCREENS[11]}
              onNext={() => goToScreen('screen_12_final_answer')}
              onPrev={() => goToScreen('screen_10_playful')}
              canGoBack
            />
          )}

          {/* SCREEN 12 — THE FINAL ANSWER */}
          {screen === 'screen_12_final_answer' && (
            <StoryCard
              key="s12"
              screen={SCREENS[12]}
              onNext={() => goToScreen('screen_exact_moment')}
              onPrev={() => goToScreen('screen_11')}
              canGoBack
            />
          )}

          {/* SCREEN 13 — EXACT MOMENT WHEN YOU FELL FOR ME */}
          {screen === 'screen_exact_moment' && (
            <ExactMomentCard
              key="exact-moment"
              savedMoment={savedMoment}
              initialMoment={savedMoment}
              onSaveMoment={(moment) => {
                setSavedMoment(moment);
                saveConfessionLog(answers, moment);
              }}
              onSubmit={(moment) => {
                setSavedMoment(moment);
                saveConfessionLog(answers, moment);
              }}
              onNext={() => {
                goToScreen('screen_final');
              }}
              onPrev={() => goToScreen('screen_12_final_answer')}
            />
          )}

          {/* SCREEN 14 — FINAL SCREEN WITH ISHU'S SIGNATURE */}
          {screen === 'screen_final' && (
            <FinalScreen
              key="final-screen"
              onRestart={handleRestart}
              answers={answers}
              savedMoment={savedMoment}
              onOpenLogModal={() => setIsLogModalOpen(true)}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Dark Luxury Bottom Progress Dots Indicator */}
      <footer className="relative z-30 w-full max-w-xl mx-auto px-6 py-5 flex flex-col items-center gap-3">
        <div className="flex gap-1.5 sm:gap-2 items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((step) => (
            <div
              key={step}
              className={`transition-all duration-300 rounded-full ${
                step === currentStep
                  ? 'w-4 sm:w-5 h-1.5 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]'
                  : step < currentStep
                  ? 'w-1.5 h-1.5 bg-white/40'
                  : 'w-1.5 h-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>

        <div className="w-full flex items-center justify-between text-[10px] tracking-[0.25em] text-pink-300/40 uppercase font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60 animate-pulse" />
            To Mr. Robot
          </span>
          <span>From Ishu</span>
        </div>
      </footer>

      {/* Confession Log & Answers File Viewer Modal */}
      <ConfessionLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        answers={answers}
        exactMoment={savedMoment}
      />

      {/* Share Link & QR Code Modal with GitHub Pages Guide */}
      <ShareQrModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Streamlit Source Code & Log Persistence Modal */}
      <StreamlitCodeModal
        appPyContent={APP_PY_CONTENT}
        requirementsContent={REQUIREMENTS_CONTENT}
        readmeContent={README_CONTENT}
      />
    </div>
  );
}
