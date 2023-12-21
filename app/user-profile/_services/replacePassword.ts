import axios from "axios";
import { ReplacePassword } from "../_interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function replacePassword(
  password: ReplacePassword,
  token: string
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const createOrder = await axios.patch(
      `${BASE_URL}/auth/change-password`,
      password,
      config
    );
    return createOrder.data;
  } catch (error) {
    throw error;
  }
}
