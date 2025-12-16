import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import type { User, AuthState } from "../../types/user";
import { STORAGE_KEYS } from "../../constants";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username?: string; email?: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const loginData = credentials.email 
        ? { email: credentials.email, password: credentials.password }
        : { username: credentials.username, password: credentials.password };
      
      const res = await api.post("/auth/login", loginData);
      const { token, user } = res.data;

      if (!user) throw new Error("User not found");

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);

      return { token, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Invalid credentials");
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    user: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/register", user);
      const { token, user: newUser } = res.data;

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);

      return { user: newUser, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Registration failed. Try again later.");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/profile");
      return res.data;
    } catch (error: any) {
      // Fallback to localStorage if API fails
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        return JSON.parse(userData);
      }
      return rejectWithValue(error.response?.data?.error || "Failed to fetch user profile");
    }
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
    restoreSession: (state) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      if (token && userData) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(userData);
      }
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
