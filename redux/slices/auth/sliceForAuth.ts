import { RegisterUser } from "@/app/auth/register/_interfaces/register";
import { UserRegister } from "@/redux/thunks/auth/registerUserThunk";
import {
  createEntityInLocalStorage,
  removeEntityInLocalStorage,
} from "@/utils/localStorage/localStorageGeneric";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface InitialState {
  isLogged: boolean;
  isLoading: boolean;
  error: null;
}
const initialState: InitialState = {
  isLogged: false,
  isLoading: false,
  error: null,
};

export const loggedUser = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogged = false;
      removeEntityInLocalStorage("userToken");
    },
    signin: (
      state,
      action: PayloadAction<{ token: string | null; updateStore: InitialState }>
    ) => {
      const { token, updateStore } = action.payload;
      if (token) {
        createEntityInLocalStorage("userToken", token);
      }
      state = updateStore;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserRegister.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      UserRegister.fulfilled,
      (state, action: PayloadAction<RegisterUser>) => {
        const token = action.payload;
        if (token) {
          createEntityInLocalStorage("userToken", token);
          state.isLoading = false;
          state.isLogged = true;
        }
      }
    );
  },
});

export default loggedUser.reducer;

export const { logOut, signin } = loggedUser.actions;
