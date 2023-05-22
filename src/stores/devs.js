import { defineStore } from 'pinia'

export const useDevsStore = defineStore('devs', {
  state: () => {
    return {
      devs: []
    }
  },
  getters: {
    getDevs: (state) => state.devs,
    hasDevs: (state) => state.devs && state.devs.length > 0
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

      const response = await fetch(API_URL + `devs/${devId}.json`, {
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
    async fetchDevs(API_URL) {
      const response = await fetch(API_URL);
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
    },
    getDevById(id) {
      const dev = this.devs.find(dev => dev.id === id);
      return dev;
    }
  }
})
