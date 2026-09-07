import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Upload, FileAudio } from 'lucide-react';
import { SongUploadModal } from './SongUploadModal';
import { loadAudioBlob } from '../utils/audioStorage';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [realAudioUrl, setRealAudioUrl] = useState<string | null>(null);
  const [songTitle, setSongTitle] = useState<string>('Rait Zara Si');
  const [isRealAudio, setIsRealAudio] = useState<boolean>(false);

  // Audio elements & synthesis refs
  const audioTagRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Initial check for real audio sources on mount
  useEffect(() => {
    let isCancelled = false;

    async function checkForAudio() {
      // 1. Check IndexedDB for user-uploaded MP3
      try {
        const stored = await loadAudioBlob();
        if (stored && !isCancelled) {
          const url = URL.createObjectURL(stored.blob);
          setRealAudioUrl(url);
          setSongTitle(stored.fileName.replace(/\.[^/.]+$/, ''));
          setIsRealAudio(true);
          return;
        }
      } catch {
        // continue
      }

      // 2. Check localStorage for direct URL
      const customUrl = localStorage.getItem('mr_robot_custom_audio_url');
      if (customUrl && !isCancelled) {
        setRealAudioUrl(customUrl);
        setSongTitle('Rait Zara Si (Custom Audio)');
        setIsRealAudio(true);
        return;
      }

      // 3. Check if a default bundled file exists in /public (song.mp3 or rait_zara_si.mp3)
      const possiblePaths = ['./song.mp3', './rait_zara_si.mp3', '/song.mp3'];
      for (const p of possiblePaths) {
        try {
          const res = await fetch(p, { method: 'HEAD' });
          if (res.ok && !isCancelled) {
            setRealAudioUrl(p);
            setSongTitle('Rait Zara Si (Original)');
            setIsRealAudio(true);
            return;
          }
        } catch {
          // ignore
        }
      }
    }

    checkForAudio();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Rait Zara Si Synthesizer chord fallback if no real MP3 is available
  const raitZaraSiChords = [
    {
      root: [146.83, 220.0, 277.18, 369.99],
      melody: [
        { note: 587.33, time: 0.2, dur: 0.9 },
        { note: 554.37, time: 1.1, dur: 0.7 },
        { note: 493.88, time: 1.8, dur: 0.9 },
        { note: 440.0,  time: 2.7, dur: 1.2 },
      ],
    },
    {
      root: [196.0, 246.94, 293.66, 369.99],
      melody: [
        { note: 369.99, time: 0.3, dur: 0.8 },
        { note: 392.0,  time: 1.1, dur: 0.8 },
        { note: 440.0,  time: 1.9, dur: 0.9 },
        { note: 493.88, time: 2.8, dur: 1.3 },
      ],
    },
    {
      root: [123.47, 185.0, 220.0, 293.66],
      melody: [
        { note: 587.33, time: 0.2, dur: 0.8 },
        { note: 659.25, time: 1.0, dur: 0.8 },
        { note: 739.99, time: 1.8, dur: 1.1 },
        { note: 659.25, time: 2.9, dur: 1.1 },
      ],
    },
    {
      root: [110.0, 164.81, 220.0, 277.18],
      melody: [
        { note: 587.33, time: 0.2, dur: 0.7 },
        { note: 554.37, time: 0.9, dur: 0.9 },
        { note: 493.88, time: 1.8, dur: 0.9 },
        { note: 440.0,  time: 2.7, dur: 1.4 },
      ],
    },
  ];

  const playPianoNote = (ctx: AudioContext, freq: number, delay: number, duration: number, volume: number = 0.04) => {
    if (!ctx || ctx.state === 'closed') return;
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime + delay);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime + delay);

    const startTime = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + duration + 0.1);
    oscHarmonic.stop(startTime + duration + 0.1);
  };

  const playFluteLead = (ctx: AudioContext, freq: number, delay: number, duration: number) => {
    if (!ctx || ctx.state === 'closed') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.value = 4.8;
    vibratoGain.gain.value = 2.5;
    vibrato.connect(osc.frequency);
    vibrato.start(ctx.currentTime + delay);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime + delay);

    const startTime = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    vibrato.stop(startTime + duration + 0.1);
  };

  const startMusicLoop = () => {
    // If we have a real audio URL, play using HTML5 Audio
    if (realAudioUrl && audioTagRef.current) {
      audioTagRef.current.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch((e) => {
        console.warn('Real audio playback blocked by browser policy:', e);
      });
      return;
    }

    // Fallback: Web Audio synthesis loop
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      audioCtxRef.current = ctx;
      isPlayingRef.current = true;
      setIsPlaying(true);

      let step = 0;
      const stepDuration = 4200;

      const loop = () => {
        if (!isPlayingRef.current || !audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentBar = raitZaraSiChords[step % raitZaraSiChords.length];

        currentBar.root.forEach((freq, idx) => {
          playPianoNote(ctx, freq, idx * 0.16, 3.8, 0.032);
        });

        currentBar.melody.forEach((m) => {
          playFluteLead(ctx, m.note, m.time, m.dur);
        });

        step++;
        timerRef.current = window.setTimeout(loop, stepDuration);
      };

      loop();
    } catch {
      // Audio context error
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    if (audioTagRef.current) {
      audioTagRef.current.pause();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusicLoop();
    }
  };

  // Callback when user uploads or updates audio file in modal
  const handleAudioUpdated = (newUrl: string | null, newTitle: string) => {
    stopMusic();
    if (newUrl) {
      setRealAudioUrl(newUrl);
      setIsRealAudio(true);
      setSongTitle(newTitle);
      // Auto-start playing the new song
      setTimeout(() => {
        if (audioTagRef.current) {
          audioTagRef.current.src = newUrl;
          audioTagRef.current.play().then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          }).catch(() => {});
        }
      }, 200);
    } else {
      setRealAudioUrl(null);
      setIsRealAudio(false);
      setSongTitle('Rait Zara Si');
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Hidden real HTML5 audio element for actual audio files */}
      {realAudioUrl && (
        <audio
          ref={audioTagRef}
          src={realAudioUrl}
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Main Play / Pause Button */}
      <button
        id="ambient-music-toggle"
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-md border cursor-pointer ${
          isPlaying
            ? 'bg-rose-950/70 border-rose-500/50 text-rose-100 shadow-[0_0_20px_rgba(225,29,72,0.35)]'
            : 'bg-white/[0.04] border-white/10 text-rose-200/70 hover:text-white hover:border-white/20'
        }`}
        title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
        aria-label="Toggle song playback"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-pink-400 animate-pulse rounded-full" />
              <span className="w-0.5 h-2 bg-pink-300 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-3.5 bg-pink-500 animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="font-serif italic text-xs tracking-wider text-pink-100 truncate max-w-[110px] sm:max-w-[150px]">
              {songTitle} 🎵
            </span>
            <Volume2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-pink-300/60 shrink-0" />
            <span className="font-serif italic text-xs tracking-wider truncate max-w-[110px] sm:max-w-[150px]">
              Play "{songTitle}"
            </span>
            <VolumeX className="w-3.5 h-3.5 opacity-50 shrink-0" />
          </>
        )}
      </button>

      {/* Upload / Change Song Button */}
      <button
        id="upload-song-btn"
        onClick={() => setIsUploadModalOpen(true)}
        className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
          isRealAudio
            ? 'bg-pink-950/40 border-pink-500/30 text-pink-300 hover:text-white hover:bg-pink-900/40'
            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-pink-200/60 hover:text-pink-100'
        }`}
        title="Upload Real MP3 Song File or change music"
        aria-label="Upload custom song"
      >
        <Upload className="w-3 h-3 text-pink-400" />
        <span className="hidden sm:inline">
          {isRealAudio ? 'Change Song' : 'Upload Real Song'}
        </span>
      </button>

      {/* Lyrics button */}
      <button
        onClick={() => setShowLyrics(!showLyrics)}
        className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-pink-200/60 hover:text-pink-100 transition-colors text-[11px] cursor-pointer"
        title="View lyrics of Rait Zara Si"
        aria-label="View song lyrics"
      >
        <Sparkles className="w-3 h-3 text-pink-300" />
      </button>

      {/* Lyrics Popover */}
      {showLyrics && (
        <div className="absolute top-16 right-4 sm:right-8 z-50 p-4 max-w-xs rounded-2xl bg-[#20040d]/95 backdrop-blur-xl border border-pink-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(244,63,94,0.2)] text-left">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink-500/20">
            <span className="text-[10px] uppercase font-mono tracking-widest text-pink-300/80">
              Rait Zara Si • Atrangi Re
            </span>
            <button
              onClick={() => setShowLyrics(false)}
              className="text-pink-300/50 hover:text-pink-100 text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="font-serif italic text-sm text-pink-100 leading-relaxed">
            "Halka halka sa khumaar hai...<br />
            Rait zara si hai haath mein fisal rahi...<br />
            Zameen pe ishq ke parindon ki udaan hai...<br />
            Dil pe kiska ikhtiyaar hai..."
          </p>
          <div className="mt-2 text-right">
            <span className="text-[10px] text-pink-300/50 font-serif italic">
              — A.R. Rahman, Arijit Singh & Shashaa Tirupati
            </span>
          </div>
        </div>
      )}

      {/* Upload Real Song Modal */}
      <SongUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentSongTitle={songTitle}
        isRealAudio={isRealAudio}
        onAudioUpdated={handleAudioUpdated}
      />
    </div>
  );
};
