import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userId: null,
      token: null,
      timer: null
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

      const expiresIn = responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('userId', responseData.localId)
      localStorage.setItem('tokenExpiration', expirationDate)

      this.timer = setTimeout(this.logout, expiresIn);

      this.userId = responseData.localId;
      this.token = responseData.idToken;
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

      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('userId', responseData.localId)

      this.userId = responseData.localId;
      this.token = responseData.idToken;

      this.router.replace('/login');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(this.$state.timer);

      this.userId = null;
      this.token = null;

      this.router.replace('/devs');
    },
    tryLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn <= 0) {
        return;
      }

      this.$state.timer = setTimeout(this.logout, expiresIn);

      if (token && userId) {
        this.token = token;
        this.userId = userId;
      }
    }
  }
})
