import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import type { CartItem, CartState } from "../../types/cart";

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  loading: false,
  error: null,
};

export const fetchCarts = createAsyncThunk("cart/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (data: { productId: string; quantity?: number }, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/add", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/remove", { productId });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemAPI = createAsyncThunk(
  "cart/updateCartItemAPI",
  async (data: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const res = await api.put("/cart/update", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartAPI = createAsyncThunk(
  "cart/clearCartAPI",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart/clear");
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const saveToLocalStorage = (items: CartItem[]) =>
  localStorage.setItem("cart", JSON.stringify(items));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     addToCart: (state, action: PayloadAction<CartItem>) => {
  const newItem = action.payload;
  const existing = state.items.find((i) => 
    (typeof i.id === 'string' && typeof newItem.id === 'string' && i.id === newItem.id) ||
    (typeof i.id === 'number' && typeof newItem.id === 'number' && i.id === newItem.id)
  );
  if (existing) {
    existing.quantity += newItem.quantity;
  } else {
    state.items.push(newItem);
  }
  saveToLocalStorage(state.items);
},


    incrementQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((i) => 
        (typeof i.id === 'string' && typeof action.payload === 'string' && i.id === action.payload) ||
        (typeof i.id === 'number' && typeof action.payload === 'number' && i.id === action.payload)
      );
      if (item) item.quantity += 1;
      saveToLocalStorage(state.items);
    },

    decrementQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((i) => 
        (typeof i.id === 'string' && typeof action.payload === 'string' && i.id === action.payload) ||
        (typeof i.id === 'number' && typeof action.payload === 'number' && i.id === action.payload)
      );
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter((i) => 
          (typeof i.id === 'string' && typeof action.payload === 'string' && i.id !== action.payload) ||
          (typeof i.id === 'number' && typeof action.payload === 'number' && i.id !== action.payload)
        );
      }
      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((i) => 
        (typeof i.id === 'string' && typeof action.payload === 'string' && i.id !== action.payload) ||
        (typeof i.id === 'number' && typeof action.payload === 'number' && i.id !== action.payload)
      );
      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        saveToLocalStorage(state.items);
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch cart";
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        saveToLocalStorage(state.items);
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        saveToLocalStorage(state.items);
      })
      .addCase(updateCartItemAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        saveToLocalStorage(state.items);
      })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
        saveToLocalStorage(state.items);
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
