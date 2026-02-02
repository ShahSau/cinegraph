<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import TrendingCard from './TrendingCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  movies: Movie[];
}

const props = defineProps<Props>();

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
  <section class="relative py-12 px-4 md:px-8">
    <div 
      class="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
    >
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <TrendingUp class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-display text-foreground">Top 10 This Week</h2>
          <p class="text-sm text-muted-foreground">Most watched movies right now</p>
        </div>
      </div>
      <RouterLink 
        to="/discover?sort=trending"
        class="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        View all →
      </RouterLink>
    </div>

    <div class="relative group/section">
      <button
        @click="scroll('left')"
        :class="cn(
          'absolute left-0 top-0 bottom-0 w-12 md:w-16 z-10 flex items-center justify-start pl-2',
          'bg-gradient-to-r from-background via-background/80 to-transparent',
          'opacity-0 group-hover/section:opacity-100 transition-opacity duration-300',
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
          'absolute right-0 top-0 bottom-0 w-12 md:w-16 z-10 flex items-center justify-end pr-2',
          'bg-gradient-to-l from-background via-background/80 to-transparent',
          'opacity-0 group-hover/section:opacity-100 transition-opacity duration-300',
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
        class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div 
          v-for="(movie, index) in movies.slice(0, 10)"
          :key="movie.id"
          class="flex-shrink-0 w-44 md:w-52 animate-in fade-in slide-in-from-bottom-5 duration-400 fill-mode-both"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <TrendingCard :movie="movie" :rank="index + 1" />
        </div>
      </div>
    </div>
  </section>
</template>