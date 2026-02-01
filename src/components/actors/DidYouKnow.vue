<script setup lang="ts">
import { Star, Film, Heart, Trophy, Sparkles } from 'lucide-vue-next';

// Define the interface for a fact
// If you have this in @/types/actor, import it instead
interface DidYouKnowFact {
  id: string | number;
  icon: string;
  fact: string;
}

interface Props {
  facts: DidYouKnowFact[];
}

defineProps<Props>();

// Map string keys to actual Lucide components
const iconMap: Record<string, any> = {
  star: Star,
  film: Film,
  heart: Heart,
  trophy: Trophy,
  sparkles: Sparkles,
};
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500 fill-mode-both"
  >
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      Did You Know?
    </h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(fact, index) in facts"
        :key="fact.id"
        class="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-colors animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
        :style="{ animationDelay: `${100 + index * 100}ms` }"
      >
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg bg-primary/20">
            <component 
              :is="iconMap[fact.icon] || Star" 
              class="w-5 h-5 text-primary" 
            />
          </div>
          <p class="text-sm text-foreground/90 leading-relaxed">
            {{ fact.fact }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>