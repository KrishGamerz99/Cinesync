import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinCodeModal } from '../components/common/JoinCodeModal';

export const WatchPartiesExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <main className="flex flex-col relative w-full pt-16 pb-28 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full px-gutter-mobile space-y-space-md max-w-4xl mx-auto">
        {/* Title & Quick Action */}
        <div className="pt-space-sm flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">
              Watch Parties
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Live synchronized theaters with friends and communities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-semibold border border-white/5 active:scale-95 transition-all flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">pin</span>
            <span>Join Code</span>
          </button>
        </div>

        {/* Live Parties Strip */}
        <div className="space-y-space-sm">
          {/* Party 1: Interstellar */}
          <div className="rounded-xl bg-surface-container-high/90 overflow-hidden shadow-xl border border-white/5 flex flex-col sm:flex-row group">
            <div className="relative w-full sm:w-56 h-40 flex-shrink-0 overflow-hidden">
              <img
                alt="Interstellar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> SYNC LOCKED
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[11px] font-bold text-tertiary">
                01:42:15 / 02:49:00
              </div>
            </div>

            <div className="p-space-sm flex-1 flex flex-col justify-between gap-space-xs">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Interstellar (2014) • Miller&apos;s Planet
                  </h4>
                  <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded-full font-bold">
                    HOST: Sarah C.
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Synchronized 4K Atmos screening. Voice chat active with auto-ducking.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[16px] animate-pulse">graphic_eq</span> 4 Talking
                  </span>
                  <span>•</span>
                  <span>Code: CIN-892</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  className="py-1.5 px-4 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px] icon-filled">door_open</span>
                  Enter Room
                </button>
              </div>
            </div>
          </div>

          {/* Party 2: Spider-Man */}
          <div className="rounded-xl bg-surface-container-high/90 overflow-hidden shadow-xl border border-white/5 flex flex-col sm:flex-row group">
            <div className="relative w-full sm:w-56 h-40 flex-shrink-0 overflow-hidden">
              <img
                alt="Spider-Man"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> LIVE SYNC
              </div>
            </div>

            <div className="p-space-sm flex-1 flex flex-col justify-between gap-space-xs">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Spider-Man: Across the Spider-Verse
                  </h4>
                  <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded-full font-bold">
                    HOST: Maya
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Community rewatch party. Anime and multiverse club discussion open.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[16px]">group</span> 6 Friends
                  </span>
                  <span>•</span>
                  <span>Public Room</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  className="py-1.5 px-4 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px] icon-filled">door_open</span>
                  Enter Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <JoinCodeModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </main>
  );
};

