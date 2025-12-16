import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import type { User } from "../../types/user";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await api.get("/users");
  return res.data as User[];
});

export const fetchUserById = createAsyncThunk("users/fetchById", async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data as User;
});

export const createUser = createAsyncThunk("users/create", async (user: Omit<User, "id">) => {
  const res = await api.post("/users", user);
  return res.data as User;
});

export const updateUser = createAsyncThunk("users/update", async (user: User) => {
  const res = await api.put(`/users/${user.id}`, user);
  return res.data as User;
});

export const deleteUser = createAsyncThunk("users/delete", async (id: number) => {
  await api.delete(`/users/${id}`);
  return id;
});

 

interface UserState {
  list: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  list: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true;  state.error = null;})
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchUsers.rejected, (state) => { state.loading = false; state.error = "Failed to fetch users"; })
      .addCase(fetchUserById.pending, (state) => { state.loading = true; })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch user by ID.";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user.";
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const idx = state.list.findIndex(
          (u) => u.id === action.payload.id || (u as any)._id === (action.payload as any)._id
        );
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(
          (u) => (u.id ?? (u as any)._id) !== action.payload
        );
      });
  },
});


export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
