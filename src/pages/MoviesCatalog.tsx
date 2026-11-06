import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_MOVIES } from '../data/mockData';
import { useWatchlist } from '../context/WatchlistContext';

export const MoviesCatalog: React.FC = () => {
  const navigate = useNavigate();
  const { isWatchlisted, toggleWatchlist } = useWatchlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Sci-Fi', 'Mystery', 'Action', 'Drama', 'Romance', 'Animation', 'Adventure'];

  const filteredMovies = ALL_MOVIES.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genres.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'All' || m.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <main className="flex flex-col relative w-full pt-16 pb-28 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full px-gutter-mobile space-y-space-md max-w-4xl mx-auto">
        {/* Title & Search Bar */}
        <div className="pt-space-sm space-y-space-xs">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">
            Cinema Catalog
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Discover 4K Dolby titles ready for synchronized party rooms.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[20px] absolute left-3 text-outline">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search titles, directors, or genres..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Genre Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {genres.map(genre => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all border border-white/5 ${
                selectedGenre === genre
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movies Grid or Empty State */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-xs">
            {filteredMovies.map(movie => {
              const watchlisted = isWatchlisted(movie.id);
              return (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="rounded-xl bg-surface-container overflow-hidden shadow-md cursor-pointer group border border-white/5 flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={movie.backdropUrl || movie.posterUrl}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          toggleWatchlist(movie.id);
                        }}
                        className={`w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors ${
                          watchlisted ? 'text-secondary' : 'text-on-surface'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[18px] ${watchlisted ? 'icon-filled' : ''}`}>
                          {watchlisted ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-surface-container-lowest/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-tertiary">
                      <span className="material-symbols-outlined text-[12px] icon-filled">star</span>
                      {movie.ratingImdb}
                    </div>
                  </div>

                  <div className="p-2.5 flex flex-col gap-1">
                    <h5 className="font-label-lg text-label-lg text-on-surface font-bold truncate">{movie.title}</h5>
                    <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                      <span className="truncate">{movie.genres.join(' • ')}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-label-sm text-label-sm text-outline">{movie.year}</span>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          navigate('/room');
                        }}
                        className="px-2 py-0.5 rounded bg-primary-container/20 hover:bg-primary-container/40 text-primary font-label-sm text-label-sm font-semibold transition-colors"
                      >
                        Host
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3 bg-surface-container-low/50 rounded-2xl border border-white/5 p-6">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">No Movies Found</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                No titles matched &quot;{searchTerm}&quot; in the &quot;{selectedGenre}&quot; category.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
              }}
              className="px-4 py-2 rounded-lg bg-primary-container/20 hover:bg-primary-container/40 text-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

