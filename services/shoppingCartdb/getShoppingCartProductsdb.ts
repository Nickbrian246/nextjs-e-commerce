import axios from "axios";
import { ShoppingCartdb } from "./interfaces/shoppingCartdb";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export async function getShoppingCartProductsDb(
  token: string
): Promise<ShoppingCartdb> {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const groupOfProducts = await axios.get(
    `${BASE_URL}/shoppingcart/getshoppingcart`,
    config
  );
  return groupOfProducts.data;
}
