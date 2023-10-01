<script setup>
  import { ref } from 'vue';
  import TaskDetails from './components/TaskDetails.vue'
  import { useTaskStore } from './stores/TaskStore';
  const taskStore = useTaskStore()
  const filtered = ref('all')
  const modalActive = ref(false)
  const newTask = ref('')

  const showModal = () => {
    modalActive.value = true
  }
  const hideModal = () => {
    modalActive.value = false
  }

  const handleAddTask = () => {
    if(newTask.value.length > 0) {
      taskStore.addTask({
        id: taskStore.tasks.length + 1,
        title: newTask.value,
        isFavorite: false
      })
    } else {
      console.log('Nothing to add !!')
    }
    newTask.value = ''
    modalActive.value = false
  }
</script>

<template>
  <main>
    <header>
      <h1>{{ taskStore.name }}'s Tasks</h1>
      <div class="addTask" @click="showModal"><i class="material-icons">playlist_add</i></div>
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

    <!-- Modal -->
    <div v-if="modalActive" class="modal">
      <div class="body">
        <div class="action" @click="hideModal"><i class="material-icons">cancel</i></div>
        <form @submit.prevent="handleAddTask">
          <input type="text" v-model="newTask" placeholder="What to do?">
          <button @click="addTask"><i class="material-icons">add</i></button>
        </form>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        font-size: 1.5rem;
      }
      .addTask {
        display: flex;
        transition: 0.5s;
      }
      .addTask:hover {
        cursor: pointer;
        color: RGB(21, 195, 154);
        transform: scale(1.5);
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
    .modal {
      position: absolute;
      background: rgb(0 0 0 / 75%);
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .body {
        position: relative;
        background: white;
        padding: 1.5rem;
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        transition: 2s;
        .action {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(220 20 60 / 80%);
            background: #fff;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            transition: 0.5s;
          }
          i:hover {
            cursor: pointer;
            color: rgb(220 20 60 / 100%);
            transform: scale(1.4);
          }
        }
        form {
          display: flex;
          input {
            font-size: 16px;
            padding: 7px 10px;
            border: 1px solid rgb(0 0 0 / 25%);
            border-radius: 0.35rem 0 0 0.35rem;
            border-right: none;
            transition: 0.5s;
          }
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 14px;
            border-radius: 0 0.35rem 0.35rem 0;
            background: RGB(21 195 154 / 80%);
            border: none;
            color: rgb(0 0 0 / 60%);
            font-weight: 500;
            transition: all 0.5s ease-in;
            i {
              font-size: 16px;
              transition: 0.5s;
            }
          }
          button:hover {
            cursor: pointer;
            background: RGB(21 195 154 / 100%);
            i {
              color: #fff;
            }
          }
          input:focus {
            outline: none;
            border-color: RGB(21 195 154 / 90%);
          }
        }
      }
    }
  }
</style>
