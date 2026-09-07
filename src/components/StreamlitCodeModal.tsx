import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Copy, Check, X, FileText, Download, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

interface StreamlitCodeModalProps {
  appPyContent: string;
  requirementsContent: string;
  readmeContent: string;
}

export const StreamlitCodeModal: React.FC<StreamlitCodeModalProps> = ({
  appPyContent,
  requirementsContent,
  readmeContent,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'app.py' | 'requirements.txt' | 'README.md' | 'instructions'>('app.py');
  const [copied, setCopied] = useState<boolean>(false);
  const [liveAppPy, setLiveAppPy] = useState<string>(appPyContent);

  useEffect(() => {
    fetch('/app.py')
      .then((res) => res.text())
      .then((text) => {
        if (text && text.length > 100) {
          setLiveAppPy(text);
        }
      })
      .catch(() => {});
  }, []);

  const getActiveContent = () => {
    switch (activeTab) {
      case 'app.py':
        return liveAppPy || appPyContent;
      case 'requirements.txt':
        return requirementsContent;
      case 'README.md':
        return readmeContent;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getActiveContent();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = activeTab === 'instructions' ? 'deployment_guide.txt' : activeTab;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      {/* Floating Button in bottom-right */}
      <button
        id="open-streamlit-modal-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-300 backdrop-blur-md bg-[#1a050d]/90 hover:bg-rose-950 border border-pink-500/40 hover:border-pink-400 text-pink-200 shadow-[0_4px_25px_rgba(244,63,94,0.3)] hover:scale-105"
        title="View & Export Streamlit Python files (app.py)"
      >
        <Code2 className="w-3.5 h-3.5 text-pink-400" />
        <span className="font-semibold">Streamlit app.py & Log Storage</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl bg-[#14030a] border border-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(244,63,94,0.25)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-pink-500/20 bg-pink-950/30">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-pink-400" />
                  <div>
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>Streamlit `app.py` & Answers Storage System</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        v2.0
                      </span>
                    </span>
                    <p className="text-[11px] text-pink-300/70">
                      Saves what Nachiket answers to `mr_robot_responses.json` so Ishu can read it
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-pink-100 text-xs transition-colors"
                    title={`Download ${activeTab}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {activeTab}</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border border-pink-300/40 text-white text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-pink-300/70 hover:text-white transition-colors ml-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Answers Persistence Banner */}
              <div className="px-5 py-2.5 bg-rose-950/40 border-b border-pink-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-pink-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>How Ishu Reads His Answers:</strong> Open Streamlit app with <code>?view=ishu</code> or click <strong>🔐 Ishu</strong> and type passcode <code>ishu</code>!
                  </span>
                </div>
                <span className="text-[11px] font-mono text-pink-300/80 bg-black/40 px-2 py-0.5 rounded border border-pink-500/30">
                  mr_robot_responses.json
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 pt-2 border-b border-pink-500/20 bg-black/30">
                {(['app.py', 'requirements.txt', 'instructions', 'README.md'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-xs font-mono rounded-t-xl transition-colors ${
                      activeTab === tab
                        ? 'bg-[#14030a] text-pink-200 border-t border-x border-pink-500/30 font-semibold shadow-sm'
                        : 'text-pink-300/60 hover:text-pink-200'
                    }`}
                  >
                    {tab === 'instructions' ? '📖 How to View Answers' : tab}
                  </button>
                ))}
              </div>

              {/* Content View */}
              {activeTab === 'instructions' ? (
                <div className="flex-1 overflow-auto p-6 bg-black/40 text-xs text-pink-100/90 leading-relaxed space-y-5">
                  <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/30 space-y-2">
                    <h4 className="text-sm font-semibold text-pink-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <span>Where Are Nachiket's Answers Saved?</span>
                    </h4>
                    <p className="text-pink-200/80">
                      Whenever Nachiket clicks "Yes ❤️", "I'll try", or types his exact butterfly moment in Streamlit,
                      the app automatically saves his answers in two places on the server:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-pink-300">
                      <li><code>mr_robot_responses.json</code> — Structured JSON database with timestamps, all 11 card answers, and his confession.</li>
                      <li><code>mr_robot_confession_log.txt</code> — Formatted, human-readable confession transcript.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/20 space-y-3">
                    <h4 className="text-sm font-semibold text-pink-200">
                      How Ishu Can Read What He Answered (2 Ways):
                    </h4>
                    <div className="space-y-2 text-pink-200/90">
                      <p>
                        <strong>Method 1: Secret Admin URL Parameter</strong><br />
                        Add <code>?view=ishu</code> to the end of your Streamlit URL (e.g. <code>https://your-app.streamlit.app/?view=ishu</code>).
                        This unlocks <em>Ishu's Reading Room</em> instantly where all his answers and butterfly moment are displayed!
                      </p>
                      <p>
                        <strong>Method 2: In-App Passcode Lock</strong><br />
                        Click the discreet <strong>🔐 Ishu</strong> lock at the top right of the Streamlit app and enter passcode <code>ishu</code>.
                      </p>
                      <p>
                        <strong>Method 3: Direct WhatsApp Message</strong><br />
                        On Screen 14, Nachiket gets a glowing button: <em>Send My Confession to Ishu on WhatsApp</em>. With 1 tap, he sends his full answers directly to your phone!
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/20 space-y-2 font-mono text-[11px]">
                    <h4 className="text-xs font-bold text-pink-300 uppercase tracking-widest font-sans">
                      Running Locally or on Streamlit Cloud
                    </h4>
                    <pre className="p-3 bg-black/60 rounded-xl border border-white/10 text-pink-300 whitespace-pre-wrap">
{`# 1. Install Streamlit
pip install streamlit

# 2. Run the app
streamlit run app.py

# 3. View as Ishu:
http://localhost:8501/?view=ishu`}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-auto p-4 bg-black/40 font-mono text-xs text-pink-100/90 leading-relaxed selection:bg-pink-600/40 selection:text-white">
                  <pre className="whitespace-pre">
                    <code>{getActiveContent()}</code>
                  </pre>
                </div>
              )}

              {/* Modal Footer */}
              <div className="px-5 py-3 bg-black/50 border-t border-pink-500/20 flex flex-wrap items-center justify-between text-[11px] text-pink-300/70 gap-2">
                <span>Deployable on Streamlit Community Cloud (share.streamlit.io) with `app.py` & `requirements.txt`</span>
                <span>🔐 Passcode for Ishu: <code>ishu</code></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

