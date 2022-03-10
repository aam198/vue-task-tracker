<template>
  <header>  
    <h1>{{ title }}</h1>
    <Button text = "Add Task" color = "#268571" />
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