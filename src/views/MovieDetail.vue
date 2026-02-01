<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { 
  Play, Plus, Check, Clock, Calendar, 
  Globe, DollarSign, Award, ArrowLeft, Share2 
} from 'lucide-vue-next';

// Components
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import MovieCarousel from '@/components/MovieCarousel.vue';
import GenreTag from '@/components/GenreTag.vue';
import RatingBadge from '@/components/RatingBadge.vue';
import { Button } from '@/components/ui/button';

// Stores & Data
import { useWatchlistStore } from '@/stores/watchlist';
import { getMovieById, getSimilarMovies, getCastByMovieId } from '@/data/movies';
import { getActorByName } from '@/data/actors';

const route = useRoute();

const watchlistStore = useWatchlistStore();

// State
const backdropLoaded = ref(false);
const posterLoaded = ref(false);

// Get Movie ID safely
const movieId = computed(() => Number(route.params.id));

// Fetch Data
const movie = computed(() => getMovieById(movieId.value));

// Redirect logic or 404 handling could happen here, but we handle it in template v-if
// Computed properties for dependent data
const similarMovies = computed(() => movie.value ? getSimilarMovies(movie.value) : []);
const cast = computed(() => movie.value ? getCastByMovieId(movie.value.id) : []);

// Enrich cast with actor profiles for links
const castWithProfiles = computed(() => {
  return cast.value.map(member => ({
    ...member,
    profile: getActorByName(member.name)
  }));
});

const inWatchlist = computed(() => 
  movie.value ? watchlistStore.isInWatchlist(movie.value.id) : false
);

// Actions
const handleWatchlistToggle = () => {
  if (!movie.value) return;
  if (inWatchlist.value) {
    watchlistStore.removeFromWatchlist(movie.value.id);
  } else {
    watchlistStore.addToWatchlist(movie.value);
  }
};

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

// Reset image loading state when route changes (e.g. clicking a similar movie)
watch(() => route.params.id, () => {
  backdropLoaded.value = false;
  posterLoaded.value = false;
  // Scroll to top is handled by router config, but strict safety:
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <div v-if="!movie" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-display text-foreground mb-4">Movie Not Found</h1>
        <RouterLink to="/">
          <Button variant="outline">Go Home</Button>
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <Navigation />

      <section class="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div class="absolute inset-0">
          <div v-if="!backdropLoaded" class="absolute inset-0 skeleton-shimmer" />
          <img
            :src="movie.backdrop"
            :alt="movie.title"
            @load="backdropLoaded = true"
            class="w-full h-full object-cover transition-opacity duration-700"
            :class="backdropLoaded ? 'opacity-100' : 'opacity-0'"
          />
          <div class="hero-gradient absolute inset-0" />
          <div class="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>

        <RouterLink
          to="/"
          class="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
          <span class="text-sm">Back</span>
        </RouterLink>

        <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div class="container mx-auto max-w-7xl">
            <div class="flex flex-col md:flex-row gap-8 items-end">
              
              <div class="hidden md:block w-64 flex-shrink-0 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div class="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div v-if="!posterLoaded" class="absolute inset-0 skeleton-shimmer" />
                  <img
                    :src="movie.poster"
                    :alt="movie.title"
                    @load="posterLoaded = true"
                    class="w-full h-full object-cover transition-opacity duration-500"
                    :class="posterLoaded ? 'opacity-100' : 'opacity-0'"
                  />
                </div>
              </div>

              <div class="flex-1 pb-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100 fill-mode-both">
                <p v-if="movie.tagline" class="text-primary text-sm md:text-base font-medium mb-2 uppercase tracking-wide">
                  {{ movie.tagline }}
                </p>

                <h1 class="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-4 leading-none">
                  {{ movie.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-4 mb-4">
                  <RatingBadge :rating="movie.rating.imdb" source="imdb" size="md" />
                  <RatingBadge v-if="movie.rating.tmdb" :rating="movie.rating.tmdb" source="tmdb" size="md" />
                  
                  <div class="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Calendar class="w-4 h-4" />
                    <span>{{ movie.year }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock class="w-4 h-4" />
                    <span>{{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}m</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Globe class="w-4 h-4" />
                    <span>{{ movie.language || 'English' }}</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                  <GenreTag v-for="genre in movie.genres" :key="genre" :genre="genre" />
                </div>

                <div class="flex flex-wrap gap-4">
                  <Button size="lg" class="btn-primary-gradient gap-2">
                    <Play class="w-5 h-5 fill-current" />
                    Watch Trailer
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    @click="handleWatchlistToggle"
                    class="gap-2 border-white/20 bg-white/5 hover:bg-white/10"
                  >
                    <template v-if="inWatchlist">
                      <Check class="w-5 h-5" />
                      In Watchlist
                    </template>
                    <template v-else>
                      <Plus class="w-5 h-5" />
                      Add to List
                    </template>
                  </Button>
                  
                  <Button size="lg" variant="ghost" class="gap-2">
                    <Share2 class="w-5 h-5" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="container mx-auto px-4 md:px-8 max-w-7xl">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div class="lg:col-span-2 space-y-10">
              <div class="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 fill-mode-both">
                <h2 class="text-2xl font-display text-foreground mb-4">Overview</h2>
                <p class="text-muted-foreground leading-relaxed">{{ movie.overview }}</p>
              </div>

              <div class="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300 fill-mode-both">
                <h2 class="text-2xl font-display text-foreground mb-6">Cast</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  
                  <div 
                    v-for="(member, index) in castWithProfiles" 
                    :key="member.id || member.name"
                    class="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
                    :style="{ animationDelay: `${index * 50}ms` }"
                  >
                    <component 
                      :is="member.profile ? RouterLink : 'div'"
                      :to="member.profile ? `/actor/${member.profile.id}` : undefined"
                      class="group block"
                    >
                      <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-card mb-2">
                        <img
                          :src="member.photo"
                          :alt="member.name"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div v-if="member.profile" class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 class="text-sm font-medium truncate" :class="member.profile ? 'text-foreground group-hover:text-primary transition-colors' : 'text-foreground'">
                        {{ member.name }}
                      </h4>
                      <p class="text-xs text-muted-foreground truncate">
                        {{ member.character }}
                      </p>
                    </component>
                  </div>

                </div>
              </div>

              <div class="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400 fill-mode-both">
                <h2 class="text-2xl font-display text-foreground mb-4">Trailer</h2>
                <div class="relative aspect-video rounded-xl overflow-hidden bg-card border border-white/10">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <div class="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-primary/30 transition-colors">
                        <Play class="w-8 h-8 text-primary fill-current ml-1" />
                      </div>
                      <p class="text-muted-foreground text-sm">Click to play trailer</p>
                    </div>
                  </div>
                  <img
                    :src="movie.backdrop"
                    alt="Trailer thumbnail"
                    class="w-full h-full object-cover opacity-30"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-6 animate-in fade-in slide-in-from-right-5 duration-700 delay-500 fill-mode-both">
              
              <div class="glass-card p-6 rounded-xl space-y-4">
                <h3 class="font-display text-xl text-foreground">Details</h3>
                <div class="space-y-3">
                  <div v-if="movie.director" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Director</span>
                    <span class="text-foreground font-medium">{{ movie.director }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Status</span>
                    <span class="text-foreground font-medium">Released</span> 
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Release Date</span>
                    <span class="text-foreground font-medium">{{ movie.releaseDate }}</span>
                  </div>
                </div>
              </div>

              <div v-if="movie.budget || movie.revenue" class="glass-card p-6 rounded-xl space-y-4">
                <h3 class="font-display text-xl text-foreground">Box Office</h3>
                <div class="space-y-3">
                  <div v-if="(movie as any).budget" class="flex justify-between text-sm">
                    <span class="text-muted-foreground flex items-center gap-2">
                      <DollarSign class="w-4 h-4" />
                      Budget
                    </span>
                    <span class="text-foreground font-medium">
                      {{ formatCurrency((movie as any).budget) }}
                    </span>
                  </div>
                  <div v-if="(movie as any).revenue" class="flex justify-between text-sm">
                    <span class="text-muted-foreground flex items-center gap-2">
                      <DollarSign class="w-4 h-4" />
                      Revenue
                    </span>
                    <span class="text-rating-high font-medium">
                      {{ formatCurrency((movie as any).revenue) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="glass-card p-6 rounded-xl space-y-4">
                <h3 class="font-display text-xl text-foreground flex items-center gap-2">
                  <Award class="w-5 h-5 text-primary" />
                  Awards
                </h3>
                <div class="text-sm text-muted-foreground">
                  <p>Academy Awards: 6 wins, 11 nominations</p>
                  <p class="mt-1">Golden Globes: 2 wins, 5 nominations</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <MovieCarousel 
        v-if="similarMovies.length > 0" 
        title="You May Also Like" 
        :movies="similarMovies" 
        cardSize="md" 
      />

      <Footer />
    </div>
  </div>
</template>