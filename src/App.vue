<template>
  <div class="container">
    <!-- @ is the click event for the Add Task Button, :showAddTask passes in a prop to the Header component to update the button -->
    <Header @show-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
    <div v-if="showAddTask">
      <!--showAddTask which then applies a calling method addTask -->
      <AddTask @add-task="addTask" />
    </div>
    <!-- Now at top level where data is present we need to create the method deleteTask below -->
    <Tasks @toggle-reminder="toggleReminder" v-on:delete-task="deleteTask"  :tasks="tasks" />
  </div>  
</template>

<script>
import Header from './components/Header.vue'
import Tasks from './components/Tasks.vue'
import AddTask from './components/AddTask.vue'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data () {
    return {
      tasks: [],
      showAddTask: false
    }
  },
  methods: {
    // Passing in the new task from AddTask and adding it to the array of tasks []
     async addTask(task){
      //  Make request and POST to db.json - tasks
      const response = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(task)
      })
      // After sending we get the response of the task back
      const data = await response.json() 
      // Before: this.tasks = [...this.tasks, task]
      // After: now that we added json-server we place data after ...this.tasks so this.tasks gets update with both original and new task (data)
      this.tasks = [...this.tasks, data]
    },

    deleteTask(id, reminder){
      console.log('task', id, reminder);
      if(reminder == false){
        if(confirm('Are you sure?')){
          this.tasks = this.tasks.filter((task) => task.id !== id)
        }
      }
      else
        if(confirm('FYI, You still have a reminder set, Double-Click to unset your Reminder')){
          this.tasks = this.tasks.filter((task) => task.id !== id)
        }
    },

    toggleReminder(id){
      // Check to see if we get id printed to console when we double-click on entry
      console.log(id)
      // Updating each tasks to a true or false of if a reminder is set. Using Map to go through the array, and return updated tasks (55:30 on video)
      this.tasks = this.tasks.map((task) => 
        task.id === id ? {...task, reminder: !task.reminder} : task)   
    },

    toggleAddTask() {
      // Setting to the opposite of what it is set to so it toggles. 
      this.showAddTask = !this.showAddTask
    },

    async fetchTasks() {
      const response = await fetch('api/tasks')
      // Before:  const response = await fetch('http://localhost:5000/tasks') but we added a proxy so we are able to use 
      const data = await response.json()
      console.log(data)
      return data;
    },
    // To fetch a single task
    async fetchTask(id) {
      const response = await fetch(`api/tasks/${id}`)

      const data = await response.json()
      console.log(data)
      return data;
    }
  },
  async created() {
    this.tasks = await this.fetchTasks()
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
