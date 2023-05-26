<script setup>
import { storeToRefs } from 'pinia'
import { useDevsStore } from '../../stores/devs'
import { useAuthStore } from '../../stores/auth'
import DevItem from '../../components/devs/DevItem.vue'
import DevFilter from '../../components/devs/DevFilter.vue'
import { computed } from 'vue'
import { reactive } from 'vue'

const store = useDevsStore()
const authStore = useAuthStore()
const { hasDevs, getDevs } = storeToRefs(store)
const state = reactive({
  isLoading: false,
  error: null
})

const isLoggedIn = computed(() => authStore.isAuthenticate)

loadDevs()

let activeFilters = []

let filteredDevs = computed(() => {
  return getDevs.value.filter((dev) => dev.areas.some((area) => activeFilters.includes(area)))
})

function setFilters(updatedFilters) {
  activeFilters = updatedFilters
}

async function loadDevs(forcedRefresh = false) {
  state.isLoading = true
  try {
    const API_URL = import.meta.env.VITE_BASE_URL
    await store.fetchDevs(API_URL, forcedRefresh)
    state.isLoading = false
  } catch (error) {
    state.error = error.message || "Quelque chose s'est mal passé... "
  }
}

function handleError() {
  state.error = null
}
</script>

<template>
  <div>
    <base-dialog :show="!!state.error" title="Une erreur est survenue" @close="handleError">
      <p>{{ state.error }}</p>
    </base-dialog>
    <section>
      <DevFilter @update-filter="setFilters"></DevFilter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadDevs(true)">Rafraîchir</base-button>
          <base-button v-if="!isLoggedIn" to="/login" link mode="flat">Se connecter pour enregistrer un dev</base-button>
          <base-button v-if="isLoggedIn" to="/register" link mode="flat">Enregistrer un Dev</base-button>
        </div>
        <base-spinner v-if="state.isLoading"></base-spinner>
        <ul v-else-if="hasDevs">
          <DevItem v-for="dev in filteredDevs" :key="dev.id" v-bind="dev"></DevItem>
        </ul>
        <h3 v-else>Impossible de charger la liste des devs...</h3>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
