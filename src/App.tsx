import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PresenceProvider } from './context/PresenceContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { WatchPartyProvider } from './context/WatchPartyContext';
import { Header } from './components/layout/Header';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { HomeDashboard } from './pages/HomeDashboard';
import { LiveWatchPartyRoom } from './pages/LiveWatchPartyRoom';
import { MovieDetailsPlanner } from './pages/MovieDetailsPlanner';
import { PersonalizedThemeStudio } from './pages/PersonalizedThemeStudio';
import { MoviesCatalog } from './pages/MoviesCatalog';
import { WatchPartiesExplorer } from './pages/WatchPartiesExplorer';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PresenceProvider>
          <WatchlistProvider>
            <WatchPartyProvider>
              <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative bg-surface text-on-surface selection:bg-primary selection:text-on-primary">
                <Header />
                <Routes>
                  <Route path="/" element={<HomeDashboard />} />
                  <Route path="/room" element={<LiveWatchPartyRoom />} />
                  <Route path="/room/:roomId" element={<LiveWatchPartyRoom />} />
                  <Route path="/movie/:movieId" element={<MovieDetailsPlanner />} />
                  <Route path="/movie" element={<MovieDetailsPlanner />} />
                  <Route path="/studio" element={<PersonalizedThemeStudio />} />
                  <Route path="/catalog" element={<MoviesCatalog />} />
                  <Route path="/parties" element={<WatchPartiesExplorer />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <BottomNavigation />
              </div>
            </WatchPartyProvider>
          </WatchlistProvider>
        </PresenceProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

