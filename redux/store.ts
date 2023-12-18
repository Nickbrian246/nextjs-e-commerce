import { configureStore } from "@reduxjs/toolkit";
import shoppingCart from "./slices/ShoppingCart";
import loggedUser from "./slices/auth/sliceForAuth";
import globalWarning from "./slices/globalWarning/globalWarning";
import globalSpinner from "./slices/globalSpinner/globalSpinner";
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
    loggedUser: loggedUser,
    globalWarning: globalWarning,
    globalSpinner: globalSpinner,
  },
});
