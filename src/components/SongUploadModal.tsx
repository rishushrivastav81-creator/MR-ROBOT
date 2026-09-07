import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Music, Volume2, Play, Pause, Trash2, Check, X, Sparkles, Link, Github, FileAudio, AlertCircle } from 'lucide-react';
import { saveAudioBlob, clearAudioBlob } from '../utils/audioStorage';
import { DoodleHeart, DoodleButterfly } from './CuteDoodles';

interface SongUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSongTitle: string;
  isRealAudio: boolean;
  onAudioUpdated: (newAudioUrl: string | null, songTitle: string) => void;
}

export const SongUploadModal: React.FC<SongUploadModalProps> = ({
  isOpen,
  onClose,
  currentSongTitle,
  isRealAudio,
  onAudioUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'github'>('upload');
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>('');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const [directUrl, setDirectUrl] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|m4a|wav|ogg|aac|flac)$/i)) {
      alert('Please select an audio file (MP3, M4A, WAV, or OGG).');
      return;
    }

    try {
      await saveAudioBlob(file, file.name);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setPreviewFileName(file.name);
      setSuccessMessage(`"${file.name}" saved! Real audio is now ready to play.`);
      onAudioUpdated(objectUrl, file.name.replace(/\.[^/.]+$/, ''));
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error saving audio file:', err);
      alert('Failed to save audio file to browser storage.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleTogglePreview = () => {
    if (!previewAudioRef.current) return;
    if (isPreviewPlaying) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
    } else {
      previewAudioRef.current.play().then(() => {
        setIsPreviewPlaying(true);
      }).catch((e) => {
        console.error('Playback error:', e);
      });
    }
  };

  const handleApplyUrl = () => {
    setUrlError(null);
    const trimmed = directUrl.trim();
    if (!trimmed) {
      setUrlError('Please enter a valid audio URL.');
      return;
    }

    // Save URL to localStorage
    localStorage.setItem('mr_robot_custom_audio_url', trimmed);
    setPreviewUrl(trimmed);
    setPreviewFileName('Custom Audio URL Stream');
    setSuccessMessage('Audio URL applied successfully!');
    onAudioUpdated(trimmed, 'Rait Zara Si (Custom Audio)');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleRemoveCustomAudio = async () => {
    await clearAudioBlob();
    localStorage.removeItem('mr_robot_custom_audio_url');
    setPreviewUrl(null);
    setPreviewFileName('');
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    setIsPreviewPlaying(false);
    onAudioUpdated(null, 'Rait Zara Si (Instrumental)');
    setSuccessMessage('Reset to default instrumental theme.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl bg-[#1a040e]/95 border border-pink-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.25)] overflow-hidden text-pink-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-pink-500/20 bg-pink-950/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span>Upload Real Song</span>
                  <DoodleButterfly size={16} />
                </h3>
                <p className="text-xs text-pink-300/60 font-mono">
                  Current: {currentSongTitle} {isRealAudio ? '(Real Audio File 🎵)' : '(Synthesized 🎹)'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-pink-200/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 pt-3 pb-2 bg-black/30 border-b border-pink-500/10 flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-pink-600/60 text-white shadow-sm border border-pink-400/40'
                  : 'text-pink-200/60 hover:text-pink-100 bg-white/[0.03]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload MP3 File</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-pink-600/60 text-white shadow-sm border border-pink-400/40'
                  : 'text-pink-200/60 hover:text-pink-100 bg-white/[0.03]'
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Audio URL Link</span>
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'github'
                  ? 'bg-pink-600/60 text-white shadow-sm border border-pink-400/40'
                  : 'text-pink-200/60 hover:text-pink-100 bg-white/[0.03]'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Make it Permanent</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4 text-xs">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    dragOver
                      ? 'border-pink-400 bg-pink-900/30 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                      : 'border-pink-500/30 hover:border-pink-400/60 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,.mp3,.m4a,.wav,.ogg,.aac"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-inner">
                    <Upload className="w-6 h-6" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Drop your real song file here
                    </p>
                    <p className="text-[11px] text-pink-300/70 mt-0.5">
                      Supports MP3, M4A, WAV, OGG (e.g. <em>Rait Zara Si.mp3</em>)
                    </p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer pointer-events-none"
                  >
                    Select Audio File from Phone / PC
                  </button>
                </div>

                {/* Preview / Currently Active Real Audio Player */}
                {previewUrl && (
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-pink-500/30 flex items-center justify-between gap-3">
                    <audio
                      ref={previewAudioRef}
                      src={previewUrl}
                      onEnded={() => setIsPreviewPlaying(false)}
                    />
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <button
                        onClick={handleTogglePreview}
                        className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md"
                        aria-label={isPreviewPlaying ? 'Pause audio preview' : 'Play audio preview'}
                      >
                        {isPreviewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                      </button>
                      <div className="overflow-hidden">
                        <p className="text-xs font-medium text-white truncate max-w-[200px]">
                          {previewFileName || 'Active Audio Track'}
                        </p>
                        <p className="text-[10px] text-pink-300/60 font-mono">
                          Ready & stored in browser storage
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleRemoveCustomAudio}
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-rose-950/60 text-pink-300/60 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-all cursor-pointer shrink-0"
                      title="Remove uploaded audio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-pink-950/20 border border-pink-500/15 space-y-1 text-pink-200/70 text-[11px] font-serif italic">
                  <p>
                    💡 <strong>How it works:</strong> Once you select your real song file, it is immediately loaded and stored in your device's browser database. Whenever you or anyone opens this site, it plays the authentic, high-definition audio file.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2 text-left">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-pink-300/80">
                    Direct MP3 / Audio Stream URL:
                  </label>
                  <input
                    type="url"
                    value={directUrl}
                    onChange={(e) => setDirectUrl(e.target.value)}
                    placeholder="https://example.com/rait_zara_si.mp3"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-500/30 text-xs font-mono text-pink-100 placeholder-pink-300/30 focus:outline-none focus:border-pink-400"
                  />
                  {urlError && <p className="text-[11px] text-rose-400">{urlError}</p>}
                </div>

                <button
                  onClick={handleApplyUrl}
                  className="w-full py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test & Save Audio URL</span>
                </button>

                <p className="text-[11px] text-pink-300/60 leading-relaxed">
                  You can paste any direct link to an MP3 hosted online (e.g. on Google Drive public link, Catbox.moe, Cloudinary, or a raw GitHub file URL).
                </p>
              </div>
            )}

            {activeTab === 'github' && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-pink-950/30 border border-pink-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-pink-200 font-semibold text-sm">
                    <FileAudio className="w-4 h-4 text-pink-400" />
                    <span>How to ship the real song in your GitHub repo</span>
                  </div>
                  <p className="text-pink-100/80 leading-relaxed text-[11.5px]">
                    To make sure Nachiket hears the real song when he scans the QR code on his phone without needing any uploads:
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 space-y-2 text-[11.5px]">
                  <ol className="list-decimal list-inside space-y-2 text-pink-200/90 leading-relaxed pl-1">
                    <li>
                      Download or find your audio file (e.g. <em>Rait Zara Si</em>).
                    </li>
                    <li>
                      Rename the file to exactly: <code className="text-pink-300 bg-white/5 px-1.5 py-0.5 rounded font-mono font-bold">song.mp3</code>
                    </li>
                    <li>
                      Put it in the <code className="text-pink-300 bg-white/5 px-1.5 py-0.5 rounded font-mono font-bold">public/</code> folder of this project:
                      <div className="mt-1 p-2 rounded-xl bg-black/70 font-mono text-[11px] text-emerald-300 border border-emerald-500/20">
                        public/song.mp3
                      </div>
                    </li>
                    <li>
                      Commit and push to GitHub:
                      <div className="mt-1 p-2 rounded-xl bg-black/70 font-mono text-[10.5px] text-pink-300 border border-pink-500/20 space-y-0.5">
                        <p>git add public/song.mp3</p>
                        <p>git commit -m "Add real Rait Zara Si background song"</p>
                        <p>git push</p>
                      </div>
                    </li>
                    <li>
                      Done! The website will automatically detect <code className="font-mono text-pink-300">public/song.mp3</code> and stream the real audio track for him everywhere! 🎵
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-pink-500/20 bg-pink-950/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-pink-300/60 text-[11px] font-serif italic">
              <span>Rait Zara Si (Atrangi Re)</span>
              <DoodleHeart size={12} />
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-pink-200 hover:text-white text-xs transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
