<script setup lang="ts">
import { computed } from 'vue';
import { Trophy, Award as AwardIcon, Medal } from 'lucide-vue-next';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import type { Award } from '@/types/actor';

interface Props {
  awards: Award[];
}

const props = defineProps<Props>();

// Computed properties for statistics
const wins = computed(() => props.awards.filter(a => a.won).length);
const nominations = computed(() => props.awards.length);
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400 fill-mode-both"
  >
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-display font-bold text-foreground">
        Awards & Nominations
      </h2>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <Trophy class="w-5 h-5 text-yellow-500" />
          <span class="text-lg font-bold text-yellow-500">{{ wins }}</span>
          <span class="text-sm text-muted-foreground">Wins</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Medal class="w-5 h-5 text-primary" />
          <span class="text-lg font-bold text-primary">{{ nominations }}</span>
          <span class="text-sm text-muted-foreground">Nominations</span>
        </div>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TooltipProvider v-for="(award, index) in awards" :key="award.id">
        <Tooltip>
          <TooltipTrigger as-child>
            <div 
              class="p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
              :class="award.won 
                ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50' 
                : 'bg-card/50 border-white/10 hover:border-white/20'"
              :style="{ animationDelay: `${100 + index * 50}ms` }"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="p-2 rounded-lg"
                  :class="award.won ? 'bg-yellow-500/20' : 'bg-primary/10'"
                >
                  <Trophy v-if="award.won" class="w-5 h-5 text-yellow-500" />
                  <AwardIcon v-else class="w-5 h-5 text-primary" />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-foreground text-sm">
                    {{ award.name }}
                  </h3>
                  <p class="text-xs text-muted-foreground line-clamp-1">
                    {{ award.category }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-primary">{{ award.year }}</span>
                    <span class="text-xs text-muted-foreground">•</span>
                    <span class="text-xs text-muted-foreground line-clamp-1">
                      {{ award.project }}
                    </span>
                  </div>
                </div>

                <span v-if="award.won" class="px-2 py-0.5 text-[10px] font-bold uppercase bg-yellow-500 text-yellow-950 rounded">
                  Won
                </span>
              </div>
            </div>
          </TooltipTrigger>
          
          <TooltipContent side="top" class="max-w-xs">
            <div class="space-y-1">
              <p class="font-semibold">{{ award.name }}</p>
              <p class="text-sm text-muted-foreground">{{ award.category }}</p>
              <p class="text-sm">
                <span class="text-primary">{{ award.year }}</span> • {{ award.project }}
              </p>
              <p class="text-sm font-medium">
                {{ award.won ? '🏆 Winner' : '📋 Nominated' }}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </section>
</template>