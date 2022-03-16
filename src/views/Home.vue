<template>
    <div v-if="showAddTask">
      <!--showAddTask which then applies a calling method addTask -->
      <AddTask @add-task="addTask" />
    </div>
    <!-- Now at top level where data is present we need to create the method deleteTask below -->
    <Tasks @toggle-reminder="toggleReminder" v-on:delete-task="deleteTask"  :tasks="tasks" />
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

export default {
  name: 'Home',
  props: {
    // Had to pass this in from the App.vue due to render warning (Warn: Property "showAddTask" was accessed during render but is not defined on instance.), also see end of video 
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
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

    async deleteTask(id, reminder){
      console.log('task', id, reminder);
      if(reminder == false){
        if(confirm('Are you sure you would like to delete?')){
          const response = await fetch(`api/tasks/${id}`, {
            method: 'DELETE'
          })
          // Check the status to make sure it has been deleted off the server, if it does then use the filter to delete the task.id and reset this.tasks
          response.status === 200 ?  (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting your task')
        }
      }
      else
        if(confirm('FYI, You still have a reminder set, Double-Click to unset your Reminder')){
          const response = await fetch(`api/tasks/${id}`, {
            method: 'DELETE'
          })
          response.status === 200 ?  (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting your task')
        }
    },
    // Making Async so the toggle sticks
    async toggleReminder(id){
      // Getting the specific id from fetch function below
      const taskToToggle = await this.fetchTask(id)
      // const updTask, we are creating a variable and placing  an object and then setting updTask reminder: !taskToToggle.reminder sets it to the opposite of what it is
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
      console.log({...taskToToggle})
      // Check to see if we get id printed to console when we double-click on entry
      console.log(id)
      // Send the response 
      const response = await fetch(`api/tasks/${id}`, {
        method:'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
      // Get the data back 
      const data = await response.json()
     
      this.tasks = this.tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task)   
    },

    async fetchTasks() {
      const response = await fetch('api/tasks')
      // Before:  const response = await fetch('http://localhost:5000/tasks') but we added a proxy so we are able to use 
      const data = await response.json()
      console.log(data)
      return data;
    },
    // To fetch a single task, used for toggleReminder 
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
