import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// Set up the Axios default base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Create the Vue app
const app = createApp(App);

// Use store and router
app.use(store);
app.use(router);

// Provide Axios globally
app.provide('$axios', axios);

// Mount the app
app.mount('#app');
