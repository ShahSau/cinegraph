<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  title: string;
  movies: Movie[];
  cardSize?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<Props>(), {
  cardSize: 'md',
});

const scrollRef = ref<HTMLDivElement | null>(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(true);

const scroll = (direction: 'left' | 'right') => {
  if (!scrollRef.value) return;
  const scrollAmount = scrollRef.value.clientWidth * 0.75;
  scrollRef.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  });
};

const handleScroll = () => {
  if (!scrollRef.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.value;
  showLeftArrow.value = scrollLeft > 20;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth - 20;
};
</script>

<template>
  <section class="relative py-6">
    <h2 
      class="text-2xl md:text-3xl font-display text-foreground mb-4 px-4 md:px-8 animate-in fade-in slide-in-from-left-5 duration-700 fill-mode-both"
    >
      {{ title }}
    </h2>

    <div class="relative group">
      <button
        @click="scroll('left')"
        :class="cn(
          'absolute left-0 top-0 bottom-4 w-12 md:w-16 z-10 flex items-center justify-start pl-2',
          'bg-gradient-to-r from-background via-background/80 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          !showLeftArrow && 'pointer-events-none !opacity-0'
        )"
      >
        <div class="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
          <ChevronLeft class="w-5 h-5" />
        </div>
      </button>

      <button
        @click="scroll('right')"
        :class="cn(
          'absolute right-0 top-0 bottom-4 w-12 md:w-16 z-10 flex items-center justify-end pr-2',
          'bg-gradient-to-l from-background via-background/80 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          !showRightArrow && 'pointer-events-none !opacity-0'
        )"
      >
        <div class="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
          <ChevronRight class="w-5 h-5" />
        </div>
      </button>

      <div
        ref="scrollRef"
        @scroll="handleScroll"
        class="carousel-scroll px-4 md:px-8"
      >
        <MovieCard 
          v-for="(movie, index) in movies" 
          :key="movie.id" 
          :movie="movie" 
          :index="index" 
          :size="cardSize" 
        />
      </div>
    </div>
  </section>
</template>