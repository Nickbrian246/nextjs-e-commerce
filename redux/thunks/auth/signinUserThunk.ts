import { Signin } from "@/app/auth/signin/_interfaces/signin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../../slices/auth/sliceForAuth";
import axios from "axios";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export const UserSignin = createAsyncThunk(
  "registerUser",
  async (userDetails: Signin, { dispatch }) => {
    try {
      dispatch(
        signin({
          updateStore: { isLogged: false, isLoading: true, error: null },
          token: null,
        })
      );
      const createUser = await axios.post(
        `${BASE_URL}/auth/signin`,
        userDetails,
        config
      );
      dispatch(
        signin({
          updateStore: { isLogged: false, isLoading: false, error: null },
          token: null,
        })
      );

      return createUser.data;
    } catch (error) {
      dispatch(
        activeWarning({
          duration: 5000,
          isActiveWarning: true,
          severity: "error",
          warningMessage: `${error}`,
        })
      );
      dispatch(
        signin({
          updateStore: { isLogged: false, isLoading: false, error: null },
          token: null,
        })
      );
    }
  }
);
