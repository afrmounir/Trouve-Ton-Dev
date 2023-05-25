import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
       userId: ''
    }
  },
  getters: {
    getUserId: (state) => state.userId
  },
  actions: {
  }
})
