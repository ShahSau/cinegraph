<script setup lang="ts">
import { Heart, HeartCrack, Users } from 'lucide-vue-next';

interface Relationship {
  id: string | number;
  name: string;
  type: 'spouse' | 'partner' | 'ex-spouse' | 'ex-partner' | 'other';
  startYear: string;
  endYear?: string;
  description?: string;
}

interface Props {
  relationships: Relationship[];
}

defineProps<Props>();

// Helper function to determine the correct icon component
const getRelationshipIcon = (type: Relationship['type']) => {
  switch (type) {
    case 'spouse':
    case 'partner':
      return Heart;
    case 'ex-spouse':
    case 'ex-partner':
      return HeartCrack;
    default:
      return Users;
  }
};

// Helper function for display labels
const getRelationshipLabel = (type: Relationship['type']) => {
  switch (type) {
    case 'spouse':
      return 'Married';
    case 'partner':
      return 'Partner';
    case 'ex-spouse':
      return 'Divorced';
    case 'ex-partner':
      return 'Ex-Partner';
    default:
      return type;
  }
};

// Helper to check if the relationship is active (for styling)
const isRelationshipActive = (type: Relationship['type']) => {
  return type === 'spouse' || type === 'partner';
};
</script>

<template>
  <section 
    class="py-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-700 fill-mode-both"
  >
    <h2 class="text-2xl font-display font-bold text-foreground mb-6">
      Personal Life
    </h2>

    <div class="space-y-4">
      <div
        v-for="(relationship, index) in relationships"
        :key="relationship.id"
        class="p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
        :class="isRelationshipActive(relationship.type)
          ? 'bg-primary/10 border-primary/30'
          : 'bg-card/50 border-white/10'"
        :style="{ animationDelay: `${100 + index * 100}ms` }"
      >
        <div class="flex items-start gap-4">
          <div 
            class="p-2 rounded-lg"
            :class="isRelationshipActive(relationship.type) ? 'bg-primary/20' : 'bg-white/5'"
          >
            <component 
              :is="getRelationshipIcon(relationship.type)"
              class="w-5 h-5"
              :class="isRelationshipActive(relationship.type) ? 'text-primary' : 'text-muted-foreground'"
            />
          </div>
          
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1">
              <h3 class="font-semibold text-foreground">
                {{ relationship.name }}
              </h3>
              <span 
                class="px-2 py-0.5 text-xs font-medium rounded"
                :class="isRelationshipActive(relationship.type)
                  ? 'bg-primary/20 text-primary'
                  : 'bg-white/10 text-muted-foreground'"
              >
                {{ getRelationshipLabel(relationship.type) }}
              </span>
            </div>
            
            <p class="text-sm text-muted-foreground mb-2">
              {{ relationship.startYear }}
              {{ relationship.endYear ? ` – ${relationship.endYear}` : ' – Present' }}
            </p>
            
            <p v-if="relationship.description" class="text-sm text-foreground/70">
              {{ relationship.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>