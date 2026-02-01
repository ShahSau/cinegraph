<script setup lang="ts">
import { SlidersHorizontal, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import DiscoverFilters from './DiscoverFilters.vue';


type SortOption = 'popularity' | 'rating' | 'year' | 'title';

interface Props {
  open: boolean;
  selectedGenres: string[];
  yearRange: number[];
  ratingRange: number[];
  sortBy: SortOption;
  hasActiveFilters: boolean;
  resultCount: number;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'update:genre', genre: string): void;
  (e: 'update:year', range: number[]): void;
  (e: 'update:rating', range: number[]): void;
  (e: 'update:sort', sort: SortOption): void;
  (e: 'clearFilters'): void;
}>();
</script>

<template>
  <Sheet :open="open" @update:open="(val) => emit('update:open', val)">
    <SheetTrigger as-child>
      <Button
        variant="outline"
        class="lg:hidden gap-2 border-white/20 bg-white/5"
      >
        <SlidersHorizontal class="w-4 h-4" />
        Filters
        <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-primary" />
      </Button>
    </SheetTrigger>
    
    <SheetContent side="right" class="w-full sm:max-w-md bg-background border-white/10 overflow-y-auto">
      <SheetHeader class="mb-6">
        <div class="flex items-center justify-between">
          <SheetTitle class="font-display text-xl">Filters</SheetTitle>
          <Button
            v-if="hasActiveFilters"
            variant="ghost"
            size="sm"
            @click="emit('clearFilters')"
            class="text-muted-foreground gap-1"
          >
            <X class="w-3 h-3" />
            Clear all
          </Button>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ resultCount }} movies found
        </p>
      </SheetHeader>

      <DiscoverFilters
        :selectedGenres="selectedGenres"
        :yearRange="yearRange"
        :ratingRange="ratingRange"
        :sortBy="sortBy"
        @update:genre="(g) => emit('update:genre', g)"
        @update:year="(y) => emit('update:year', y)"
        @update:rating="(r) => emit('update:rating', r)"
        @update:sort="(s) => emit('update:sort', s)"
      />

      <div class="sticky bottom-0 pt-4 pb-2 bg-background mt-6">
        <Button
          @click="emit('update:open', false)"
          class="w-full"
        >
          Show {{ resultCount }} Results
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>