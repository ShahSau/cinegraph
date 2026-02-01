<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ArrowRight } from 'lucide-vue-next';
import { formatDistanceToNow } from 'date-fns';
import type { NewsArticle } from '@/types/news';

interface Props {
  articles: NewsArticle[];
}

defineProps<Props>();

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
</script>

<template>
  <section v-if="articles.length > 0" class="mt-16">
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      Related Stories
    </h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <article
        v-for="(article, index) in articles"
        :key="article.id"
        class="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <RouterLink :to="`/news/${article.id}`" class="group block">
          <div class="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <h3 class="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {{ article.title }}
          </h3>

          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{{ article.source }}</span>
            <span>•</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>
        </RouterLink>
      </article>
    </div>

    <div class="mt-8 text-center">
      <RouterLink
        to="/news"
        class="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
      >
        View All News
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>
  </section>
</template>