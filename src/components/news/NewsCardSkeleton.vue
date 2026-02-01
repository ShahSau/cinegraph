<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-white/5">
    <Skeleton class="aspect-[16/10] w-full" />
    <div class="p-4 space-y-3">
      <Skeleton class="h-5 w-full" />
      <Skeleton class="h-5 w-3/4" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-2/3" />
      <div class="flex gap-4 pt-2">
        <Skeleton class="h-3 w-20" />
        <Skeleton class="h-3 w-24" />
      </div>
    </div>
  </div>
</template>