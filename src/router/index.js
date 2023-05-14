import { createRouter, createWebHistory } from 'vue-router'

import DevsList from '../views/devs/DevsList.vue'
import DevDetails from '../views/devs/DevDetails.vue'
import ContactDev from '../views/requests/ContactDev.vue'
import DevRegistration from '../views/devs/DevRegistration.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import NotFound from '../views/NotFound.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'devs' },
    { path: '/devs', component: DevsList },
    {
      path: '/devs/:id', component: DevDetails, props: true, children: [
        { path: 'contact', component: ContactDev }
      ]
    },
    { path: '/register', component: DevRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
