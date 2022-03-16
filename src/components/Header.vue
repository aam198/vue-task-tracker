<template>
  <header>  
    <h1>{{ title }}</h1>
    <!-- if showAddTask is True (or open) set the text to Close, if not, set text to Add Task -->
    <Button v-show="homePage" @btn-click="$emit('show-add-task')" :text = "showAddTask ? 'Close' : 'Add Task'" :color = "showAddTask ? '#bb3318' : '#268571' " />
    <!-- Add Delete All Tasks? -->
    <!-- <Button text = "Delete Task" color = "#bb3318" /> -->
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
  },
  computed: {
    // Function for the button to know that when we are not on the home page or path '/' then we return false
    homePage() {
      if(this.$route.path === '/'){
        return true
      }
      else {
        return false
      }
    }
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
    padding: 0px 1rem;
  }
</style>