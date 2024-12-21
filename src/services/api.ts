import axios from 'axios';

const config = {
  url: import.meta.env.VITE_WOOCOMMERCE_URL,
  consumerKey: import.meta.env.VITE_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_CONSUMER_SECRET
};

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: config.url,
  timeout: 10000
});

// Add request interceptor to add authentication
api.interceptors.request.use(config => {
  // Add authentication parameters to every request
  config.params = {
    ...config.params,
    consumer_key: import.meta.env.VITE_CONSUMER_KEY,
    consumer_secret: import.meta.env.VITE_CONSUMER_SECRET
  };
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(new Error("Erreur de connexion à Cgbshop1"));
  }
);