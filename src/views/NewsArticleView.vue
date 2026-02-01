<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from 'lucide-vue-next';
import { format } from 'date-fns';

// Components
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import RelatedNews from '@/components/news/RelatedNews.vue';
import { Button } from '@/components/ui/button';

// Data
import { getNewsById, getRelatedNews } from '@/data/news';

const route = useRoute();
const router = useRouter();

// Get Article ID safely
// route.params.id can be string or string[], ensuring we get a string
const articleId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : id;
});

// Fetch Data
const article = computed(() => getNewsById(articleId.value));
const relatedArticles = computed(() => 
  article.value ? getRelatedNews(article.value.id, article.value.category) : []
);

// Formatting Helpers
const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMMM d, yyyy');
};

const goBack = () => {
  router.push('/news');
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <div v-if="!article" class="pt-32 pb-16 text-center">
      <h1 class="text-2xl font-display text-foreground mb-4">Article Not Found</h1>
      <p class="text-muted-foreground mb-8">
        The article you're looking for doesn't exist or has been removed.
      </p>
      <Button @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to News
      </Button>
    </div>

    <div v-else>
      <div class="pt-24 px-4">
        <div class="container mx-auto max-w-4xl">
          <div class="animate-in fade-in slide-in-from-right-5 duration-500">
            <RouterLink
              to="/news"
              class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft class="w-4 h-4" />
              Back to News
            </RouterLink>
          </div>
        </div>
      </div>

      <article class="px-4 pt-6 pb-16">
        <div class="container mx-auto max-w-4xl">
          
          <div class="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <span class="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded capitalize">
              {{ article.category.replace('-', ' ') }}
            </span>
            <span class="text-sm text-muted-foreground">
              {{ article.source }}
            </span>
          </div>

          <h1 
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-500 delay-100 fill-mode-both"
          >
            {{ article.title }}
          </h1>

          <p 
            class="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150 fill-mode-both"
          >
            {{ article.excerpt }}
          </p>

          <div 
            class="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-200 fill-mode-both"
          >
            <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div class="flex items-center gap-1.5">
                <User class="w-4 h-4" />
                <span>{{ article.author }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Calendar class="w-4 h-4" />
                <span>{{ formatDate(article.publishedAt) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="w-4 h-4" />
                <span>{{ article.readTime }} min read</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Button variant="outline" size="sm" class="gap-2">
                <Share2 class="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" class="gap-2">
                <Bookmark class="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          <div 
            class="relative aspect-[16/9] rounded-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both"
          >
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div 
            class="prose prose-lg prose-invert max-w-none animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300 fill-mode-both"
          >
            <p 
              v-for="(paragraph, index) in article.content" 
              :key="index" 
              class="text-foreground/90 leading-relaxed mb-6 text-lg"
            >
              {{ paragraph }}
            </p>
          </div>

          <div 
            class="mt-12 pt-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300 fill-mode-both"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-muted-foreground">Tags:</span>
              <span class="px-3 py-1 text-sm bg-white/5 text-muted-foreground rounded-full capitalize">
                {{ article.category.replace('-', ' ') }}
              </span>
              <span class="px-3 py-1 text-sm bg-white/5 text-muted-foreground rounded-full">
                {{ article.source }}
              </span>
              <span class="px-3 py-1 text-sm bg-white/5 text-muted-foreground rounded-full">
                Entertainment
              </span>
            </div>
          </div>

          <RelatedNews :articles="relatedArticles" />
        </div>
      </article>
    </div>

    <Footer />
  </div>
</template>