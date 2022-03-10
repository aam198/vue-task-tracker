<template>
  <div class="container">
    <Header title="Task Tracker" />
    <!-- Now at top level where data is present we need to create the method deleteTask below -->
    <Tasks v-on:delete-task="deleteTask"  :tasks="tasks" />
  </div>  
</template>

<script>
import Header from './components/Header.vue'
import Tasks from './components/Tasks.vue'

export default {
  name: 'App',
  components: {
    Header,
    Tasks
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    deleteTask(id, reminder){
      console.log('task', id, reminder);
      if(reminder == false){
        if(confirm('Are you sure?')){
          this.tasks = this.tasks.filter((task) => task.id !== id)
        }
      }
      else
        if(confirm('FYI, You still have a reminder set')){
          this.tasks = this.tasks.filter((task) => task.id !== id)
        }
    }
  },
  created() {
    this.tasks = [
      {
        id:1,
        text: 'Doc Appt',
        day: 'March 1st at 2:30pm',
        reminder: true,
      },
      {
        id:2,
        text: 'Hair Appt',
        day: 'March 3st at 2:30pm',
        reminder: false,
      },
      {
        id:3,
        text: 'Work Appt',
        day: 'March 10st at 2:30pm',
        reminder: true,
      },
    ]
  }
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
  border: 1px solid #2b3f2f;
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
