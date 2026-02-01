<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Star, Plus, Check } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useWatchlistStore } from '@/stores/watchlist';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
  rank: number;
}

const props = defineProps<Props>();

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
  <RouterLink :to="`/movie/${movie.id}`" class="group block">
    <div class="relative">
      <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-card border border-white/5">
        <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer rounded-xl" />
        
        <img
          :src="movie.poster"
          :alt="movie.title"
          @load="imageLoaded = true"
          :class="cn(
            'w-full h-full object-cover transition-all duration-500 group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="absolute inset-0 flex items-center justify-center">
            <div 
              class="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200"
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
      </div>

      <div class="absolute -bottom-6 left-0 pointer-events-none">
        <span 
          class="text-[100px] md:text-[120px] font-display font-bold leading-none select-none"
          :style="{
            WebkitTextStroke: '3px hsl(var(--primary))',
            WebkitTextFillColor: 'hsl(var(--background))',
            textShadow: '0 0 30px hsl(var(--primary) / 0.4)',
          }"
        >
          {{ rank }}
        </span>
      </div>
    </div>

    <div class="mt-8 ml-12">
      <h3 class="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
        {{ movie.title }}
      </h3>
      <p class="text-xs text-muted-foreground mt-0.5">
        {{ movie.genres[0] }}
      </p>
    </div>
  </RouterLink>
</template>