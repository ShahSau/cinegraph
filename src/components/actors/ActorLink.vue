<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { cn } from '@/lib/utils';

interface Props {
  actorId: string | number;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/actor/${actorId}`"
    :class="cn('hover:text-primary transition-colors cursor-pointer', props.class)"
  >
    <slot />
  </RouterLink>
</template>