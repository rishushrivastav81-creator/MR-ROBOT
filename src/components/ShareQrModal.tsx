import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Copy, Check, Download, ExternalLink, Share2, Github, Globe, Sparkles, X, Heart } from 'lucide-react';
import QRCode from 'qrcode';
import { DoodleButterfly, DoodleHeart } from './CuteDoodles';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareQrModal: React.FC<ShareQrModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'github'>('qr');
  const [copied, setCopied] = useState<boolean>(false);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize URL from browser window on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = window.location.href;
      setCustomUrl(current);
    }
  }, [isOpen]);

  // Generate QR code whenever customUrl or canvasRef changes
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const urlToEncode = customUrl.trim() || (typeof window !== 'undefined' ? window.location.href : 'https://github.com');
    setIsGenerating(true);

    QRCode.toCanvas(
      canvasRef.current,
      urlToEncode,
      {
        width: 240,
        margin: 2,
        color: {
          dark: '#1f040f', // deep dark wine
          light: '#fff1f5', // soft blush white
        },
        errorCorrectionLevel: 'H',
      },
      (error) => {
        setIsGenerating(false);
        if (error) console.error('QR code generation error:', error);
      }
    );
  }, [isOpen, customUrl, activeTab]);

  if (!isOpen) return null;

  const currentUrl = customUrl.trim() || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadQrCard = () => {
    if (!canvasRef.current) return;

    // Create a romantic composite card for download
    const qrCanvas = canvasRef.current;
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 600;
    cardCanvas.height = 760;
    const ctx = cardCanvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 760);
    grad.addColorStop(0, '#230514');
    grad.addColorStop(0.5, '#15030b');
    grad.addColorStop(1, '#0b0105');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 760);

    // Border glow
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(18, 18, 564, 724);

    // Decorative inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, 548, 708);

    // Header text
    ctx.fillStyle = '#fda4af';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('💌 A PRIVATE DIGITAL LETTER', 300, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px serif';
    ctx.fillText('To Mr. Robot 🦋', 300, 115);

    ctx.fillStyle = '#fbcfe8';
    ctx.font = 'italic 18px serif';
    ctx.fillText('"Some things are easier to say when you don\'t have to say them out loud."', 300, 150);

    // Draw QR Code centered with white rounded card backing
    const qrX = (600 - 280) / 2;
    const qrY = 190;
    ctx.fillStyle = '#fff1f5';
    ctx.beginPath();
    ctx.roundRect(qrX - 15, qrY - 15, 310, 310, 24);
    ctx.fill();

    ctx.drawImage(qrCanvas, qrX, qrY, 280, 280);

    // Call to action
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('📱 Scan with phone camera to open', 300, 545);

    ctx.fillStyle = '#fce7f3';
    ctx.font = '14px monospace';
    const displayUrl = currentUrl.length > 42 ? currentUrl.substring(0, 42) + '...' : currentUrl;
    ctx.fillText(displayUrl, 300, 575);

    // Signature
    ctx.fillStyle = '#fda4af';
    ctx.font = 'italic 22px serif';
    ctx.fillText('With love, Ishu ❤️', 300, 650);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Rait Zara Si • Interactive Confession Experience', 300, 685);

    // Convert to image download
    const dataUrl = cardCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'to_mr_robot_qr_letter.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `Hey Mr. Robot... 🦋\n\nThere's something I wanted to share with you:\n${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-[#18040d]/95 border border-pink-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.25)] overflow-hidden text-pink-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-pink-500/20 bg-pink-950/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span>Share Letter & QR Code</span>
                  <DoodleButterfly size={16} />
                </h3>
                <p className="text-xs text-pink-300/60 font-mono">
                  Pure Web App • 100% Streamlit-Free • GitHub Ready
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

          {/* Navigation Tabs */}
          <div className="px-5 pt-3 pb-2 bg-black/30 border-b border-pink-500/10 flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'qr'
                  ? 'bg-pink-600/60 text-white shadow-sm border border-pink-400/40'
                  : 'text-pink-200/60 hover:text-pink-100 bg-white/[0.03]'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code & Link</span>
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'github'
                  ? 'bg-pink-600/60 text-white shadow-sm border border-pink-400/40'
                  : 'text-pink-200/60 hover:text-pink-100 bg-white/[0.03]'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Deploy to GitHub Pages</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'qr' && (
              <div className="flex flex-col items-center text-center space-y-4">
                {/* QR Code Presentation Frame */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/60 via-purple-950/40 to-black/60 border border-pink-500/30 shadow-inner flex flex-col items-center">
                  <div className="p-3 bg-[#fff1f5] rounded-2xl shadow-xl">
                    <canvas ref={canvasRef} className="w-[190px] h-[190px] sm:w-[220px] sm:h-[220px]" />
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-200 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Point phone camera to scan</span>
                  </div>
                  <p className="text-[11px] text-pink-300/60 font-serif italic">
                    "To Mr. Robot — A personal digital letter"
                  </p>
                </div>

                {/* Share URL Box */}
                <div className="w-full space-y-1.5 text-left">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-pink-300/80 flex items-center justify-between">
                    <span>Direct Share Link:</span>
                    <span className="text-[10px] text-pink-400/60 lowercase">(editable if deploying elsewhere)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://your-domain-or-github-pages.io"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-500/30 text-xs font-mono text-pink-100 placeholder-pink-300/30 focus:outline-none focus:border-pink-400"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={handleDownloadQrCard}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border border-pink-400/40 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR Card (PNG)</span>
                  </button>

                  <button
                    onClick={handleShareWhatsapp}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600/90 border border-emerald-500/40 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'github' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-pink-950/30 border border-pink-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-pink-200 font-semibold text-sm">
                    <Globe className="w-4 h-4 text-pink-400" />
                    <span>Why GitHub Pages?</span>
                  </div>
                  <p className="text-pink-100/80 leading-relaxed text-[11.5px]">
                    This application is built with standard <strong>React + Vite + Tailwind CSS</strong>.
                    Unlike Streamlit, it does not need a Python runtime or sleep timeouts! It compiles into standard HTML, CSS, and JS that runs on any free host.
                  </p>
                </div>

                {/* Method 1: Automatic GitHub Actions */}
                <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-pink-300 font-semibold">
                      Option 1: GitHub Pages (Automated Workflow)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                      Recommended
                    </span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-pink-200/80 leading-relaxed pl-1 text-[11.5px]">
                    <li>
                      Create a new repo on GitHub (e.g. <code className="text-pink-300 bg-white/5 px-1 py-0.5 rounded">to-mr-robot</code>).
                    </li>
                    <li>
                      Push your codebase to the <code className="text-pink-300 bg-white/5 px-1 py-0.5 rounded">main</code> branch.
                    </li>
                    <li>
                      In your GitHub repository, go to <strong>Settings</strong> &gt; <strong>Pages</strong>.
                    </li>
                    <li>
                      Under <strong>Build and deployment</strong>, set <strong>Source</strong> to <strong>GitHub Actions</strong>.
                    </li>
                    <li>
                      The included <code className="text-pink-300 bg-white/5 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> will automatically build and publish!
                    </li>
                    <li>
                      Your site will be live at: <code className="text-emerald-300 font-mono">https://&lt;your-username&gt;.github.io/&lt;repo-name&gt;/</code>.
                    </li>
                  </ol>
                </div>

                {/* Git Push Quick Reference */}
                <div className="p-3 rounded-xl bg-black/60 border border-pink-500/20 font-mono text-[11px] text-pink-200/90 space-y-1">
                  <p className="text-pink-400 font-sans font-semibold text-xs mb-1">Push to GitHub in 3 commands:</p>
                  <p className="text-pink-300/90">git init</p>
                  <p className="text-pink-300/90">git add .</p>
                  <p className="text-pink-300/90">git commit -m "Initial commit of To Mr. Robot letter"</p>
                  <p className="text-pink-300/90">git remote add origin https://github.com/YOUR_USERNAME/to-mr-robot.git</p>
                  <p className="text-pink-300/90">git push -u origin main</p>
                </div>

                {/* Method 2: Vercel / Netlify */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-pink-500/20 space-y-1.5">
                  <span className="font-mono text-pink-300 font-semibold">Option 2: Vercel or Netlify (10 Seconds)</span>
                  <p className="text-pink-200/80 leading-relaxed text-[11.5px]">
                    Connect your GitHub repository to <strong>Vercel.com</strong> or <strong>Netlify.com</strong>.
                    It auto-detects Vite and provides a clean, custom HTTPS URL you can paste right into the QR code tab!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-pink-500/20 bg-pink-950/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-pink-300/70 text-[11px] font-serif italic">
              <span>Made with love for Nachiket</span>
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-pink-200 hover:text-white text-xs transition-all"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
