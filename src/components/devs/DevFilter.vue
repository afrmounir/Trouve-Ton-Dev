<script>
export default {
  emits: ['update-filter'],
  data() {
    return {
      areas: [
        'Node.js',
        'Vue.js',
        'Angular',
        'Python',
        'React',
        'Kafka',
        'Java',
        'C#',
        'Ruby',
        'Swift',
        'PHP',
        'JavaScript',
        'C++'
      ],
      filters: []
    }
  },
  methods: {
    setFilter(event) {
      const { id, checked } = event.target

      if (checked) {
        this.filters.push(id)
      } else {
        const index = this.filters.findIndex((area) => area === id)
        this.filters.splice(index, 1)
      }

      this.$emit('update-filter', this.filters)
    },
    isActive(area) {
      return this.filters.includes(area)
    },
    clearFilters() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
      this.filters.splice(0, this.filters.length)
    }
  },
  created() {
    this.filters = [...this.areas]
    this.$emit('update-filter', this.filters)
  }
}
</script>

<template>
  <base-card>
    <h2>Trouve Ton Dev</h2>
    <template v-for="area in areas" :key="area">
      <span class="filter-option" :class="{ active: this.isActive(area) }">
        <input type="checkbox" :id="area" checked @change="setFilter" />
        <label :for="area">{{ area }}</label>
      </span>
    </template>
    <base-button @click="clearFilters" mode="flat" id="clear-filter-btn"
      >Décochez tout les filtres</base-button
    >
  </base-card>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

#clear-filter-btn {
  color: black;
  margin-top: 10px;
}
</style>
