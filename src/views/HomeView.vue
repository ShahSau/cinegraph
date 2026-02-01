<script setup lang="ts">
// Component Imports
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import HeroSection from '@/components/HeroSection.vue';
import TrendingSection from '@/components/TrendingSection.vue';
import PopularGrid from '@/components/PopularGrid.vue';
import TopRatedShowcase from '@/components/TopRatedShowcase.vue';
import UpcomingTimeline from '@/components/UpcomingTimeline.vue';

// Data Imports
import {
  movies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/data/movies';

// Data Logic
// Note: In Vue, if this data comes from an API later, you would use ref() or onMounted().
// For static data, simple consts work perfectly.
const featuredMovie = movies[0];
const trending = getTrendingMovies();
const popular = getPopularMovies();
const topRated = getTopRatedMovies();
const upcoming = getUpcomingMovies();
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />
    
    <HeroSection :movie="featuredMovie" />

    <div 
      class="relative z-10 -mt-20 pb-8 animate-in fade-in duration-700 fill-mode-both"
      style="animation-delay: 500ms;"
    >
      <TrendingSection :movies="trending" />
      
      <PopularGrid :movies="popular" />
      
      <TopRatedShowcase :movies="topRated" />
      
      <UpcomingTimeline :movies="upcoming" />
    </div>

    <Footer />
  </div>
</template>