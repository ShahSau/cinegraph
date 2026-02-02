<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Filter, Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie';

interface Props {
  movies: Movie[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'clearFilters'): void;
}>();

const ITEMS_PER_PAGE = 40;
const visibleCount = ref(ITEMS_PER_PAGE);
const isLoading = ref(false);
const loadMoreRef = ref<HTMLElement | null>(null);

const visibleMovies = computed(() => props.movies.slice(0, visibleCount.value));
const hasMore = computed(() => visibleCount.value < props.movies.length);

// Reset when movies change
watch(() => props.movies, () => {
  visibleCount.value = ITEMS_PER_PAGE;
});

const loadMore = () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  // Simulate delay
  setTimeout(() => {
    visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_PAGE, props.movies.length);
    isLoading.value = false;
  }, 300);
};

// Intersection Observer logic
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !isLoading.value) {
        loadMore();
      }
    },
    { threshold: 0.1, rootMargin: '100px' }
  );
  
  // We need to watch the ref because it might not be rendered initially (if no results)
  watch(loadMoreRef, (el) => {
    if (el) observer?.observe(el);
  }, { immediate: true });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div v-if="movies.length === 0" class="text-center py-20 animate-in fade-in duration-500">
    <div class="w-24 h-24 mx-auto bg-card/50 border border-white/5 rounded-full flex items-center justify-center mb-6">
      <Filter class="w-10 h-10 text-muted-foreground" />
    </div>
    <h3 class="text-xl font-display text-foreground mb-2">
      No Movies Found
    </h3>
    <p class="text-muted-foreground max-w-md mx-auto mb-6">
      Try adjusting your filters to discover more movies.
    </p>
    <Button 
      @click="emit('clearFilters')" 
      variant="outline" 
      class="border-white/20"
    >
      Clear Filters
    </Button>
  </div>

  <div v-else class="space-y-8">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 sm:gap-x-8 lg:gap-x-8">
      <div
        v-for="(movie, index) in visibleMovies"
        :key="movie.id"
        class="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both flex justify-center w-full"
        :style="{ animationDelay: `${Math.min(index * 30, 300)}ms` }"
      >
        <MovieCard 
          :movie="movie" 
          :index="index" 
          size="md" 
          class="!w-full"
        />
      </div>
    </div>

    <div v-if="hasMore" ref="loadMoreRef" class="flex justify-center py-8">
      <div v-if="isLoading" class="flex items-center gap-3 text-muted-foreground">
        <Loader2 class="w-5 h-5 animate-spin" />
        <span class="text-sm">Loading more movies...</span>
      </div>
      <Button
        v-else
        variant="outline"
        @click="loadMore"
        class="border-white/20 bg-white/5"
      >
        Load More ({{ movies.length - visibleCount }} remaining)
      </Button>
    </div>

    <div v-if="!hasMore && movies.length > 0" class="text-center py-4">
      <p class="text-sm text-muted-foreground">
        Showing all {{ movies.length }} movies
      </p>
    </div>
  </div>
</template>