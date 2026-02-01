<script setup lang="ts">
import { Filter } from 'lucide-vue-next';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allGenres } from '@/data/movies';
import GenreTag from '../GenreTag.vue';

// Define types
type SortOption = 'popularity' | 'rating' | 'year' | 'title';

interface Props {
  selectedGenres: string[];
  yearRange: number[]; 
  ratingRange: number[];
  sortBy: SortOption;
}

defineProps<Props>();

// Define Emits
const emit = defineEmits<{
  'update:genre': [genre: string];
  'update:year': [range: number[]];
  'update:rating': [range: number[]];
  'update:sort': [sort: SortOption];
}>();

// --- Handler Functions (Fixes the "unexpected token" error) ---

const handleGenreToggle = (genre: string) => {
  emit('update:genre', genre);
};

// We handle the casting here in the script, where it belongs
const handleYearChange = (val: number[] | undefined) => {
  if (val) emit('update:year', val);
};

const handleRatingChange = (val: number[] | undefined) => {
  if (val) emit('update:rating', val);
};

const handleSortChange = (val: string | null | undefined | unknown) => {
  if (typeof val === 'string') {
    emit('update:sort', val as SortOption);
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="bg-card/50 border border-white/5 p-5 rounded-xl">
      <h3 class="font-display text-base text-foreground mb-4 flex items-center gap-2">
        <Filter class="w-4 h-4 text-primary" />
        Genres
      </h3>
      <div class="flex flex-wrap gap-2">
        <GenreTag
          v-for="genre in allGenres"
          :key="genre"
          :genre="genre"
          size="sm"
          :active="selectedGenres.includes(genre)"
          @click="handleGenreToggle(genre)"
        />
      </div>
    </div>

    <div class="bg-card/50 border border-white/5 p-5 rounded-xl">
      <h3 class="font-display text-base text-foreground mb-4">Release Year</h3>
      <div class="px-1">
        <Slider
          :min="1970"
          :max="2024"
          :step="1"
          :model-value="yearRange"
          @update:model-value="handleYearChange"
          class="mb-3"
        />
        <div class="flex justify-between text-xs text-muted-foreground">
          <span class="bg-white/5 px-2 py-1 rounded">{{ yearRange[0] }}</span>
          <span class="bg-white/5 px-2 py-1 rounded">{{ yearRange[1] }}</span>
        </div>
      </div>
    </div>

    <div class="bg-card/50 border border-white/5 p-5 rounded-xl">
      <h3 class="font-display text-base text-foreground mb-4">IMDb Rating</h3>
      <div class="px-1">
        <Slider
          :min="0"
          :max="10"
          :step="0.5"
          :model-value="ratingRange"
          @update:model-value="handleRatingChange"
          class="mb-3"
        />
        <div class="flex justify-between text-xs text-muted-foreground">
          <span class="bg-white/5 px-2 py-1 rounded">{{ ratingRange[0].toFixed(1) }}+</span>
          <span class="bg-white/5 px-2 py-1 rounded">{{ ratingRange[1].toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <div class="bg-card/50 border border-white/5 p-5 rounded-xl">
      <h3 class="font-display text-base text-foreground mb-4">Sort By</h3>
      <Select 
        :model-value="sortBy" 
        @update:model-value="handleSortChange"
      >
        <SelectTrigger class="w-full bg-background/50 border-white/10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popularity">Popularity</SelectItem>
          <SelectItem value="rating">Highest Rating</SelectItem>
          <SelectItem value="year">Newest First</SelectItem>
          <SelectItem value="title">Title (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>