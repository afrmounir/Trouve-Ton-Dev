<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      mode: 'login'
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(5) },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) }
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()

      if (isFormCorrect) {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        console.log(formData)
        //send http request
      }
    }
  }
}
</script>

<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ error: v$.email.$error }">
        <label for="email">E-Mail</label>
        <input type="email" id="email" name="email" v-model.trim="email" />
        <p v-if="v$.email.$error">Veuillez entrez un email</p>
      </div>
      <div class="form-control" :class="{ error: v$.password.$error }">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" v-model.trim="password" />
        <p v-if="v$.password.$error">Veuillez entrez un mot de passe d'au moins 5 caractères</p>
      </div>
      <div class="form-control" :class="{ error: v$.confirmPassword.$error }">
        <label for="confirm-password">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          v-model.trim="confirmPassword"
        />
        <p v-if="v$.confirmPassword.$error">Les mots de passe doivent être identiques</p>
      </div>
      <base-button>S'enregistrer</base-button>
      <base-button link to="/login" mode="flat">Se Connecter</base-button>
    </form>
  </base-card>
</template>

<style scoped>
form {
  margin: 1rem;
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

button {
  margin-top: 10px;
}
</style>