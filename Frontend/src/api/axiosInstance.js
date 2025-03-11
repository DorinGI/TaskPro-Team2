import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 Adăugăm automat token-ul la fiecare request, cu protecție la erori
axiosInstance.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("❌ Eroare la accesarea localStorage:", error);
  }
  return config;
});

export default axiosInstance;
