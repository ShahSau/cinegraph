<script setup lang="ts">
interface Props {
  biography: string[];
}

defineProps<Props>();
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 fill-mode-both"
  >
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      Biography
    </h2>
    <div class="prose prose-lg prose-invert max-w-none">
      <p 
        v-for="(paragraph, index) in biography" 
        :key="index" 
        class="text-foreground/80 leading-relaxed mb-4"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>