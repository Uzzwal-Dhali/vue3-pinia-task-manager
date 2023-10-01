<script setup>
  import { ref } from 'vue';
  import TaskDetails from './components/TaskDetails.vue'
  import { useTaskStore } from './stores/TaskStore';
  const taskStore = useTaskStore()
  const filtered = ref('all')

</script>

<template>
  <main>
    <header>
      <h1>{{ taskStore.name }}'s Tasks</h1>
    </header>
    <nav>
      <button @click="filtered = 'all'" :class="filtered === 'all' ? 'active' : ''">All ({{ taskStore.total }})</button>
      <button @click="filtered = 'favorite'" :class="filtered === 'favorite' ? 'active' : ''">Favorite ({{ taskStore.totalFavorite }})</button>
    </nav>

    <div class="tasks" v-if="filtered === 'all'">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <div class="tasks" v-if="filtered === 'favorite'">
      <!-- Favorite Tasks -->
      <div v-for="task in taskStore.favorite">
        <TaskDetails :task="task"/>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    background: #fff;
    width: 90vw;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 1.2rem;
    header {
      margin-bottom: 0.25rem;
      h1 {
        font-size: 1.5rem;
      }
    }
    nav {
      display: flex;
      gap: 0.15rem;
      margin-bottom: 0.65rem;
      button {
        font-weight: 500;
        padding: 0.2rem 0.75rem;
        background: rgb(0 0 0 / 35%);
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        color: white;
        transition: background 0.5s ease-in-out;
      }
      button:hover {
        background: rgb(255 145 145 / 100%);
      }
      .active {
        background: rgb(255 145 145 / 100%);

      }
    }
    .tasks {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  }
</style>
