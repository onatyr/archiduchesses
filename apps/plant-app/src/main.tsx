import { createRoot } from 'react-dom/client'; // Named import

import App from './App';
import axios, { AxiosInstance } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Define base URL for Axios
const baseUrl: string | undefined = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance with TypeScript type
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl ?? "http://127.0.0.1:3000/",
});

console.log(axiosInstance.defaults.baseURL)

// Set up the token from localStorage if it exists
const token: string | null = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Render the React application with Router support
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
