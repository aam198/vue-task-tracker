import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Main entry into the App 

createApp(App)
  .use(router)
  .mount('#app')
