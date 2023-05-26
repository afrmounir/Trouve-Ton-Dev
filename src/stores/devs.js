import { defineStore } from 'pinia'
import { useAuthStore } from './auth';

export const useDevsStore = defineStore('devs', {
  state: () => {
    return {
      devs: [],
      lastFetch: null, //store time stamp to calculate when we refetch cache http response data 
    }
  },
  getters: {
    getDevs: (state) => state.devs,
    hasDevs: (state) => state.devs && state.devs.length > 0,
    shouldUpdate: (state) => {//should update if lastFetch is null (never updated) or if 1 minute has passed before last fetch
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true
      }

      const currentTimeStamp = new Date().getTime();

      return (currentTimeStamp - lastFetch) / 1000 > 60
    }
  },
  actions: {
    async registerDev(devData, API_URL) {
      const devId = 'd' + (this.devs.length + 1)
      const dev = {
        firstName: devData.firstName,
        lastName: devData.lastName,
        areas: devData.areas,
        description: devData.description,
        hourlyRate: devData.hourlyRate
      };

      const authStore = useAuthStore();
      const token = authStore.getToken;

      const response = await fetch(API_URL + `devs/${devId}.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify(dev)
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Impossible d\'enregistrer un dev, veuillez réessayer ultérieurement');

        throw error;
      }

      this.devs.unshift(dev);
      this.router.replace('/devs')
    },
    // async registerAlldevs(API_URL) {
    //   for (const devData of this.devs) {
    //     const dev = {
    //       firstName: devData.firstName,
    //       lastName: devData.lastName,
    //       areas: devData.areas,
    //       description: devData.description,
    //       hourlyRate: devData.hourlyRate
    //     };

    //     const response = await fetch(API_URL + `devs/${devData.id}.json`, {
    //       method: 'PUT',
    //       body: JSON.stringify(dev)
    //     });
    //     if (!response.ok) {
    //       //error handling
    //     }
    //   }
    // },
    async fetchDevs(API_URL, forcedRefresh) {
      if (!forcedRefresh && !this.shouldUpdate) {
        return;
      }

      const response = await fetch(API_URL + 'devs.json');
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Impossible de récupérer la liste des devs, veuillez réessayer ultérieurement');

        throw error;
      }

      const devs = [];

      for (const key in responseData) {
        const dev = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate
        };

        devs.push(dev);
      }

      this.devs = devs;
      this.setFetchTimeStamp();
    },
    getDevById(id) {
      const dev = this.devs.find(dev => dev.id === id);
      return dev;
    },
    setFetchTimeStamp() {
      this.lastFetch = new Date().getTime();
    }
  }
})
