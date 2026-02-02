<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search as SearchIcon, X, Film, Tv } from 'lucide-vue-next';

// Components
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import MovieCard from '@/components/MovieCard.vue';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Data
import { searchMovies, movies } from '@/data/movies';

type SearchTab = 'movies' | 'shows';

const route = useRoute();
const router = useRouter();

// State
const query = ref('');
const debouncedQuery = ref('');
const activeTab = ref<SearchTab>('movies');
const timeoutId = ref<number | null>(null);

// Initialize from URL on mount
onMounted(() => {
  const q = route.query.q as string;
  if (q) {
    query.value = q;
    debouncedQuery.value = q;
  }
});

// Search Logic
const results = computed(() => {
  if (!debouncedQuery.value.trim()) return [];
  return searchMovies(debouncedQuery.value);
});

const popularMovies = computed(() => movies.slice(0, 10));

// Debounce & Update URL
watch(query, (newQuery) => {
  if (timeoutId.value) clearTimeout(timeoutId.value);
  
  timeoutId.value = window.setTimeout(() => {
    debouncedQuery.value = newQuery;
    
    // Update URL without reloading page
    if (newQuery) {
      router.replace({ query: { q: newQuery } });
    } else {
      router.replace({ query: {} });
    }
  }, 300);
});

const clearSearch = () => {
  query.value = '';
  debouncedQuery.value = '';
  router.replace({ query: {} });
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <section class="pt-28 pb-8 px-4 md:px-8">
      <div class="container mx-auto max-w-4xl">
        
        <div class="text-center mb-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <h1 class="text-4xl md:text-5xl font-display text-foreground mb-4">
            Search Movies
          </h1>
          <p class="text-muted-foreground">
            Find your favorite movies, TV shows, and people
          </p>
        </div>

        <div class="relative animate-in fade-in slide-in-from-bottom-5 duration-500 delay-100 fill-mode-both">
          <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for movies, shows, people..."
            v-model="query"
            class="w-full pl-12 pr-12 py-6 text-lg bg-card border-white/10 rounded-xl focus:border-primary focus:ring-primary"
          />
          <button
            v-if="query"
            @click="clearSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="mt-8 animate-in fade-in duration-500 delay-200 fill-mode-both">
          <Tabs v-model="activeTab" class="w-full">
            <TabsList class="w-full justify-start bg-card/50 border border-white/10 p-1">
              <TabsTrigger
                value="movies"
                class="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Film class="w-4 h-4 mr-2" />
                Movies
                <span v-if="debouncedQuery" class="ml-2 text-xs opacity-70">
                  ({{ results.length }})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="shows"
                class="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Tv class="w-4 h-4 mr-2" />
                TV Shows
              </TabsTrigger>
            </TabsList>

            <TabsContent value="movies" class="mt-8">
              <div v-if="debouncedQuery">
                <div v-if="results.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 sm:gap-x-8">
                  <div 
                    v-for="(movie, index) in results" 
                    :key="movie.id"
                    class="flex justify-center w-full"
                  >
                    <MovieCard 
                      :movie="movie" 
                      :index="index" 
                      size="md" 
                      class="!w-full"
                    />
                  </div>
                </div>
                
                <div v-else class="text-center py-16 animate-in zoom-in-95 duration-300">
                  <div class="w-24 h-24 mx-auto bg-card rounded-full flex items-center justify-center mb-6">
                    <SearchIcon class="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 class="text-xl font-display text-foreground mb-2">No Results Found</h3>
                  <p class="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any movies matching "{{ debouncedQuery }}". Try a different search term.
                  </p>
                </div>
              </div>
              
              <div v-else>
                <h3 class="text-lg font-display text-foreground mb-6">Popular Movies</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 sm:gap-x-8">
                  <div 
                    v-for="(movie, index) in popularMovies" 
                    :key="movie.id"
                    class="flex justify-center w-full"
                  >
                    <MovieCard 
                      :movie="movie" 
                      :index="index" 
                      size="md" 
                      class="!w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shows" class="mt-8">
              <div class="text-center py-16">
                <Tv class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 class="text-xl font-display text-foreground mb-2">
                  TV Shows Coming Soon
                </h3>
                <p class="text-muted-foreground">
                  This feature is for demonstration purposes only.
                </p>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>