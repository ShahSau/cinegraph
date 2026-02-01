<script setup lang="ts">
import { computed } from 'vue';
import { Calendar, MapPin } from 'lucide-vue-next';
import { format, differenceInYears } from 'date-fns';
import type { Actor } from '@/types/actor';

interface Props {
  actor: Actor;
}

const props = defineProps<Props>();

// Computed properties for date calculations
const age = computed(() => {
  return differenceInYears(new Date(), new Date(props.actor.birthDate));
});

const formattedBirthDate = computed(() => {
  return format(new Date(props.actor.birthDate), 'MMMM d, yyyy');
});
</script>

<template>
  <section class="relative pt-24 pb-8">
    <div class="container mx-auto max-w-7xl px-4">
      <div class="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
        
        <div 
          class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 animate-in fade-in zoom-in-95 duration-700 ease-out"
        >
          <img
            :src="actor.profileImage"
            :alt="actor.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        <div 
          class="py-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100 fill-mode-both"
        >
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-3">
            {{ actor.name }}
          </h1>
          
          <p class="text-xl text-muted-foreground mb-6">
            {{ actor.tagline }}
          </p>

          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-primary" />
              <span>
                {{ formattedBirthDate }} ({{ age }} years old)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-primary" />
              <span>{{ actor.birthPlace }}</span>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Known For
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="credit in actor.knownFor.slice(0, 5)"
                :key="credit.id"
                class="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full"
              >
                {{ credit.title }} ({{ credit.year }})
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>