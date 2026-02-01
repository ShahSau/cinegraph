<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Clock, User, ArrowRight } from 'lucide-vue-next';
import { formatDistanceToNow } from 'date-fns';
import type { NewsArticle } from '@/types/news';

interface Props {
  article: NewsArticle;
}

defineProps<Props>();

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
</script>

<template>
  <article class="group animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
    <RouterLink :to="`/news/${article.id}`" class="block">
      <div class="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-white/5">
        <div class="grid lg:grid-cols-2 gap-0">
          
          <div class="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 hidden lg:block" />
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent lg:hidden" />
            
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-md uppercase tracking-wider">
                Featured
              </span>
            </div>
          </div>

          <div class="relative p-6 lg:p-8 flex flex-col justify-center">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-2.5 py-1 text-xs font-medium bg-primary/20 text-primary rounded capitalize">
                {{ article.category.replace('-', ' ') }}
              </span>
              <span class="text-xs text-muted-foreground">
                {{ article.source }}
              </span>
            </div>

            <h2 class="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {{ article.title }}
            </h2>

            <p class="text-muted-foreground mb-6 line-clamp-3">
              {{ article.excerpt }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <div class="flex items-center gap-1.5">
                  <User class="w-4 h-4" />
                  <span>{{ article.author }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Clock class="w-4 h-4" />
                  <span>{{ formatDate(article.publishedAt) }}</span>
                </div>
              </div>

              <div class="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span class="text-sm">Read More</span>
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </RouterLink>
  </article>
</template>