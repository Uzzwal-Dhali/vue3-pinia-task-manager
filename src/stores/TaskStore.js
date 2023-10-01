import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Go to Apple Store",
        isFavorite: false
      },
      {
        id: 2,
        title: "Buy an iPad",
        isFavorite: true
      },
      {
        id: 3,
        title: "Get an Apple Pencil",
        isFavorite: true
      }
    ],
    name: 'Uzzwal',
  }),
  getters: {
    favorite() {
      return this.tasks.filter(t => t.isFavorite)
    },
  },
})
