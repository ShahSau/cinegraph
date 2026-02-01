<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Plus, Check, Star, Clock, Calendar } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import GenreTag from '@/components/GenreTag.vue'; // Ensure default import
import { useWatchlistStore } from '@/stores/watchlist';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
}

const props = defineProps<Props>();

const imageLoaded = ref(false);
const watchlistStore = useWatchlistStore();

// Reactive check for watchlist status
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const handleWatchlistToggle = () => {
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
  <section class="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
    <div class="absolute inset-0">
      <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer" />
      <img
        :src="movie.backdrop"
        :alt="movie.title"
        @load="handleImageLoad"
        class="w-full h-full object-cover transition-opacity duration-700"
        :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
      />
      <div class="hero-gradient absolute inset-0" />
      <div class="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
    </div>

    <div class="relative h-full flex items-end pb-20 md:pb-32">
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div 
          class="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both"
        >
          <p 
            v-if="movie.tagline"
            class="text-primary font-medium mb-2 text-sm md:text-base tracking-wide uppercase animate-in fade-in duration-700 delay-500 fill-mode-both"
          >
            {{ movie.tagline }}
          </p>

          <h1 class="text-5xl md:text-7xl lg:text-8xl font-display text-foreground mb-4 leading-none tracking-wide">
            {{ movie.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <Star class="w-4 h-4 fill-primary text-primary" />
              <span class="text-foreground font-semibold">{{ movie.rating.imdb.toFixed(1) }}</span>
              <span class="text-xs">IMDb</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Calendar class="w-4 h-4" />
              <span>{{ movie.year }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Clock class="w-4 h-4" />
              <span>{{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}m</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <GenreTag 
              v-for="genre in movie.genres" 
              :key="genre" 
              :genre="genre" 
              size="sm" 
            />
          </div>

          <p class="text-muted-foreground mb-8 line-clamp-3 md:line-clamp-4 text-sm md:text-base leading-relaxed">
            {{ movie.overview }}
          </p>

          <div class="flex flex-wrap gap-4">
            <RouterLink :to="`/movie/${movie.id}`">
              <Button
                size="lg"
                class="btn-primary-gradient gap-2 text-base px-8 hover:scale-105 transition-transform"
              >
                <Play class="w-5 h-5 fill-current" />
                Watch Now
              </Button>
            </RouterLink>
            
            <Button
              size="lg"
              variant="outline"
              @click="handleWatchlistToggle"
              class="gap-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
            >
              <template v-if="inWatchlist">
                <Check class="w-5 h-5" />
                In Watchlist
              </template>
              <template v-else>
                <Plus class="w-5 h-5" />
                Add to List
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>