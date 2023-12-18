import axios from "axios";
import { Order } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getOneMyOrder(
  uniqueId: string,
  token: string
): Promise<Order> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getOneMyOrder = await axios.get(
      `${BASE_URL}/my-orders/get-one-my-order?uniqueId=${uniqueId}`,
      config
    );
    return getOneMyOrder.data;
  } catch (error) {
    throw error;
  }
}
