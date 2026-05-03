import axios from 'axios';

const API_URL = 'https://todo-production-19a8.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (email, password) => {
    return await api.post('/auth/register', { email, password });
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const todoService = {
  getAll: async () => {
    return await api.get('/todos');
  },
  create: async (todo) => {
    return await api.post('/todos/create', todo);
  },
  delete: async (id) => {
    return await api.delete(`/todos/${id}`);
  },
  update: async (id, todo) => {
    return await api.put(`/todos/${id}`, todo);
  },
};

export default api;
