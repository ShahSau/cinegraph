<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router';
import { cn } from '@/lib/utils';

// Extend RouterLinkProps
interface Props extends RouterLinkProps {
  class?: string;
  activeClass?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink v-bind="props" custom v-slot="{ isActive, href, navigate }">
    <a
      :href="href"
      @click="navigate"
      :class="cn(
        props.class,
        isActive && props.activeClass
      )"
    >
      <slot />
    </a>
  </RouterLink>
</template>