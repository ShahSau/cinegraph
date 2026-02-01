<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

interface Props {
  rating: number;
  source?: 'imdb' | 'tmdb';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  source: 'imdb',
  size: 'md',
  showLabel: true,
});

const getRatingClass = () => {
  if (props.rating >= 8) return 'rating-high';
  if (props.rating >= 6) return 'rating-medium';
  return 'rating-low';
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

const iconSizes = {
  sm: 10,
  md: 12,
  lg: 14,
};
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center rounded-full border font-semibold backdrop-blur-sm',
      sizeClasses[size],
      getRatingClass()
    )"
  >
    <Star class="fill-current" :size="iconSizes[size]" />
    <span>{{ rating.toFixed(1) }}</span>
    <span v-if="showLabel" class="uppercase opacity-70 text-[0.7em]">
      {{ source }}
    </span>
  </div>
</template>