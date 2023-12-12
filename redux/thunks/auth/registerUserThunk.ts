import { RegisterUser } from "@/app/auth/register/_interfaces/register";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export const UserRegister = createAsyncThunk(
  "registerUser",
  async (userDetails: RegisterUser) => {
    try {
      const createUser = await axios.post(
        `${BASE_URL}/auth/signup`,
        userDetails,
        config
      );

      return createUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);
