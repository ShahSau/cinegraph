<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Calendar } from 'lucide-vue-next';
import TimelineCard from './TimelineCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  movies: Movie[];
}

const props = defineProps<Props>();
const displayMovies = props.movies.slice(0, 4);
</script>

<template>
  <section class="relative py-12 px-4 md:px-8">
    <div 
      class="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
    >
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
          <Calendar class="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-display text-foreground">Coming Soon</h2>
          <p class="text-sm text-muted-foreground">Mark your calendars</p>
        </div>
      </div>
      <RouterLink 
        to="/discover?sort=upcoming"
        class="text-sm font-medium text-secondary hover:opacity-80 transition-opacity"
      >
        View all →
      </RouterLink>
    </div>

    <div class="relative">
      <div class="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary/50 to-transparent hidden md:block" />

      <div class="space-y-6">
        <div
          v-for="(movie, index) in displayMovies"
          :key="movie.id"
          class="animate-in fade-in slide-in-from-left-5 duration-500 fill-mode-both"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <TimelineCard :movie="movie" />
        </div>
      </div>
    </div>
  </section>
</template>