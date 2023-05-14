import { createRouter, createWebHistory } from 'vue-router'

import DevsList from '../views/DevsList.vue'
import DevDetails from '../views/DevDetails.vue'
import ContactDev from '../views/ContactDev.vue'
import DevRegistration from '../views/DevRegistration.vue'
import Requests from '../views/Requests.vue'
import NotFound from '../views/NotFound.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'devs' },
    { path: '/devs', component: DevsList },
    {
      path: '/devs/:id', component: DevDetails, props: true, children: [
        { path: '/contact', component: ContactDev }
      ]
    },
    { path: '/register', component: DevRegistration },
    { path: '/requests', component: Requests },
    { path: '/:notFound(.*)', component: NotFound }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
