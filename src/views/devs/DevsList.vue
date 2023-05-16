<script setup>
import { storeToRefs } from 'pinia'
import { useDevsStore } from '../../stores/devs'
import DevItem from '../../components/devs/DevItem.vue'

const store = useDevsStore()
const { hasDevs, filteredDevs } = storeToRefs(store)
</script>

<template>
  <section>FILTRER</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Rafraîchir</base-button>
        <base-button to="/register" link mode="flat">S'enregistrer</base-button>
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
