<script>
import { useRequestsStore } from '../../stores/requests'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  setup() {
    return {
      v$: useVuelidate(),
      store: useRequestsStore()
    }
  },
  data() {
    return {
      email: '',
      message: ''
    }
  },
  validations() {
    return {
      email: { required, email },
      message: { required, minLength: minLength(20) }
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      const devId = this.$router.currentRoute.value.params.id;

      if (isFormCorrect) {
        const formData = {
          devId,
          email: this.email,
          message: this.message
        }

        this.store.contactDev(formData)
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ error: v$.email.$error }">
      <label for="email">Votre E-mail</label>
      <input type="email" id="lastname" v-model.trim="email" />
      <p v-if="v$.email.$error">Veuillez entrez un email</p>
    </div>
    <div class="form-control" :class="{ error: v$.message.$error }">
      <label for="message">message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
      <p v-if="v$.message.$error">Veuillez entrez un message</p>
    </div>
    <div class="actions">
      <base-button>Envoyer un message</base-button>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.error {
  color: red;
}

.error input,
.error textarea {
  border: 1px solid rgb(199, 199, 199);
  border-color: red;
}

.actions {
  text-align: center;
}
</style>
