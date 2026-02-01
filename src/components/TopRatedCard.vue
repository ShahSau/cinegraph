<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Play, Star } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
  rank: number;
}

defineProps<Props>();
const imageLoaded = ref(false);
</script>

<template>
  <RouterLink 
    :to="`/movie/${movie.id}`" 
    class="group flex gap-4 p-4 rounded-2xl bg-card/50 border border-white/5 hover:border-rating-high/30 hover:bg-card/80 transition-all duration-300"
  >
    <div class="relative w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden">
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

      <div class="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-rating-high flex items-center justify-center text-sm font-bold text-background">
        {{ rank }}
      </div>

      <div class="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Play class="w-8 h-8 text-foreground fill-current" />
      </div>
    </div>

    <div class="flex-1 py-1">
      <h3 class="font-display text-lg text-foreground group-hover:text-rating-high transition-colors line-clamp-1">
        {{ movie.title }}
      </h3>
      
      <p class="text-xs text-muted-foreground mt-1">
        {{ movie.year }} • {{ movie.director }}
      </p>

      <div class="flex items-center gap-1 mt-3">
        <Star class="w-5 h-5 fill-rating-high text-rating-high" />
        <span class="text-xl font-bold text-foreground">{{ movie.rating.imdb }}</span>
        <span class="text-xs text-muted-foreground ml-1">/ 10</span>
      </div>

      <div class="flex flex-wrap gap-1 mt-3">
        <span
          v-for="genre in movie.genres.slice(0, 2)"
          :key="genre"
          class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>