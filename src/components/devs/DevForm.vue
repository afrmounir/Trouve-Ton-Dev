<script>
import { useVuelidate } from '@vuelidate/core'
import { required, integer, minLength } from '@vuelidate/validators'

const isPositiveInt = (value) => value > 0

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  emits: ['update-dev-areas'],
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
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: null,
      devAreas: []
    }
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      description: { required, minLength: minLength(20) },
      hourlyRate: { required, integer, isPositiveInt },
      devAreas: { required, minLength: minLength(1) }
    }
  },
  methods: {
    setAreas(event) {
      const { id, checked } = event.target

      if (checked) {
        this.devAreas.push(id)
      } else {
        const index = this.devAreas.findIndex((area) => area === id)
        this.devAreas.splice(index, 1)
      }
    },
    isActive(area) {
      return this.devAreas.includes(area)
    },
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()

      if (isFormCorrect) {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          areas: this.devAreas,
          description: this.description,
          hourlyRate: this.hourlyRate
        }
        this.$emit('update-dev-areas', formData)
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ error: v$.firstName.$error }">
      <label for="firstname">Prénom</label>
      <input type="text" id="firstname" v-model.trim="firstName" />
      <p v-if="v$.firstName.$error">Veuillez entrez un prénom</p>
    </div>
    <div class="form-control" :class="{ error: v$.lastName.$error }">
      <label for="firstname">Nom</label>
      <input type="text" id="lastname" v-model.trim="lastName" />
      <p v-if="v$.lastName.$error">Veuillez entrez un nom</p>
    </div>
    <div class="form-control" :class="{ error: v$.description.$error }">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description"></textarea>
      <p v-if="v$.description.$error">Veuillez entrez une description (minimum 20 caractères)</p>
    </div>
    <div class="form-control" :class="{ error: v$.hourlyRate.$error }">
      <label for="rate">Taux Horaire</label>
      <input type="number" id="rate" v-model="hourlyRate" />
      <p v-if="v$.hourlyRate.$error">Veuillez entrez un taux horaire (nombre entier positif)</p>
    </div>
    <div class="form-control" :class="{ error: v$.devAreas.$error }">
      <h3>Stack Technique</h3>
      <template v-for="area in areas" :key="area">
        <span class="filter-option" :class="{ active: this.isActive(area) }">
          <input type="checkbox" :id="area" @change="setAreas" />
          <label :for="area">{{ area }}</label>
        </span>
      </template>
      <p v-if="v$.devAreas.$error">Veuillez choisir au moins une technologie</p>
      <base-button id="submit-btn">Enregistrer</base-button>
    </div>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
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

#submit-btn {
  margin-top: 10px;
}

.error {
  color: red;
}

.error input,
.error textarea {
  border: 1px solid rgb(199, 199, 199);
  border-color: red;
}
</style>
