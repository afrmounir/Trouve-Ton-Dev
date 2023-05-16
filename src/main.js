import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)

app.mount('#app')
