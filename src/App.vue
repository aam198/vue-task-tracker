<template>
  <div class="container">
    <!-- @ is the click event for the Add Task Button, :showAddTask passes in a prop to the Header component to update the button -->
    <Header @show-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
    
    <router-view :showAddTask="showAddTask"></router-view>
    <Footer />
  </div>  
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      showAddTask: false,
    }
  },
  methods: {
    
    toggleAddTask() {
      // Setting to the opposite of what it is set to so it toggles. 
      this.showAddTask = !this.showAddTask
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b3f2f;
  margin-top: 60px;
}

.container{
  max-width: 500px;
  margin: 30px auto;
  overflow:auto;
  min-height: 300px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
  border-radius: 5px;
  padding-bottom: 1rem;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border:none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus{
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%
}

</style>
