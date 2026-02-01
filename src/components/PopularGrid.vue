<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Sparkles } from 'lucide-vue-next';
import PopularFeaturedCard from './PopularFeaturedCard.vue';
import PopularSmallCard from './PopularSmallCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  movies: Movie[];
}

const props = defineProps<Props>();

// Computed to split the movies array
const displayData = computed(() => {
  const displayMovies = props.movies.slice(0, 5);
  const [featured, ...rest] = displayMovies;
  return { featured, rest };
});
</script>

<template>
  <section class="relative py-12 px-4 md:px-8">
    <div 
      class="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
    >
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Sparkles class="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-display text-foreground">Popular Now</h2>
          <p class="text-sm text-muted-foreground">What everyone's watching</p>
        </div>
      </div>
      <RouterLink 
        to="/discover?sort=popular"
        class="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
      >
        View all →
      </RouterLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
      
      <div 
        v-if="displayData.featured"
        class="col-span-2 row-span-2 animate-in fade-in zoom-in-95 duration-700 fill-mode-both"
      >
        <PopularFeaturedCard :movie="displayData.featured" />
      </div>

      <div
        v-for="(movie, index) in displayData.rest"
        :key="movie.id"
        class="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <PopularSmallCard :movie="movie" />
      </div>
      
    </div>
  </section>
</template>