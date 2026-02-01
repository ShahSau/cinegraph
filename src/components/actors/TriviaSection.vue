<script setup lang="ts">
import { Info } from 'lucide-vue-next';

interface Props {
  trivia: string[];
}

defineProps<Props>();
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-[600ms] fill-mode-both"
  >
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      Trivia
    </h2>

    <div class="rounded-xl bg-card/50 border border-white/10 divide-y divide-white/5">
      <div
        v-for="(item, index) in trivia"
        :key="index"
        class="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both"
        :style="{ animationDelay: `${100 + index * 50}ms` }"
      >
        <div class="p-1.5 rounded-full bg-primary/10 mt-0.5">
          <Info class="w-3.5 h-3.5 text-primary" />
        </div>
        <p class="text-foreground/80 text-sm leading-relaxed">
          {{ item }}
        </p>
      </div>
    </div>
  </section>
</template>