<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { cn } from '@/lib/utils';

interface Props {
  actorId: string | number;
  src: string;
  alt: string;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/actor/${actorId}`"
    :class="cn('block group', props.class)"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </RouterLink>
</template>