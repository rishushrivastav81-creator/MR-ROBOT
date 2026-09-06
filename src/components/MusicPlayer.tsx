import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Rait Zara Si (Atrangi Re) key: D Major / B Minor
  // Theme chords: Dmaj7 -> Gmaj7 -> Bm9 -> Aadd9
  // Frequencies:
  // D3=146.83, F#3=185.00, A3=220.00, C#4=277.18, E4=329.63, F#4=369.99, G4=392.00, A4=440.00, B4=493.88, C#5=554.37, D5=587.33
  const raitZaraSiChords = [
    {
      root: [146.83, 220.0, 277.18, 369.99], // Dmaj7: D3, A3, C#4, F#4
      melody: [
        { note: 587.33, time: 0.2, dur: 0.9 }, // D5 ("Rait...")
        { note: 554.37, time: 1.1, dur: 0.7 }, // C#5
        { note: 493.88, time: 1.8, dur: 0.9 }, // B4 ("...zara si")
        { note: 440.0,  time: 2.7, dur: 1.2 }, // A4 ("...hai")
      ],
    },
    {
      root: [196.0, 246.94, 293.66, 369.99], // Gmaj7: G3, B3, D4, F#4
      melody: [
        { note: 369.99, time: 0.3, dur: 0.8 }, // F#4
        { note: 392.0,  time: 1.1, dur: 0.8 }, // G4
        { note: 440.0,  time: 1.9, dur: 0.9 }, // A4
        { note: 493.88, time: 2.8, dur: 1.3 }, // B4
      ],
    },
    {
      root: [123.47, 185.0, 220.0, 293.66], // Bm7: B2, F#3, A3, D4
      melody: [
        { note: 587.33, time: 0.2, dur: 0.8 }, // D5
        { note: 659.25, time: 1.0, dur: 0.8 }, // E5
        { note: 739.99, time: 1.8, dur: 1.1 }, // F#5
        { note: 659.25, time: 2.9, dur: 1.1 }, // E5
      ],
    },
    {
      root: [110.0, 164.81, 220.0, 277.18], // A major: A2, E3, A3, C#4
      melody: [
        { note: 587.33, time: 0.2, dur: 0.7 }, // D5
        { note: 554.37, time: 0.9, dur: 0.9 }, // C#5
        { note: 493.88, time: 1.8, dur: 0.9 }, // B4
        { note: 440.0,  time: 2.7, dur: 1.4 }, // A4 (resolves)
      ],
    },
  ];

  const playPianoNote = (ctx: AudioContext, freq: number, delay: number, duration: number, volume: number = 0.04) => {
    if (!ctx || ctx.state === 'closed') return;
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm Rhodes / soft piano timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Warm overtone
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

    // Gentle breathy woodwind / flute lead
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Subtle vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.value = 4.8; // 4.8 Hz gentle vibrato
    vibratoGain.gain.value = 2.5; // slight pitch depth
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
      const stepDuration = 4200; // 4.2s per bar

      const loop = () => {
        if (!isPlayingRef.current || !audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentBar = raitZaraSiChords[step % raitZaraSiChords.length];

        // Play chord arpeggio
        currentBar.root.forEach((freq, idx) => {
          playPianoNote(ctx, freq, idx * 0.16, 3.8, 0.032);
        });

        // Play Rait Zara Si melody line
        currentBar.melody.forEach((m) => {
          playFluteLead(ctx, m.note, m.time, m.dur);
        });

        step++;
        timerRef.current = window.setTimeout(loop, stepDuration);
      };

      loop();
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
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

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const [showLyrics, setShowLyrics] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-2">
      <button
        id="ambient-music-toggle"
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-md border ${
          isPlaying
            ? 'bg-rose-950/70 border-rose-500/50 text-rose-100 shadow-[0_0_20px_rgba(225,29,72,0.35)]'
            : 'bg-white/[0.04] border-white/10 text-rose-200/70 hover:text-white hover:border-white/20'
        }`}
        title={isPlaying ? 'Pause Rait Zara Si melody' : 'Play Rait Zara Si instrumental theme'}
        aria-label="Toggle Rait Zara Si melody"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-pink-400 animate-pulse rounded-full" />
              <span className="w-0.5 h-2 bg-pink-300 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-3.5 bg-pink-500 animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="font-serif italic text-xs tracking-wider text-pink-100">
              Rait Zara Si 🎵
            </span>
            <Volume2 className="w-3.5 h-3.5 text-pink-400" />
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-pink-300/60" />
            <span className="font-serif italic text-xs tracking-wider">
              Play "Rait Zara Si"
            </span>
            <VolumeX className="w-3.5 h-3.5 opacity-50" />
          </>
        )}
      </button>

      {/* Lyrics button */}
      <button
        onClick={() => setShowLyrics(!showLyrics)}
        className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-pink-200/60 hover:text-pink-100 transition-colors text-[11px]"
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
              className="text-pink-300/50 hover:text-pink-100 text-xs px-1"
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
    </div>
  );
};
