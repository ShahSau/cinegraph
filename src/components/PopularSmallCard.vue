<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Star } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
}

defineProps<Props>();

const imageLoaded = ref(false);
</script>

<template>
  <RouterLink :to="`/movie/${movie.id}`" class="group block h-full">
    <div class="relative h-full rounded-xl overflow-hidden bg-card border border-white/5">
      <div v-if="!imageLoaded" class="absolute inset-0 skeleton-shimmer" />
      
      <img
        :src="movie.poster"
        :alt="movie.title"
        @load="imageLoaded = true"
        :class="cn(
          'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div class="absolute top-2 left-2">
        <div class="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm">
          <Star class="w-3 h-3 fill-primary text-primary" />
          {{ movie.rating.imdb }}
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
        <h4 class="text-sm font-medium text-foreground line-clamp-1">{{ movie.title }}</h4>
        <p class="text-xs text-muted-foreground">{{ movie.year }}</p>
      </div>
    </div>
  </RouterLink>
</template>