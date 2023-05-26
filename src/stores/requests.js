import { defineStore } from 'pinia'
import { useAuthStore } from './auth';

export const useRequestsStore = defineStore('requests', {
  state: () => {
    return {
      requests: []
    }
  },
  getters: {
    getRequests: (state) => state.requests,
    hasRequests: (state) => state.requests && state.requests.length > 0
  },
  actions: {
    async contactDev(contactForm, API_URL) {
      const newRequest = {
        userEmail: contactForm.email,
        userMessage: contactForm.message
      };

      const response = await fetch(API_URL + `requests/${contactForm.devId}.json`, {
        method: 'POST',
        body: JSON.stringify(newRequest)
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Impossible d\'envoyer une demande, veuillez réessayer ultérieurement');
        throw error;
      }

      newRequest.id = responseData.name;
      newRequest.devId = contactForm.devId

      this.router.replace('/requests');
    },
    async fetchRequests(API_URL) {
      const authStore = useAuthStore();
      const token = authStore.getToken;
      const response = await fetch(`${API_URL}requests.json?auth=${token}`);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Impossible de récupérer les demandes, veuillez réessayer ultérieurement');
        throw error;
      }

      const requests = [];

      for (const key in responseData) {
        const requestsForThisDev = Object.entries(responseData[key]);
        const requestsByDev = {
          devId: key,
          requests: requestsForThisDev
        }
        requests.push(requestsByDev);
      }
      this.requests = [...requests];
    }
  }
})
