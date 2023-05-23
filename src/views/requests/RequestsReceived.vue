<script>
import { useRequestsStore } from '../../stores/requests'
import { useDevsStore } from '../../stores/devs'
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem
  },
  setup() {
    return {
      requestStore: useRequestsStore(),
      devStore: useDevsStore()
    }
  },
  data() {
    return {
      API_URL: import.meta.env.VITE_BASE_URL,
      isLoading: false,
      error: null
    }
  },
  computed: {
    receivedRequests() {
      return this.requestStore.getRequests
    },
    hasRequests() {
      return this.requestStore.hasRequests
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        await this.devStore.fetchDevs(this.API_URL)
        await this.requestStore.fetchRequests(this.API_URL)
        this.isLoading = false
      } catch (error) {
        this.error = error.message || "Quelque chose s'est mal passé... "
      }
    },
    getDev(devId) {
      const dev = this.devStore.getDevById(devId)
      return `${dev.firstName} ${dev.lastName}`
    },
    handleError() {
      this.error = null
    }
  },
  created() {
    this.loadRequests()
  }
}
</script>

<template>
  <base-dialog :show="!!this.error" title="Une erreur est survenue" @close="handleError">
    <p>{{ this.error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Demandes reçues</h2>
      </header>
      <base-spinner v-if="this.isLoading"></base-spinner>
      <template v-else-if="hasRequests">
        <ul v-for="requestsByDev in receivedRequests" :key="requestsByDev.id">
          <h3>Pour: {{ getDev(requestsByDev.devId) }}</h3>
          <base-card v-for="request in requestsByDev.requests" :key="request">
            <RequestItem v-bind="request[1]"></RequestItem>
          </base-card>
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
