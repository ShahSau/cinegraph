<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Plus, Check, Star, Clock, Calendar } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useWatchlistStore } from '@/stores/watchlist';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
});

const imageLoaded = ref(false);
const watchlistStore = useWatchlistStore();
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const handleWatchlistClick = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  if (inWatchlist.value) {
    watchlistStore.removeFromWatchlist(props.movie.id);
  } else {
    watchlistStore.addToWatchlist(props.movie);
  }
};
</script>

<template>
  <div 
    class="flex-shrink-0 w-72 md:w-80 animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <RouterLink :to="`/movie/${movie.id}`" class="group block">
      <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-card border border-white/5">
        
        <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer rounded-2xl" />
        
        <img
          :src="movie.backdrop"
          :alt="movie.title"
          @load="imageLoaded = true"
          :class="cn(
            'w-full h-full object-cover transition-all duration-700 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div class="absolute bottom-0 left-0 right-0 p-5">
          <div class="flex items-center gap-2 mb-2">
            <span
              v-for="genre in movie.genres.slice(0, 2)"
              :key="genre"
              class="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary"
            >
              {{ genre }}
            </span>
          </div>
          
          <h3 class="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors">
            {{ movie.title }}
          </h3>
          
          <p class="text-xs text-muted-foreground line-clamp-2 mb-3">
            {{ movie.overview }}
          </p>
          
          <div class="flex items-center gap-4 text-xs text-foreground/70">
            <span class="flex items-center gap-1">
              <Star class="w-3.5 h-3.5 fill-primary text-primary" />
              <span class="font-semibold text-foreground">{{ movie.rating.imdb.toFixed(1) }}</span>
            </span>
            <span class="flex items-center gap-1">
              <Calendar class="w-3.5 h-3.5 text-muted-foreground" />
              {{ movie.year }}
            </span>
            <span class="flex items-center gap-1">
              <Clock class="w-3.5 h-3.5 text-muted-foreground" />
              {{ movie.runtime }}m
            </span>
          </div>
        </div>

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <div 
            class="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200"
            style="box-shadow: var(--shadow-glow-primary)"
          >
            <Play class="w-7 h-7 text-primary-foreground fill-current ml-1" />
          </div>
        </div>

        <button
          @click="handleWatchlistClick"
          :class="cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm',
            inWatchlist
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground'
          )"
        >
          <Check v-if="inWatchlist" class="w-4 h-4" />
          <Plus v-else class="w-4 h-4" />
        </button>
      </div>
    </RouterLink>
  </div>
</template>