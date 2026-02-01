<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  genre: string;
  size?: 'sm' | 'md';
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  active: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const sizeClasses = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-3 py-1.5',
};
</script>

<template>
  <span
    @click="emit('click')"
    :class="cn(
      'genre-pill transition-all duration-200',
      sizeClasses[size],
      !!$attrs.onClick && 'cursor-pointer hover:bg-primary/20 hover:border-primary/40 hover:text-primary',
      active && 'bg-primary/20 border-primary/40 text-primary'
    )"
  >
    {{ genre }}
  </span>
</template>