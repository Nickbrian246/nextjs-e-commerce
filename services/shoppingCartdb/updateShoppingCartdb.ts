import axios from "axios";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { UpdateShoppingCartProducts } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function updateShoppingCartForUserLogged(
  products: UpdateShoppingCartProducts,
  token: string
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const createShoppingCart = await axios.put(
      `${BASE_URL}/shoppingcart/updateshoppingcart`,
      products,
      config
    );
    console.log(createShoppingCart.data);

    return createShoppingCart.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
