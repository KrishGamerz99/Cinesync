import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  // Hide on Live Watch Party Room to allow full immersion, as in the Stitch export
  if (location.pathname.startsWith('/room')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_-8px_32px_rgba(10,14,24,0.7)]">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-16 h-12 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-primary shadow-[0_0_16px_rgba(208,188,255,0.25)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </NavLink>

        <NavLink
          to="/parties"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center gap-space-xs w-16 h-12 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-primary shadow-[0_0_16px_rgba(208,188,255,0.25)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">groups</span>
            <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          </div>
          <span className="font-label-sm text-label-sm">Parties</span>
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-16 h-12 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-primary shadow-[0_0_16px_rgba(208,188,255,0.25)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">movie</span>
          <span className="font-label-sm text-label-sm">Movies</span>
        </NavLink>

        <NavLink
          to="/studio"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-16 h-12 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-primary shadow-[0_0_16px_rgba(208,188,255,0.25)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">palette</span>
          <span className="font-label-sm text-label-sm">Studio</span>
        </NavLink>
      </div>
    </nav>
  );
};

