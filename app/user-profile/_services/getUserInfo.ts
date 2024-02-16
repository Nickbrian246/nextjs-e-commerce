import axios from "axios";
import { UserInfo } from "../_interfaces/getUser";
import { AssociatedUser } from "../_interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getUserInfo(token: string): Promise<UserInfo> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const createOrder = await axios.get(`${BASE_URL}/me/get-me`, config);
    return createOrder.data;
  } catch (error) {
    throw error;
  }
}
