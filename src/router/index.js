import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

import DevsList from '../views/devs/DevsList.vue'
import DevDetails from '../views/devs/DevDetails.vue'
import ContactDev from '../views/requests/ContactDev.vue'
import DevRegistration from '../views/devs/DevRegistration.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import UserLogin from '../views/auth/UserLogin.vue';
import UserSignup from '../views/auth/UserSignup.vue';
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'devs' },
    { name: 'devs', path: '/devs', component: DevsList },
    {
      path: '/devs/:id', component: DevDetails, props: true, children: [
        { path: 'contact', component: ContactDev }
      ]
    },
    { path: '/register', component: DevRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { name: 'login', path: '/login', component: UserLogin, meta: { requiresUnAuth: true } },
    { path: '/signup', component: UserSignup },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticate) {
    return 'login'
  } else if (to.meta.requiresUnAuth && authStore.isAuthenticate) {
    return 'devs'
  } else {
    return
  }
});

export default router
