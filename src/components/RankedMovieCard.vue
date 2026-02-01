<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Plus, Check, Star } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useWatchlistStore } from '@/stores/watchlist';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
  rank: number;
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
    class="flex-shrink-0 flex items-end gap-0 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both"
    :style="{ animationDelay: `${index * 80}ms` }"
  >
    <div class="relative -mr-6 z-10">
      <span 
        class="text-[120px] md:text-[140px] font-display font-bold leading-none select-none"
        :style="{
          WebkitTextStroke: '2px hsl(var(--primary))',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px hsl(var(--primary) / 0.3)'
        }"
      >
        {{ rank }}
      </span>
    </div>

    <RouterLink :to="`/movie/${movie.id}`" class="group block w-36 md:w-44 mb-2">
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
              class="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-200"
              style="box-shadow: var(--shadow-glow-primary)"
            >
              <Play class="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
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
            'absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm',
            inWatchlist
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground'
          )"
        >
          <Check v-if="inWatchlist" class="w-3.5 h-3.5" />
          <Plus v-else class="w-3.5 h-3.5" />
        </button>
      </div>
    </RouterLink>
  </div>
</template>