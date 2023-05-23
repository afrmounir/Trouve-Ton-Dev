<script setup>
import { computed } from 'vue'
import { useDevsStore } from '../../stores/devs'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useDevsStore()
const props = defineProps({ id: String })

const selectedDev = store.getDevs.find((dev) => dev.id === props.id)

const fullName = computed(() => `${selectedDev.firstName} ${selectedDev.lastName}`)
const devContactLink = computed(() => `${route.path}/contact`)
const areas = computed(() => selectedDev.areas)
const hourlyRate = computed(() => selectedDev.hourlyRate)
const description = computed(() => selectedDev.description)
</script>

<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>Taux Horaire: {{ hourlyRate }}€</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Intéressé? Entrez immédiatement en contact!</h2>
          <base-button link :to="`${devContactLink}`">Contactez ce développeur</base-button>
        </header>
        <RouterView></RouterView>
      </base-card>
    </section>
  </div>
</template>
