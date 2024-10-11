import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import tourSearch from '../views/tourSearch.vue'
import hotToursSearch from "../views/hotToursSearch.vue"
import countries from "../views/countries.vue"
import reviews from "../views/reviews.vue"
import priority from "../views/priority.vue"
import about from "../views/about.vue"
import contacts from "../views/contacts.vue"
import booking from "../views/booking.vue"
import data from "../views/data.vue"
import end from "../views/end.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/tours',
        name: 'tours',
        component: tourSearch
      },
      {
        path: '/hot-tours',
        name: "hotToursSearch",
        component: hotToursSearch
      },
      {
        path: '/countries',
        name: "countries",
        component: countries
      },
      {
        path: '/reviews',
        name: "reviews",
        component: reviews
      },
      {
        path: '/priority',
        name: "priority",
        component: priority
      },
      {
        path: '/about',
        name: 'about',
        component: about
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: contacts
      },
      {
        path: '/booking',
        name: 'booking',
        component: booking
      },
      {
        path: '/booking/data',
        name: 'data',
        component: data
      },
      {
        path: '/booking/data/end',
        name: 'end',
        component: end
      }
    ],
  })

export default router