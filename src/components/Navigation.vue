<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {
  Search,
  Menu,
  X,
  Bookmark,
  Film,
  Compass,
  Home,
  Newspaper,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { useWatchlistStore } from "@/stores/watchlist";

const route = useRoute();
const watchlistStore = useWatchlistStore(); // <--- FIX: Do not destructure here

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Discover", path: "/discover", icon: Compass },
  { label: "News", path: "/news", icon: Newspaper },
  { label: "Search", path: "/search", icon: Search },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);
</script>

<template>
  <header
    :class="
      cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-gradient-to-b from-background/80 to-transparent py-5',
      )
    "
  >
    <nav
      class="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between"
    >
      <RouterLink to="/" class="flex items-center gap-2">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
        >
          <Film class="w-5 h-5 text-primary-foreground" />
        </div>
        <span
          class="text-xl font-display tracking-wider text-foreground hidden sm:block"
        >
          cinegraph
        </span>
      </RouterLink>

      <div class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="
            cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              route.path === link.path
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
            )
          "
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <RouterLink
          to="/watchlist"
          :class="
            cn(
              'relative p-2.5 rounded-lg transition-all duration-200',
              route.path === '/watchlist'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
            )
          "
        >
          <Bookmark class="w-5 h-5" />
          <span
            v-if="watchlistStore.watchlist.length > 0"
            class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
          >
            {{ watchlistStore.watchlist.length }}
          </span>
        </RouterLink>

        <RouterLink
          to="/search"
          class="md:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <Search class="w-5 h-5" />
        </RouterLink>

        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </nav>
  </header>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform -translate-y-5 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-5 opacity-0"
  >
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-x-0 top-[72px] z-40 md:hidden"
    >
      <div
        class="bg-background/95 backdrop-blur-xl border-b border-white/10 p-4"
      >
        <div class="flex flex-col gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                route.path === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
              )
            "
          >
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.label }}
          </RouterLink>

          <RouterLink
            to="/watchlist"
            :class="
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                route.path === '/watchlist'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
              )
            "
          >
            <Bookmark class="w-5 h-5" />
            Watchlist
            <span
              v-if="watchlistStore.watchlist.length > 0"
              class="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full"
            >
              {{ watchlistStore.watchlist.length }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>
