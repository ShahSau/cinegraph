<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Clock, Bell } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useWatchlistStore } from '@/stores/watchlist';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
}

const props = defineProps<Props>();

const imageLoaded = ref(false);
const watchlistStore = useWatchlistStore();
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const handleReminder = (e: Event) => {
  e.preventDefault();
  if (inWatchlist.value) {
    watchlistStore.removeFromWatchlist(props.movie.id);
  } else {
    watchlistStore.addToWatchlist(props.movie);
  }
};

// Date Parsing logic
// Note: In a real app you might want to wrap this in a try/catch or helper if dates are unstable
const releaseDate = new Date(props.movie.releaseDate);
const month = releaseDate.toLocaleDateString('en-US', { month: 'short' });
const day = releaseDate.getDate();
</script>

<template>
  <div class="flex gap-4 md:gap-6 group">
    <div class="flex flex-col items-center">
      <div :class="cn(
        'w-14 h-14 rounded-xl flex flex-col items-center justify-center text-center transition-colors',
        'bg-secondary/10 border border-secondary/30 group-hover:bg-secondary group-hover:border-secondary'
      )">
        <span class="text-[10px] uppercase tracking-wider text-secondary group-hover:text-secondary-foreground transition-colors">
          {{ month }}
        </span>
        <span class="text-lg font-bold text-foreground group-hover:text-secondary-foreground transition-colors">
          {{ day }}
        </span>
      </div>
    </div>

    <RouterLink 
      :to="`/movie/${movie.id}`"
      class="flex-1 flex gap-4 p-4 rounded-2xl bg-card/30 border border-white/5 hover:border-secondary/30 hover:bg-card/60 transition-all duration-300"
    >
      <div class="relative w-20 h-28 md:w-28 md:h-40 flex-shrink-0 rounded-xl overflow-hidden">
        <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer rounded-xl" />
        
        <img
          :src="movie.poster"
          :alt="movie.title"
          @load="imageLoaded = true"
          :class="cn(
            'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )"
        />
      </div>

      <div class="flex-1 py-1">
        <h3 class="font-display text-xl md:text-2xl text-foreground group-hover:text-secondary transition-colors line-clamp-1">
          {{ movie.title }}
        </h3>
        
        <div class="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span class="flex items-center gap-1">
            <Clock class="w-3 h-3" />
            {{ movie.runtime }} min
          </span>
          <span>•</span>
          <span>{{ movie.genres[0] }}</span>
        </div>

        <p class="text-sm text-muted-foreground line-clamp-2 mt-3 hidden md:block">
          {{ movie.overview }}
        </p>

        <p v-if="movie.director" class="text-xs text-muted-foreground mt-2 hidden md:block">
          Directed by <span class="text-foreground">{{ movie.director }}</span>
        </p>

        <button
          @click="handleReminder"
          :class="cn(
            'mt-4 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all',
            inWatchlist
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
          )"
        >
          <Bell :class="cn('w-4 h-4', inWatchlist && 'fill-current')" />
          {{ inWatchlist ? 'Reminder Set' : 'Remind Me' }}
        </button>
      </div>

      <div class="hidden md:flex items-center">
        </div>
    </RouterLink>
  </div>
</template>