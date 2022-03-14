<template>
  <button @click="onClick()" :style = "{background: color}" class="btn">{{ text }}</button>
</template>


<script>
  export default {
    name: 'Button', 
    props: {
      text: String,
      color: String
    },
    methods: {
      onClick() {
        console.log('click')
        // Sending up the click event
        this.$emit('btn-click')
      }
    }
  } 

</script>
