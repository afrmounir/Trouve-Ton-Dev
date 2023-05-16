<script>
export default {
  props: ['firstName', 'lastName', 'hourlyRate', 'areas', 'id'],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    devContactLink() {
      return `${this.$route.path}/${this.id}/contact`
    },
    devDetailsLink() {
      return `${this.$route.path}/${this.id}`
    }
  }
}
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>Taux Horaire: {{ hourlyRate }}€</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <RouterLink :to="devContactLink">Contactez ce développeur</RouterLink>
      <RouterLink :to="devDetailsLink">Voir les détails</RouterLink>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
