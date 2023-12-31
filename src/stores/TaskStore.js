import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Go to Apple Store",
        isFavorite: false,
        isCompleted: false,
      },
      {
        id: 2,
        title: "Buy an iPad",
        isFavorite: true,
        isCompleted: false,
      },
      {
        id: 3,
        title: "Get an Apple Pencil",
        isFavorite: false,
        isCompleted: true,
      }
    ],
    name: 'Uzzwal',
  }),
  getters: {
    favorite() {
      return this.tasks.filter(t => t.isFavorite)
    },
    totalFavorite() {
      return this.tasks.reduce((previous, current) => {
        return current.isFavorite ? previous + 1 : previous
      }, 0)
    },
    completed() {
      return this.tasks.filter(t => t.isCompleted)
    },
    totalCompleted() {
      return this.tasks.reduce((previous, current) => {
        return current.isCompleted ? previous + 1 : previous
      }, 0)
    },
    total: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => {
        return t.id !== id
      })
    },
    toggleFavorite(id) {
      const task = this.tasks.find(t => t.id === id)
      task.isFavorite = !task.isFavorite
    },
    toggleCompleted(id) {
      const task = this.tasks.find(t => t.id === id)
      task.isCompleted = !task.isCompleted
    }
  }
})
