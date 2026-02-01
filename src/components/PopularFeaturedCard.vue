<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Plus, Check, Star } from 'lucide-vue-next';
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

const handleWatchlistClick = (e: Event) => {
  e.preventDefault();
  if (inWatchlist.value) {
    watchlistStore.removeFromWatchlist(props.movie.id);
  } else {
    watchlistStore.addToWatchlist(props.movie);
  }
};
</script>

<template>
  <RouterLink :to="`/movie/${movie.id}`" class="group block h-full">
    <div class="relative h-full rounded-2xl overflow-hidden bg-card border border-white/5">
      <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer" />
      
      <img
        :src="movie.backdrop"
        :alt="movie.title"
        @load="imageLoaded = true"
        :class="cn(
          'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
        <div 
          class="w-20 h-20 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center"
          style="box-shadow: 0 0 40px hsl(var(--accent) / 0.4)"
        >
          <Play class="w-8 h-8 text-accent-foreground fill-current ml-1" />
        </div>
      </div>

      <button
        @click="handleWatchlistClick"
        :class="cn(
          'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-sm',
          inWatchlist
            ? 'bg-primary text-primary-foreground'
            : 'bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground'
        )"
      >
        <Check v-if="inWatchlist" class="w-5 h-5" />
        <Plus v-else class="w-5 h-5" />
      </button>

      <div class="absolute bottom-0 left-0 right-0 p-6">
        <div class="flex gap-2 mb-3">
          <span
            v-for="genre in movie.genres.slice(0, 2)"
            :key="genre"
            class="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent"
          >
            {{ genre }}
          </span>
        </div>
        
        <h3 class="text-2xl md:text-3xl font-display text-foreground mb-2 group-hover:text-accent transition-colors">
          {{ movie.title }}
        </h3>
        
        <p class="text-sm text-muted-foreground line-clamp-2 mb-3 max-w-md">
          {{ movie.overview }}
        </p>

        <div class="flex items-center gap-4 text-sm">
          <span class="flex items-center gap-1.5">
            <Star class="w-4 h-4 fill-accent text-accent" />
            <span class="font-semibold text-foreground">{{ movie.rating.imdb }}</span>
          </span>
          <span class="text-muted-foreground">{{ movie.year }}</span>
          <span class="text-muted-foreground">{{ movie.runtime }}m</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>