<template>
  <div :class= "[task.reminder ? 'reminder': '', 'task']">
    <h3>{{ task.text }} 
       <!-- onDelete needs to pass in task.id to individualize which task will be deleted -->
      <i @click="onDelete(task.id, task.reminder)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.day }} </p>

  </div>
</template>

<script>
  export default {
    name: 'Task',
    props: {
      task:Object
    },
    methods: {
      onDelete(id, reminder){
        console.log(id, reminder)
        // Pushing to the next level which is Tasks.vue
        this.$emit('delete-task', id, reminder)
      }
    }
  }
</script>

<style scoped>
.task {
  background: #f4f4f4;
  margin: 5px 20px;
  padding: 8px 20px;
  cursor: pointer;
}

.task.reminder{
  border-left: 5px solid green;
}

.task h3{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fas {
  color: #bb3318;
}

.task p{
  display: flex;
  align-items: center;
}
</style>