<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Plus, Check, Star } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useWatchlistStore } from '@/stores/watchlist'; 
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  size: 'md',
});

const imageLoaded = ref(false);

// Access Pinia store
const watchlistStore = useWatchlistStore();

// Check if movie is in watchlist (Reactive)
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const sizeClasses = {
  sm: 'w-32 md:w-40',
  md: 'w-40 md:w-48',
  lg: 'w-48 md:w-56',
};

const handleWatchlistClick = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  if (inWatchlist.value) {
    watchlistStore.removeFromWatchlist(props.movie.id);
  } else {
    watchlistStore.addToWatchlist(props.movie);
  }
};

const handleImageLoad = () => {
  imageLoaded.value = true;
};
</script>

<template>
  <div 
    class="flex-shrink-0 animate-in fade-in slide-in-from-bottom-5 duration-400 fill-mode-both"
    :class="sizeClasses[size]"
    :style="{ animationDelay: `${index * 50}ms` }"
  >
    <RouterLink :to="`/movie/${movie.id}`" class="group/card block">
      <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-card">
        
        <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer rounded-xl" />
        
        <img
          :src="movie.poster"
          :alt="movie.title"
          @load="handleImageLoad"
          :class="cn(
            'w-full h-full object-cover transition-all duration-500 group-hover/card:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300">
          
          <div class="absolute inset-0 flex items-center justify-center">
            <div 
              class="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-0 group-hover/card:scale-100 transition-transform duration-300 ease-out delay-100"
              style="box-shadow: var(--shadow-glow-primary)"
            >
              <Play class="w-6 h-6 text-primary-foreground fill-current ml-1" />
            </div>
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-3">
            <div class="flex items-center gap-2 text-xs text-foreground/80">
              <span class="flex items-center gap-1">
                <Star class="w-3 h-3 fill-primary text-primary" />
                {{ movie.rating.imdb.toFixed(1) }}
              </span>
              <span>•</span>
              <span>{{ movie.year }}</span>
            </div>
          </div>
        </div>

        <button
          @click="handleWatchlistClick"
          :class="cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm',
            inWatchlist
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground'
          )"
        >
          <Check v-if="inWatchlist" class="w-4 h-4" />
          <Plus v-else class="w-4 h-4" />
        </button>

        <div class="absolute top-2 left-2">
          <div :class="cn(
            'text-xs font-bold px-2 py-0.5 rounded-md backdrop-blur-sm',
            movie.rating.imdb >= 8 ? 'bg-rating-high/20 text-rating-high' :
            movie.rating.imdb >= 6 ? 'bg-primary/20 text-primary' :
            'bg-destructive/20 text-destructive'
          )">
            {{ movie.rating.imdb.toFixed(1) }}
          </div>
        </div>
      </div>

      <h3 class="mt-3 text-sm font-medium text-foreground line-clamp-2 group-hover/card:text-primary transition-colors">
        {{ movie.title }}
      </h3>
      <p class="text-xs text-muted-foreground mt-0.5">
        {{ movie.year }} • {{ movie.genres[0] }}
      </p>
    </RouterLink>
  </div>
</template>