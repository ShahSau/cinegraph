<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

import ActorHeader from '@/components/actors/ActorHeader.vue';
import ActorBiography from '@/components/actors/ActorBiography.vue';
import ActorFilmography from '@/components/actors/ActorFilmography.vue';
import AwardsSection from '@/components/actors/AwardsSection.vue';
import DidYouKnow from '@/components/actors/DidYouKnow.vue';
import TriviaSection from '@/components/actors/TriviaSection.vue';
import RelationshipsSection from '@/components/actors/RelationshipsSection.vue';
import ActorRelatedNews from '@/components/actors/ActorRelatedNews.vue';

// Import Data Logic
import { getActorById, getActorRelatedNews } from '@/data/actors';

const route = useRoute();
const router = useRouter();

// Handle route params safely (can be string or array)
const actorId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

// Fetch Data
const actor = getActorById(actorId);
const relatedNews = actor ? getActorRelatedNews(actor.id) : [];

// Convert relationship startYear from number to string
const normalizedRelationships = computed(() => {
  if (!actor?.relationships) return [];
  return actor.relationships.map(rel => ({
    ...rel,
    startYear: String(rel.startYear)
  }));
});

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navigation />

    <div v-if="!actor" class="pt-32 pb-16 text-center">
      <h1 class="text-2xl font-display text-foreground mb-4">Actor Not Found</h1>
      <p class="text-muted-foreground mb-8">
        The actor you're looking for doesn't exist in our database.
      </p>
      <Button @click="goHome">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Home
      </Button>
    </div>

    <div v-else>
      <div class="pt-24 px-4">
        <div class="container mx-auto max-w-7xl">
          <div class="animate-in fade-in slide-in-from-left-5 duration-500">
            <button
              @click="goBack"
              class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft class="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>

      <ActorHeader :actor="actor" />

      <div class="px-4 pb-16">
        <div class="container mx-auto max-w-7xl space-y-12"> 
          
          <ActorBiography :biography="actor.biography" />

          <ActorFilmography :credits="actor.knownFor" title="Known For" />

          <ActorFilmography :credits="actor.filmography" title="Filmography" />

          <AwardsSection :awards="actor.awards" />

          <DidYouKnow :facts="actor.didYouKnow" />

          <TriviaSection :trivia="actor.trivia" />

          <RelationshipsSection :relationships="normalizedRelationships" />

          <ActorRelatedNews :news="relatedNews" :actorName="actor.name" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>