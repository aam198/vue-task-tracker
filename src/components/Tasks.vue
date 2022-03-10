<template>
  <!-- Take in the Task prop, the array from App.vue, and loop through and output a single task    -->

  <div :key="task.id" v-for="task in tasks" class="tasks">
    <!-- v-on:delete-task is pushing method again to now App.vue in order to delete task -->
    <Task v-on:delete-task ="$emit('delete-task', task.id, task.reminder)" :task="task"/>

  </div>
</template>


<script>
import Task from './Task'

  export default{
    name: 'Tasks',
    props: {
      tasks: Array
    },
    components: {
      Task
    },
    emits: ['delete-task']
  }
</script>
