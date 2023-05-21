<script>
import { useRequestsStore } from '../../stores/requests'
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem
  },
  setup() {
    return {
      store: useRequestsStore()
    }
  },
  computed: {
    receivedRequests() {
      return this.store.getRequests
    },
    hasRequests() {
      return this.store.hasRequests
    }
  }
}
</script>

<template>
  <section>
    <base-card>
      <header>
        <h2>Demandes reçues</h2>
      </header>
      <template v-if="hasRequests">
        <ul v-for="request in receivedRequests" :key="request.id">
          <RequestItem v-bind="request"></RequestItem>
        </ul>
      </template>
      <h3 v-else>Vous n'avez pas encore reçu de demande. Revenez plus tard.</h3>
    </base-card>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
