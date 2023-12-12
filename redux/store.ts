import { configureStore } from "@reduxjs/toolkit";
import shoppingCart from "./slices/ShoppingCart";
import loggedUser from "./slices/auth/sliceForAuth";
import globalWarning from "./slices/globalWarning/globalWarning";
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
    loggedUser: loggedUser,
    globalWarning: globalWarning,
  },
});
