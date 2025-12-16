import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../serviceProvider/slices/authSlice";
import productReducer from "../serviceProvider/slices/productSlice";
import cartReducer from "../serviceProvider/slices/cartSlice";
import wishlistReducer from "../serviceProvider/slices/wishlistSlice";
import userReducer from "../serviceProvider/slices/userSlice";
import adminReducer from "../serviceProvider/slices/adminSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    users: userReducer,
    admin: adminReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

