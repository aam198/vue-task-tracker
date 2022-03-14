<template>
  <header>  
    <h1>{{ title }}</h1>
    <!-- if showAddTask is True (or open) set the text to Close, if not, set text to Add Task -->
    <Button @btn-click="$emit('show-add-task')" :text = "showAddTask ? 'Close' : 'Add Task'" :color = "showAddTask ? '#bb3318' : '#268571' " />
    <Button text = "Update Task" color = "#fcb419" />
    <Button text = "Delete Task" color = "#bb3318" />
  </header>
</template>

<script>
import Button from './Button'

export default {
  name: 'Header',
  props: {
    title: String,
    showAddTask:Boolean
  },
  components: {
    Button
  }
}

</script>


<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #efcf8d;
  }
</style>