<script setup>
import { storeToRefs } from 'pinia'
import { useDevsStore } from '../../stores/devs'
import DevItem from '../../components/devs/DevItem.vue'
import DevFilter from '../../components/devs/DevFilter.vue'
import { computed } from 'vue'

const store = useDevsStore()
const { hasDevs, getDevs } = storeToRefs(store)

loadDevs();

let activeFilters = []

let filteredDevs = computed(() => {
  return getDevs.value.filter((dev) => dev.areas.some(area => activeFilters.includes(area)))
})

function setFilters(updatedFilters) {
  activeFilters = updatedFilters
}

function loadDevs() {
  const API_URL = import.meta.env.VITE_BASE_URL
  store.fetchDevs(API_URL + "devs.json")
}
</script>

<template>
  <section>
    <DevFilter @update-filter="setFilters"></DevFilter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadDevs">Rafraîchir</base-button>
        <base-button to="/register" link mode="flat">Enregistrer un Dev</base-button>
      </div>
      <ul v-if="hasDevs">
        <DevItem v-for="dev in filteredDevs" :key="dev.id" v-bind="dev"></DevItem>
      </ul>
      <h3 v-else>Impossible de charger la liste des devs...</h3>
    </base-card>
  </section>
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
