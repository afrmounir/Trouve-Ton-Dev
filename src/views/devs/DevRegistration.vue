<script setup>
import { useDevsStore } from '../../stores/devs'
import DevForm from '../../components/devs/DevForm.vue'

const store = useDevsStore()

function saveData(devData) {
  const API_URL = import.meta.env.VITE_BASE_URL
  store.registerDev(devData, API_URL)
}
</script>

<template>
  <section>
    <base-card>
      <h2>Enregistrer un Dev</h2>
      <DevForm @update-dev-areas="saveData"></DevForm>
    </base-card>
  </section>
</template>
