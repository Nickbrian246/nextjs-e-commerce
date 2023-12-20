import axios from "axios";
import { Order } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getAllOrders(token: string): Promise<Order[]> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getOneMyOrder = await axios.get(
      `${BASE_URL}/my-orders/get-all-my-orders`,
      config
    );
    return getOneMyOrder.data;
  } catch (error) {
    throw error;
  }
}
