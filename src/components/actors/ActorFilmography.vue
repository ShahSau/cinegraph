<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Star, Film, Tv } from 'lucide-vue-next';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Assuming you have the types file. If not, you can define the interface inline here.
import type { ActorCredit } from '@/types/actor';

interface Props {
  credits: ActorCredit[];
  title: string;
}

defineProps<Props>();
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300 fill-mode-both"
  >
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      {{ title }}
    </h2>
    
    <ScrollArea class="w-full whitespace-nowrap">
      <div class="flex gap-4 pb-4">
        <div
          v-for="(credit, index) in credits"
          :key="credit.id"
          class="flex-shrink-0 w-[180px] animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both"
          :style="{ animationDelay: `${100 + index * 50}ms` }"
        >
          <RouterLink
            :to="`/movie/${credit.id}`"
            class="group block"
          >
            <div class="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
              <img
                :src="credit.poster"
                :alt="credit.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div class="absolute top-2 right-2">
                <span class="p-1.5 rounded-md bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Film v-if="credit.type === 'movie'" class="w-3.5 h-3.5 text-primary" />
                  <Tv v-else class="w-3.5 h-3.5 text-primary" />
                </span>
              </div>

              <div 
                v-if="credit.rating" 
                class="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm"
              >
                <Star class="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span class="text-xs font-medium text-foreground">{{ credit.rating }}</span>
              </div>
            </div>
            
            <h3 class="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {{ credit.title }}
            </h3>
            <p class="text-xs text-muted-foreground">
              {{ credit.year }} • {{ credit.role }}
            </p>
          </RouterLink>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </section>
</template>