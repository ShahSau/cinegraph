import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Movie } from '@/types/movie';

export const useWatchlistStore = defineStore('watchlist', () => {
  // 1. State
  const watchlist = ref<Movie[]>([]);

  // 2. Initialize: Load from localStorage immediately
  const stored = localStorage.getItem('cineview-watchlist');
  console.log('Loaded watchlist from localStorage:', stored);
  if (stored) {
    try {
      watchlist.value = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse watchlist', e);
    }
  }

  // 3. Actions
  const addToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.id)) {
      watchlist.value.push(movie);
    }
  };

  const removeFromWatchlist = (id: string | number) => {
    watchlist.value = watchlist.value.filter((m) => m.id !== id);
  };

  // 4. Getters / Helpers
  const isInWatchlist = (id: string | number): boolean => {
    return watchlist.value.some((m) => m.id === id);
  };

  // 5. Persistence: Watch for changes and save to localStorage
  watch(
    watchlist,
    (newVal) => {
      localStorage.setItem('cineview-watchlist', JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
});