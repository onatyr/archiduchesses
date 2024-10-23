import './styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import axios from 'axios';

const app = createApp(App);

// const baseUrl = 'http://localhost:3000/';
const baseUrl = 'http://90.40.139.106:3000'
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.use(router);
app.mount('#app');
