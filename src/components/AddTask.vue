<template>
  <form @submit="onSubmit" class="add-form">

    <div class="form-control">
      <label>Task</label>
      <!--  Binding values to inputs -->
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input type="text" v-model="day" placeholder="Add Day & Time" name="day" />
    </div>
   
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />

  </form>
</template>

<script>
  export default{
    name: 'AddTask',
    data() {
      return {
        text: '',
        day: '',
        reminder:false
      }
    },
    methods: {
      onSubmit(e) {
        // always set the prevent default
        e.preventDefault()
        // Making sure that text field is not blank
        if(!this.text){
          alert('Please add a task')
          return
        }
        // If field is not blank then Create a new task
        const newTask = {
          // Don't need id: below because JSON-serve adds an UUID to each task added.
          // id: Math.floor(Math.random() *1000),
          text: this.text,
          day: this.day,
          reminder: this.reminder
        }
        console.log(newTask)
        // Send this up to App.vue 
        this.$emit('add-task', newTask)
        // Then after the task as been created we are going to clear the form
        this.text = ''
        this.day = ''
        this.reminder = false
      }
    }
  }
</script>

<style scoped>
.add-form {
  margin-bottom: 2.25rem;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 90%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 1rem;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
.btn{
  width: 60%;
  display: inline-block;
}
</style>

