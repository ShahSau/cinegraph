<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ArrowRight, Clock } from 'lucide-vue-next';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  source: string;
}

interface Props {
  news: NewsItem[];
  actorName: string;
}
 
// We define them here for TypeScript validation.
defineProps<Props>();

// Helper function for date formatting
const formatDate = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};
</script>

<template>
  <section
    v-if="news.length > 0"
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-[800ms] fill-mode-both"
  >
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-display font-bold text-foreground">
        Related News
      </h2>
      <RouterLink
        to="/news"
        class="flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
      >
        View All News
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <article
        v-for="(article, index) in news"
        :key="article.id"
        class="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
        :style="{ animationDelay: `${100 + index * 100}ms` }"
      >
        <RouterLink
          :to="`/news/${article.id}`"
          class="group block"
        >
          <div class="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          
          <h3 class="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {{ article.title }}
          </h3>
          
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{{ article.source }}</span>
            <span>•</span>
            <div class="flex items-center gap-1">
              <Clock class="w-3 h-3" />
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
        </RouterLink>
      </article>
    </div>
  </section>
</template>