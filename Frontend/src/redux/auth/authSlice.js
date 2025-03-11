import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';


// 🔹 Login User

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', userData);
      const { token, user } = response.data;

      // Salvăm token-ul pentru autentificare
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// 🔹 Register User (Autentifică utilizatorul automat)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/register", userData);
      console.log("📌 Răspuns backend după înregistrare:", response.data);

      const { token, userId } = response.data;

      if (!token) {
        console.error("❌ Token-ul lipsește din răspunsul backend-ului!");
        return rejectWithValue("No token received");
      }

      // Salvăm token-ul în localStorage pentru autentificare automată
      localStorage.setItem("token", token);

      // 🔹 Apelăm `fetchUser` pentru a obține datele utilizatorului logat
      const userResponse = await axiosInstance.get("/me");

      return { user: userResponse.data, token };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// 🔹 Fetch User (Obține datele utilizatorului după autentificare)
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/me');
      console.log("📌 Date utilizator:", response.data);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token'); // 🔹 Șterge token-ul dacă sesiunea a expirat
      return rejectWithValue('Session expired');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: state => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder
      // 🔹 Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('User logged in:', action.payload.user);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // 🔹 Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
