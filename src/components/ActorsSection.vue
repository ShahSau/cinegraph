<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Star, Users } from 'lucide-vue-next';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getAllActors } from '@/data/actors';

const actors = getAllActors();
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto max-w-7xl px-4">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-primary/20">
            <Users class="w-5 h-5 text-primary" />
          </div>
          <h2 class="text-2xl md:text-3xl font-display font-bold text-foreground">
            Popular Actors
          </h2>
        </div>
      </div>

      <ScrollArea class="w-full whitespace-nowrap">
        <div class="flex gap-6 pb-4">
          <div
            v-for="(actor, index) in actors"
            :key="actor.id"
            class="flex-shrink-0 animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <RouterLink
              :to="`/actor/${actor.id}`"
              class="group block w-[200px]"
            >
              <div class="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg shadow-primary/10">
                <img
                  :src="actor.profileImage"
                  :alt="actor.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                <div class="absolute bottom-3 left-3 right-3">
                  <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm">
                    <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span class="text-xs font-medium text-foreground">
                      {{ actor.awards.filter(a => a.won).length }} Awards Won
                    </span>
                  </div>
                </div>
              </div>

              <h3 class="font-semibold text-foreground text-center group-hover:text-primary transition-colors mb-1">
                {{ actor.name }}
              </h3>
              <p class="text-xs text-muted-foreground text-center line-clamp-1">
                {{ actor.knownFor.slice(0, 2).map(c => c.title).join(', ') }}
              </p>
            </RouterLink>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  </section>
</template>