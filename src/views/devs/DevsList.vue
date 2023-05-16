<script setup>
import { storeToRefs } from 'pinia'
import { useDevsStore } from '../../stores/devs'

const store = useDevsStore()
const { hasDevs, filteredDevs } = storeToRefs(store)
</script>

<template>
  <section>FILTRER</section>
  <section>
    <div class="controls">
      <button>Rafraîchir</button>
      <RouterLink to="/register">S'enregistrer</RouterLink>
    </div>
    <ul v-if="hasDevs">
      <li v-for="dev in filteredDevs" :key="dev.id">
        {{ `${dev.firstName} ${dev.lastName} - ${dev.areas}` }}
        <br />
        {{ `${dev.description}` }}
      </li>
    </ul>
    <h3 v-else>Impossible de charger la liste des devs...</H3>
  </section>
</template>
