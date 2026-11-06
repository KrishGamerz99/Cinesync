import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CURRENT_USER } from '../../data/mockData';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDetailPage = showBack || location.pathname.startsWith('/movie') || location.pathname.startsWith('/room');

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-7xl mx-auto">
        {isDetailPage ? (
          <>
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                aria-label="Go back"
                onClick={() => navigate(-1)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
              </button>
              <Link to="/" className="flex items-center">
                <img
                  alt="CineTogether Logo"
                  className="h-7 w-auto object-contain flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF1iTS5jn6FRDDpjZ0bVZo_gQzqRxf4x90H_TyJEMv_QqFcBgk9q22dRnYd8vYt7wf-KFxtTohkREp8pchQGTNNhy8Pf2CGbzPw-Nj4ZuiB6bTdOGFOEb8ooPdU7_f26m59R3wlqqZcktw7LWmIN8EhWbKhpmyoSID-SNh4Vbj0K-XuiLCfjUjmNc71iA8UQrOkIQlJQ85ibtSB7jzP3g2ZcZ_8fgL4mkjWJ6Uhj6S"
                />
              </Link>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate flex-1 text-center px-space-xs">
              {title || (location.pathname.startsWith('/room') ? 'Live Watch Room' : 'Movie Details')}
            </h1>
            <div className="flex items-center justify-end min-w-[44px]">
              <Link to="/studio">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover shadow-[0_0_10px_rgba(208,188,255,0.4)]"
                  src={CURRENT_USER.avatarUrl}
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-space-sm min-w-0">
              <Link to="/" className="flex items-center gap-space-sm">
                <img
                  alt="CineTogether Logo"
                  className="h-8 w-auto object-contain flex-shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF1iTS5jn6FRDDpjZ0bVZo_gQzqRxf4x90H_TyJEMv_QqFcBgk9q22dRnYd8vYt7wf-KFxtTohkREp8pchQGTNNhy8Pf2CGbzPw-Nj4ZuiB6bTdOGFOEb8ooPdU7_f26m59R3wlqqZcktw7LWmIN8EhWbKhpmyoSID-SNh4Vbj0K-XuiLCfjUjmNc71iA8UQrOkIQlJQ85ibtSB7jzP3g2ZcZ_8fgL4mkjWJ6Uhj6S"
                />
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate hidden xs:inline">
                  CineTogether
                </span>
              </Link>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate">
                {title || 'Home Feed'}
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-secondary-container/20 shadow-[0_0_12px_rgba(236,72,153,0.35)]">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider hidden sm:inline">
                  LIVE
                </span>
              </div>
              <Link
                to="/catalog"
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                title="Search Catalog"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </Link>
              <Link
                to="/studio"
                className="w-11 h-11 flex items-center justify-center rounded-full focus:outline-none"
                title="Theme Studio & Profile"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover shadow-[0_0_10px_rgba(208,188,255,0.4)]"
                  src={CURRENT_USER.avatarUrl}
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

