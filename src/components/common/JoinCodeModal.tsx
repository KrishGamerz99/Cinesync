import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JoinCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinCodeModal: React.FC<JoinCodeModalProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('CIN-892');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'synced'>('idle');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus('connecting');
    setTimeout(() => {
      setStatus('synced');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        navigate('/room');
      }, 600);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-gutter-mobile animate-fadeIn">
      <div className="w-full max-w-sm rounded-xl bg-surface-container-high p-space-md shadow-2xl flex flex-col gap-space-md border border-white/5">
        <div className="flex items-center justify-between">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Join by Code</h4>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Paste the 6-character room key from your friend’s invite link.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex gap-2 justify-center py-2">
            <input
              type="text"
              maxLength={7}
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="CIN-892"
              className="w-full text-center tracking-widest font-mono font-bold text-headline-sm uppercase px-4 py-3 rounded-lg bg-surface-container-lowest text-primary placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full py-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-80"
          >
            {status === 'connecting' && (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                <span>Connecting...</span>
              </>
            )}
            {status === 'synced' && <span>Synced!</span>}
            {status === 'idle' && <span>Sync into Theater</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

