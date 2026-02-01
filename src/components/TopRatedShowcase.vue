<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Award } from 'lucide-vue-next';
import TopRatedCard from './TopRatedCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  movies: Movie[];
}

const props = defineProps<Props>();
const displayMovies = props.movies.slice(0, 6);
</script>

<template>
  <section class="relative py-12 px-4 md:px-8">
    <div 
      class="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
    >
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-rating-high/10 border border-rating-high/20 flex items-center justify-center">
          <Award class="w-6 h-6 text-rating-high" />
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-display text-foreground">Critically Acclaimed</h2>
          <p class="text-sm text-muted-foreground">Highest rated films of all time</p>
        </div>
      </div>
      <RouterLink 
        to="/discover?sort=rating"
        class="text-sm font-medium text-rating-high hover:opacity-80 transition-opacity"
      >
        View all →
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(movie, index) in displayMovies"
        :key="movie.id"
        class="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <TopRatedCard :movie="movie" :rank="index + 1" />
      </div>
    </div>
  </section>
</template>