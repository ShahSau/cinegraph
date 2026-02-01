<script setup lang="ts">
import { cn } from '@/lib/utils';
import { NEWS_CATEGORIES } from '@/types/news';
import type { NewsCategory } from '@/types/news';

interface Props {
  activeCategory: NewsCategory | 'all';
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'change', category: NewsCategory | 'all'): void;
}>();

const allCategories = [
  { value: 'all' as const, label: 'All News' },
  ...NEWS_CATEGORIES
];
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="category in allCategories"
      :key="category.value"
      @click="emit('change', category.value)"
      :class="cn(
        'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
        activeCategory === category.value
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
      )"
    >
      <span class="relative z-10">{{ category.label }}</span>
    </button>
  </div>
</template>