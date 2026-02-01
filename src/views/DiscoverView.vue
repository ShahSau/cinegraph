<script setup lang="ts">
import { ref, computed } from 'vue';
import { Sparkles, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

import DiscoverFilters from '@/components/discover/DiscoverFilters.vue';
import DiscoverGrid from '@/components/discover/DiscoverGrid.vue';
import MobileFilterSheet from '@/components/discover/MobileFilterSheet.vue';

import { movies } from '@/data/movies';
import type { Movie } from '@/types/movie';

type SortOption = 'popularity' | 'rating' | 'year' | 'title';

// State
const selectedGenres = ref<string[]>([]);
const yearRange = ref<[number, number]>([1970, 2024]);
const ratingRange = ref<[number, number]>([0, 10]);
const sortBy = ref<SortOption>('popularity');
const mobileFilterOpen = ref(false);

// Methods
const toggleGenre = (genre: string) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter((g) => g !== genre);
  } else {
    selectedGenres.value = [...selectedGenres.value, genre];
  }
};

const clearFilters = () => {
  selectedGenres.value = [];
  yearRange.value = [1970, 2024];
  ratingRange.value = [0, 10];
  sortBy.value = 'popularity';
};

// Computed: Filter & Sort Logic
const filteredMovies = computed(() => {
  let result = [...movies];

  // Filter by genre
  if (selectedGenres.value.length > 0) {
    result = result.filter((movie) =>
      selectedGenres.value.some((genre) => movie.genres.includes(genre))
    );
  }

  // Filter by year
  result = result.filter(
    (movie) => movie.year >= yearRange.value[0] && movie.year <= yearRange.value[1]
  );

  // Filter by rating
  result = result.filter(
    (movie) =>
      movie.rating.imdb >= ratingRange.value[0] && movie.rating.imdb <= ratingRange.value[1]
  );

  // Sort
  switch (sortBy.value) {
    case 'popularity':
      result.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'rating':
      result.sort((a, b) => b.rating.imdb - a.rating.imdb);
      break;
    case 'year':
      result.sort((a, b) => b.year - a.year);
      break;
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
});

const hasActiveFilters = computed(() => 
  selectedGenres.value.length > 0 ||
  yearRange.value[0] !== 1970 ||
  yearRange.value[1] !== 2024 ||
  ratingRange.value[0] !== 0 ||
  ratingRange.value[1] !== 10
);
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <section class="pt-28 pb-6 px-4 md:px-8">
      <div class="container mx-auto max-w-7xl">
        <div class="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles class="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 class="text-3xl md:text-4xl font-display text-foreground">
                  Discover
                </h1>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <MobileFilterSheet
                v-model:open="mobileFilterOpen"
                :selected-genres="selectedGenres"
                :year-range="yearRange"
                :rating-range="ratingRange"
                :sort-by="sortBy"
                :has-active-filters="hasActiveFilters"
                :result-count="filteredMovies.length"
                @toggle-genre="toggleGenre"
                @update:year-range="yearRange = $event"
                @update:rating-range="ratingRange = $event"
                @update:sort-by="sortBy = $event"
                @clear-filters="clearFilters"
              />

              <Button
                v-if="hasActiveFilters"
                variant="ghost"
                size="sm"
                @click="clearFilters"
                class="gap-1 text-muted-foreground hover:text-foreground"
              >
                <X class="w-4 h-4" />
                Clear filters
              </Button>
            </div>
          </div>

          <p class="text-muted-foreground text-sm">
            Explore and find something new to watch • {{ filteredMovies.length }} movies
          </p>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-8 pb-16">
      <div class="container mx-auto max-w-7xl">
        <div class="flex gap-8">
          
          <aside class="hidden lg:block w-72 flex-shrink-0 animate-in fade-in slide-in-from-left-5 duration-500">
            <div class="sticky top-24">
              <DiscoverFilters
                :selected-genres="selectedGenres"
                :year-range="yearRange"
                :rating-range="ratingRange"
                :sort-by="sortBy"
                @toggle-genre="toggleGenre"
                @update:year-range="yearRange = $event"
                @update:rating-range="ratingRange = $event"
                @update:sort-by="sortBy = $event"
              />
            </div>
          </aside>

          <div class="flex-1 min-w-0">
            <DiscoverGrid
              :movies="filteredMovies"
              @clear-filters="clearFilters"
            />
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>