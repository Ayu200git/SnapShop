import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api";

export interface AdminState {
  usersCount: number;
  productsCount: number;
  cartCount: number;
  revenue: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}
const initialState: AdminState = {
  usersCount: 0,
  productsCount: 0,
  cartCount: 0,
  revenue: 0,
  status: "idle",
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "admin/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/dashboard");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch dashboard data");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (state, action: PayloadAction<Omit<AdminState, "status" | "error">>) => {
          state.status = "succeeded";
          state.usersCount = action.payload.usersCount;
          state.productsCount = action.payload.productsCount;
          state.cartCount = action.payload.cartCount;
          state.revenue = action.payload.revenue;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load dashboard";
      });
  },
});

export default adminSlice.reducer;
