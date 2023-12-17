import axios from "axios";
import { CreateOrder } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function createMyOrder(order: CreateOrder, token: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const createOrder = await axios.post(
      `${BASE_URL}/my-orders/create-my-order`,
      order,
      config
    );
    return createOrder.data;
  } catch (error) {
    throw error;
  }
}
