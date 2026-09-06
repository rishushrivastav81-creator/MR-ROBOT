import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Copy, Check, X, FileText, Download } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'app.py' | 'requirements.txt' | 'README.md'>('app.py');
  const [copied, setCopied] = useState<boolean>(false);

  const getActiveContent = () => {
    switch (activeTab) {
      case 'app.py':
        return appPyContent;
      case 'requirements.txt':
        return requirementsContent;
      case 'README.md':
        return readmeContent;
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
    element.download = activeTab;
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
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-300 backdrop-blur-md bg-black/40 hover:bg-rose-950/60 border border-white/10 hover:border-rose-400/40 text-rose-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        title="View & Export Streamlit Python files (app.py)"
      >
        <Code2 className="w-3.5 h-3.5 text-rose-400" />
        <span className="hidden sm:inline">Streamlit Source (app.py)</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl h-[85vh] flex flex-col rounded-2xl bg-[#1a0612] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-semibold text-rose-100">
                    Python & Streamlit Source Files
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-rose-200 text-xs transition-colors"
                    title={`Download ${activeTab}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-100 text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-rose-300/70 hover:text-white transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 pt-2 border-b border-white/10 bg-black/30">
                {(['app.py', 'requirements.txt', 'README.md'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-[#1a0612] text-rose-200 border-t border-x border-white/15'
                        : 'text-rose-300/60 hover:text-rose-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code Viewer */}
              <div className="flex-1 overflow-auto p-4 bg-black/40 font-mono text-xs text-rose-100/90 leading-relaxed selection:bg-rose-600/40 selection:text-white">
                <pre className="whitespace-pre">
                  <code>{getActiveContent()}</code>
                </pre>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 bg-black/50 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/60">
                <span>Deployable on Streamlit Community Cloud or locally with `streamlit run app.py`</span>
                <span>Ready for GitHub</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
