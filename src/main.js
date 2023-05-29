import { createApp, markRaw, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseSpinner from './components/UI/BaseSpinner.vue'
//import BaseDialog from './components/UI/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(() => import('./components/UI/BaseDialog.vue'))

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app')
