import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    }
  },
  getters: {
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
    isAuthenticate: (state) => !!state.token
  },
  actions: {
    async login(API_URL, authData) {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      });
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error.message || 'Impossible de vous connecter, veuillez réessayer ultérieurement');

        throw error;
      }

      this.localId = responseData.localId;
      this.token = responseData.idToken;
      this.tokenExpiration = responseData.expiresIn;
    },
    async signup(API_URL, authData) {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      });
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Impossible de vous enregistrer, veuillez réessayer ultérieurement');

        throw error;
      }

      this.localId = responseData.localId;
      this.token = responseData.idToken;
      this.tokenExpiration = responseData.expiresIn;

      this.router.replace('/login');
    },
    logout() {
      this.userId = null,
      this.token = null,
      this.tokenExpiration = null

      this.router.replace('/devs');
    }
  }
})
