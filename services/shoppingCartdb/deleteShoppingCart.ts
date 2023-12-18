import axios from "axios";
import { CreateOrder } from "../myOrders/interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export async function deleteShoppingCart(
  purchasedProducts: CreateOrder,
  token: string
): Promise<number> {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const deleteShoppingCart = await axios.put(
    `${BASE_URL}/shoppingcart/delete-products-in-shoppingcart`,
    purchasedProducts,
    config
  );
  return deleteShoppingCart.data;
}
