<script setup>
  import { useTaskStore } from '../stores/TaskStore';

  const taskStore = useTaskStore()
  defineProps({
    task: 'task'
  })
</script>

<template>
  <div class="task">
    <div
      class="title"
      :class="task.isCompleted ? 'completed' : ''"
      @click="taskStore.toggleCompleted(task.id)"
    >
      {{ task.title }}
    </div>
    <div class="actions">
      <div class="delete">
        <i
          class="material-icons"
          @click="taskStore.deleteTask(task.id)"
        >
          delete
        </i>
      </div>
      <div class="react">
        <i
          class="material-icons"
          :class="task.isFavorite ? 'favorite' : ''"
          @click="taskStore.toggleFavorite(task.id)"
        >
          favorite
        </i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .task {
    display: flex;
    justify-content: space-between;
    .title {
      cursor: pointer;
    }
    .completed {
      color: rgb(38 48 55 / 40%);
    }
    .actions {
      display: flex;
      gap: 0.25rem;
      color: rgb(38 48 55 / 40%);
      .delete, .react {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;
        i {
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.5s ease-in-out;
        }
        .favorite {
          color: rgb(255 99 71 / 90%);
        }
      }
      .delete:hover {
        i {
          color: rgb(220 20 60 / 80%);
        }
      }
      .react:hover {
        i {
          color: rgb(255 99 71 / 90%);
        }
      }
    }
  }
</style>
