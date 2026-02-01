<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Film } from 'lucide-vue-next';

const navLinks = ['Home', 'Discover', 'Search', 'Watchlist'];
</script>

<template>
  <footer class="bg-card/50 border-t border-white/5 mt-16">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-2">
          <RouterLink to="/" class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Film class="w-5 h-5 text-primary-foreground" />
            </div>
            <span class="text-xl font-display tracking-wider text-foreground">
              cinegraph
            </span>
          </RouterLink>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-md">
            Discover the best movies from around the world. Your ultimate destination for 
            cinematic experiences, ratings, and personalized watchlists.
          </p>
        </div>

        <div>
          <h4 class="font-display text-lg text-foreground mb-4">Explore</h4>
          <ul class="space-y-2">
            <li v-for="item in navLinks" :key="item">
              <RouterLink
                :to="`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`"
                class="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {{ item }}
              </RouterLink>
            </li>
          </ul>
        </div>

      </div>

      <div class="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2024 cinegraph. Built for portfolio demonstration.</p>
        <p class="text-xs">
          Data is mock/static. No real APIs.
        </p>
      </div>
    </div>
  </footer>
</template>