<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { TrendingUp, Clock, Flame } from 'lucide-vue-next';
import { formatDistanceToNow } from 'date-fns';
import type { NewsArticle } from '@/types/news';

interface Props {
  trending: NewsArticle[];
  latest: NewsArticle[];
}

defineProps<Props>();

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
</script>

<template>
  <aside class="space-y-8">
    
    <div class="p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-white/5 animate-in fade-in slide-in-from-right-4 duration-500 delay-200 fill-mode-both">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-1.5 rounded-lg bg-primary/20">
          <TrendingUp class="w-4 h-4 text-primary" />
        </div>
        <h3 class="font-display text-lg text-foreground">Trending Now</h3>
      </div>

      <div class="space-y-4">
        <RouterLink
          v-for="(article, index) in trending"
          :key="article.id"
          :to="`/news/${article.id}`"
          class="group flex gap-3 items-start"
        >
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {{ index + 1 }}
          </span>
          <div class="min-w-0">
            <h4 class="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {{ article.title }}
            </h4>
            <span class="text-xs text-muted-foreground capitalize">
              {{ article.category.replace('-', ' ') }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-white/5 animate-in fade-in slide-in-from-right-4 duration-500 delay-300 fill-mode-both">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-1.5 rounded-lg bg-primary/20">
          <Clock class="w-4 h-4 text-primary" />
        </div>
        <h3 class="font-display text-lg text-foreground">Latest Headlines</h3>
      </div>

      <div class="space-y-4">
        <RouterLink
          v-for="article in latest"
          :key="article.id"
          :to="`/news/${article.id}`"
          class="group block"
        >
          <h4 class="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {{ article.title }}
          </h4>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{{ article.source }}</span>
            <span>•</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="p-5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 animate-in fade-in slide-in-from-right-4 duration-500 delay-400 fill-mode-both">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-1.5 rounded-lg bg-primary/30">
          <Flame class="w-4 h-4 text-primary" />
        </div>
        <h3 class="font-display text-lg text-foreground">Most Read</h3>
      </div>

      <div class="space-y-3">
        <RouterLink
          v-for="article in trending.slice(0, 3)"
          :key="article.id"
          :to="`/news/${article.id}`"
          class="group flex gap-3"
        >
          <div class="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {{ article.title }}
            </h4>
            <span class="text-xs text-muted-foreground">
              {{ article.readTime }} min read
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>