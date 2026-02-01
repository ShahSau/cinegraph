<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Clock, User } from 'lucide-vue-next';
import { formatDistanceToNow } from 'date-fns';
import type { NewsArticle } from '@/types/news';

interface Props {
  article: NewsArticle;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
});

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
</script>

<template>
  <article 
    class="animate-in fade-in slide-in-from-bottom-5 duration-400 fill-mode-both"
    :style="{ animationDelay: `${index * 50}ms` }"
  >
    <RouterLink
      :to="`/news/${article.id}`"
      class="group block h-full"
    >
      <div class="relative h-full rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        
        <div class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <div class="absolute top-3 left-3">
            <span class="px-2.5 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-md capitalize">
              {{ article.category.replace('-', ' ') }}
            </span>
          </div>
          
          <div class="absolute top-3 right-3">
            <span class="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm text-muted-foreground rounded">
              {{ article.source }}
            </span>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <h3 class="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {{ article.title }}
          </h3>
          
          <p class="text-sm text-muted-foreground line-clamp-2">
            {{ article.excerpt }}
          </p>

          <div class="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <div class="flex items-center gap-1">
              <User class="w-3.5 h-3.5" />
              <span>{{ article.author }}</span>
            </div>
            <div class="flex items-center gap-1">
              <Clock class="w-3.5 h-3.5" />
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </RouterLink>
  </article>
</template>