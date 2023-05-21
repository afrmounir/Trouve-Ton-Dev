import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', {
  state: () => {
    return {
      requests: []
    }
  },
  getters: {
    getRequests: (state) => state.requests,
    hasDevs: (state) => state.requests && state.requests.length > 0
  },
  actions: {
    addRequest(requestData) {
      this.requests.unshift(requestData);
      this.router.replace('/devs');
    },
    contactDev(contactForm) {
      const newRequest = {
        id: new Date().toISOString,
        devId: contactForm.devId,
        userEmail: contactForm.email,
        userMessage: contactForm.message
      };
      this.addRequest(newRequest);
    }
  }
})
