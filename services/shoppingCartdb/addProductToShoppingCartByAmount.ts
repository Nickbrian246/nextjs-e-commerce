import { UpdateShoppingCartProducts } from "./interfaces";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function addProductToShippingCartByAmount(
  data: UpdateShoppingCartProducts,
  token: string
): Promise<number> {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const addProductByAmount = await axios.put(
    `${BASE_URL}/shoppingcart/add-product-to-shoppingcart`,
    data,
    config
  );
  return addProductByAmount.data;
}
