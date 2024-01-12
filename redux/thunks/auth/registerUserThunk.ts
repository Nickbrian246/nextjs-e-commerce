import { RegisterUser } from "@/app/auth/register/_interfaces/register";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import axios from "axios";
import { signin } from "@/redux/slices/auth/sliceForAuth";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export const UserRegister = createAsyncThunk(
  "registerUser",
  async (userDetails: RegisterUser, { dispatch }) => {
    try {
      const createUser = await axios.post(
        `${BASE_URL}/auth/signup`,
        userDetails,
        config
      );

      return createUser.data;
    } catch (error) {
      dispatch(
        activeWarning({
          duration: 5000,
          isActiveWarning: true,
          severity: "error",
          //@ts-ignore
          warningMessage: `${error.response.data.message}`,
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
