<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Bookmark, Trash2, Film } from 'lucide-vue-next';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import MovieCard from '@/components/MovieCard.vue';
import { Button } from '@/components/ui/button';
import { useWatchlistStore } from '@/stores/watchlist';

const watchlistStore = useWatchlistStore();
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <section class="pt-28 pb-8 px-4 md:px-8">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center md:text-left animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bookmark class="w-6 h-6 text-primary" />
            </div>
            <h1 class="text-4xl md:text-5xl font-display text-foreground">
              My Watchlist
            </h1>
          </div>
          <p class="text-muted-foreground">
            {{ watchlistStore.watchlist.length }} 
            {{ watchlistStore.watchlist.length === 1 ? 'movie' : 'movies' }} saved
          </p>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-8 pb-16">
      <div class="container mx-auto max-w-7xl">
        
        <div 
          v-if="watchlistStore.watchlist.length > 0" 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          <div
            v-for="(movie, index) in watchlistStore.watchlist"
            :key="movie.id"
            class="relative group animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <MovieCard :movie="movie" :index="0" size="md" />
            
            <button
              @click="watchlistStore.removeFromWatchlist(movie.id)"
              class="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110 duration-200"
              title="Remove from watchlist"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-else class="text-center py-20 animate-in zoom-in-95 duration-500">
          <div class="w-32 h-32 mx-auto bg-card rounded-full flex items-center justify-center mb-8 border border-white/10">
            <Film class="w-14 h-14 text-muted-foreground" />
          </div>
          <h2 class="text-2xl font-display text-foreground mb-4">
            Your Watchlist is Empty
          </h2>
          <p class="text-muted-foreground max-w-md mx-auto mb-8">
            Start adding movies to your watchlist by clicking the + button on any movie card.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/">
              <Button class="btn-primary-gradient gap-2 w-full sm:w-auto">
                <Film class="w-4 h-4" />
                Browse Movies
              </Button>
            </RouterLink>
            <RouterLink to="/discover">
              <Button variant="outline" class="gap-2 border-white/20 bg-white/5 w-full sm:w-auto">
                Discover More
              </Button>
            </RouterLink>
          </div>
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>