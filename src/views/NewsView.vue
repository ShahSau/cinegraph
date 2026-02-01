<script setup lang="ts">
import { ref, computed } from 'vue';
import { Newspaper } from 'lucide-vue-next';

// Components
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import FeaturedNewsCard from '@/components/news/FeaturedNewsCard.vue';
import NewsCategoryTabs from '@/components/news/NewsCategoryTabs.vue';
import NewsSidebar from '@/components/news/NewsSidebar.vue';

// Data & Types
import { 
  newsArticles, 
  getFeaturedNews, 
  getTrendingNews, 
  getLatestNews 
} from '@/data/news';
import type { NewsCategory } from '@/types/news';

// State
const activeCategory = ref<NewsCategory | 'all'>('all');

// Data access
const featuredArticle = getFeaturedNews();
const trendingArticles = getTrendingNews();
const latestArticles = getLatestNews();

// Filter Logic
const filteredArticles = computed(() => {
  const nonFeatured = newsArticles.filter(article => !article.featured);
  
  if (activeCategory.value === 'all') {
    return nonFeatured;
  }
  
  return nonFeatured.filter(article => article.category === activeCategory.value);
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <section class="pt-24 pb-8 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-xl bg-primary/20">
              <Newspaper class="w-6 h-6 text-primary" />
            </div>
            <h1 class="text-4xl md:text-5xl font-display font-bold text-foreground">
              Entertainment News
            </h1>
          </div>
          
          <p 
            class="text-muted-foreground text-lg max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
            style="animation-delay: 100ms;"
          >
            Stay updated with the latest news from Hollywood, streaming platforms, and the entertainment industry.
          </p>
        </div>
      </div>
    </section>

    <section v-if="featuredArticle" class="px-4 pb-8">
      <div class="container mx-auto max-w-7xl">
        <FeaturedNewsCard :article="featuredArticle" />
      </div>
    </section>

    <section class="px-4 pb-8">
      <div class="container mx-auto max-w-7xl">
        <NewsCategoryTabs 
          :active-category="activeCategory" 
          @change="activeCategory = $event" 
        />
      </div>
    </section>

    <section class="px-4 pb-16">
      <div class="container mx-auto max-w-7xl">
        <div class="grid lg:grid-cols-[1fr_320px] gap-8">
          
          <div>
            <div v-if="filteredArticles.length === 0" class="text-center py-16 animate-in fade-in">
              <p class="text-muted-foreground text-lg">
                No articles found in this category.
              </p>
            </div>
            
            <div v-else class="grid sm:grid-cols-2 gap-6">
              <NewsCard 
                v-for="(article, index) in filteredArticles" 
                :key="article.id" 
                :article="article" 
                :index="index" 
              />
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="sticky top-24">
              <NewsSidebar 
                :trending="trendingArticles" 
                :latest="latestArticles" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>