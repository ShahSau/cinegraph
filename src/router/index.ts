import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    // Scrolls to top on navigation, or restores position on back button
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      // Lazy load: chunk is generated only when visited
      component: () => import('../views/MovieDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('../views/WatchlistView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/news/:id',
      name: 'news-article',
      component: () => import('../views/NewsArticleView.vue')
    },
    {
      path: '/actor/:id',
      name: 'actor-detail',
      component: () => import('../views/ActorDetailView.vue')
    },
    // Redirect unknown routes to Home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/' 
    }
  ]
})

export default router