<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { ChevronLeft, ChevronRight, TrendingUp, Star, Clock, Sparkles } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';

import MovieCard from '@/components/MovieCard.vue';
import FeaturedMovieCard from '@/components/FeaturedMovieCard.vue';
import RankedMovieCard from '@/components/RankedMovieCard.vue'; 

type CarouselVariant = 'default' | 'ranked' | 'featured' | 'compact';

interface Props {
  title: string;
  subtitle?: string;
  movies: Movie[];
  variant?: CarouselVariant;
  icon?: 'trending' | 'star' | 'clock' | 'sparkles';
  showSeeAll?: boolean;
  seeAllLink?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showSeeAll: true,
  seeAllLink: '/discover',
});

// Icon Mapping
const iconMap = {
  trending: TrendingUp,
  star: Star,
  clock: Clock,
  sparkles: Sparkles,
};

const IconComponent = computed(() => props.icon ? iconMap[props.icon] : null);

// Scroll Logic
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
  <section class="relative py-8">
    <div 
      class="flex items-end justify-between mb-5 px-4 md:px-8 animate-in fade-in slide-in-from-left-5 duration-700 fill-mode-both"
    >
      <div class="flex items-center gap-3">
        <div v-if="IconComponent" class="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <component :is="IconComponent" class="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 class="text-2xl md:text-3xl font-display text-foreground">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-sm text-muted-foreground mt-0.5">{{ subtitle }}</p>
        </div>
      </div>
      
      <RouterLink 
        v-if="showSeeAll"
        :to="seeAllLink"
        class="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
      >
        See all
        <ChevronRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </RouterLink>
    </div>

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
        :class="cn(
          'carousel-scroll px-4 md:px-8',
          variant === 'ranked' && 'gap-2'
        )"
      >
        <template v-if="variant === 'ranked'">
          <RankedMovieCard 
            v-for="(movie, index) in movies" 
            :key="movie.id" 
            :movie="movie" 
            :rank="index + 1" 
            :index="index" 
          />
        </template>
        
        <template v-else-if="variant === 'featured'">
          <FeaturedMovieCard 
            v-for="(movie, index) in movies" 
            :key="movie.id" 
            :movie="movie" 
            :index="index" 
          />
        </template>
        
        <template v-else>
          <MovieCard 
            v-for="(movie, index) in movies" 
            :key="movie.id" 
            :movie="movie" 
            :index="index" 
            :size="variant === 'compact' ? 'sm' : 'md'" 
          />
        </template>
      </div>
    </div>
  </section>
</template>