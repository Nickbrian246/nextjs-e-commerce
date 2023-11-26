import { configureStore } from "@reduxjs/toolkit";
import shoppingCart from "./slices/ShoppingCart";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
  },
});
