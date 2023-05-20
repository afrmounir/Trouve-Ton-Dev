<script setup>
import { useDevsStore } from '../../stores/devs'
import DevForm from '../../components/devs/DevForm.vue'

const store = useDevsStore()

function saveData(devData) {
  store.registerDev(devData)
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
