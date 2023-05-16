import { defineStore } from 'pinia'

export const useDevsStore = defineStore('devs', {
  state: () => {
    return {
      devs: [
        {
          "id": "d1",
          "firstName": "Lucie",
          "lastName": "Martin",
          "areas": ["Node.js", "Vue.js", "Angular", "Python"],
          "description": "Je suis Lucie et j'ai travaillé comme développeuse web freelance pendant des années. Laissez-moi vous aider dans vos projets !",
          "hourlyRate": 35
        },
        {
          "id": "d2",
          "firstName": "Pierre",
          "lastName": "Dupont",
          "areas": ["React", "Kafka", "Java", "C#"],
          "description": "Je suis Pierre, un développeur web expérimenté spécialisé dans React et Kafka. J'aime créer des applications web rapides, robustes et évolutives.",
          "hourlyRate": 40
        },
        {
          "id": "d3",
          "firstName": "Julia",
          "lastName": "Lefebvre",
          "areas": ["Node.js", "React", "Vue.js", "Ruby", "Swift"],
          "description": "Je suis Julia, une développeuse web passionnée par les technologies Node.js, React et Vue.js. Laissez-moi vous aider à créer des applications web modernes et performantes !",
          "hourlyRate": 45
        },
        {
          "id": "d4",
          "firstName": "Antoine",
          "lastName": "Girard",
          "areas": ["Node.js", "Kafka", "PHP", "JavaScript"],
          "description": "Je suis Antoine, un développeur web spécialisé dans les technologies Node.js et Kafka. Je suis passionné par la création d'applications web rapides et évolutives.",
          "hourlyRate": 35
        },
        {
          "id": "d5",
          "firstName": "Sophie",
          "lastName": "Lamoureux",
          "areas": ["React", "Vue.js", "Python", "C++"],
          "description": "Je suis Sophie, une développeuse web expérimentée spécialisée dans React et Vue.js. J'aime créer des interfaces utilisateur interactives et esthétiques.",
          "hourlyRate": 40
        },
        {
          "id": "d6",
          "firstName": "Thierry",
          "lastName": "Boucher",
          "areas": ["Node.js", "Kafka", "Java", "Python"],
          "description": "Je suis Thierry, un développeur web passionné par les technologies Node.js et Kafka. Je suis spécialisé dans la création d'applications web performantes et évolutives.",
          "hourlyRate": 50
        },
        {
          "id": "d7",
          "firstName": "Caroline",
          "lastName": "Bertrand",
          "areas": ["React", "Vue.js", "PHP", "Ruby"],
          "description": "Je suis Caroline, une développeuse web expérimentée spécialisée dans React et Vue.js. Laissez-moi vous aider à créer des interfaces utilisateur modernes et esthétiques.",
          "hourlyRate": 45
        },
        {
          "id": "d8",
          "firstName": "Olivier",
          "lastName": "Rousseau",
          "areas": ["Node.js", "React", "Vue.js", "Angular", "Python", "Java", "C#", "Ruby", "Swift", "PHP", "JavaScript", "C++"],
          "description": "Je suis Olivier, un développeur web passionné par les technologies Node.js, React, Vue.js, et bien d'autres. Je suis là pour vous aider à créer des applications web exceptionnelles !",
          "hourlyRate": 50
        },
        {
          "id": "d9",
          "firstName": "Sophie",
          "lastName": "Lefèvre",
          "areas": ["React", "Python", "Java", "C++"],
          "description": "Je m'appelle Sophie et je suis spécialisée dans le développement web avec React, Python, Java et C++. Je suis passionnée par la création de solutions élégantes et performantes.",
          "hourlyRate": 40
        },
        {
          "id": "d10",
          "firstName": "Nicolas",
          "lastName": "Martin",
          "areas": ["Node.js", "Vue.js", "Ruby", "JavaScript"],
          "description": "Je suis Nicolas, un développeur web expérimenté. J'ai une expertise dans les technologies Node.js, Vue.js, Ruby et JavaScript. Je suis là pour vous aider à concrétiser vos idées.",
          "hourlyRate": 45
        },
        {
          "id": "d11",
          "firstName": "Emma",
          "lastName": "Dubois",
          "areas": ["React", "Java", "Python"],
          "description": "Bonjour, je m'appelle Emma. Je suis spécialisée dans le développement web avec React, Java et Python. Je suis passionnée par la création de belles interfaces utilisateur.",
          "hourlyRate": 35
        },
        {
          "id": "d12",
          "firstName": "Thomas",
          "lastName": "Gagnon",
          "areas": ["Node.js", "Angular", "PHP", "JavaScript"],
          "description": "Je suis Thomas, un développeur web expérimenté. J'ai une grande expertise dans les technologies Node.js, Angular, PHP et JavaScript. Je peux vous aider à réaliser vos projets web.",
          "hourlyRate": 40
        }
      ]
    }
  },
  getters: {
    filteredDevs: (state) => state.devs,
    hasDevs: (state) => state.devs && state.devs.length > 0,
    fullDevName: (state) => `${state.devs.firstName} ${state.devs.lastName}`
  }
})
