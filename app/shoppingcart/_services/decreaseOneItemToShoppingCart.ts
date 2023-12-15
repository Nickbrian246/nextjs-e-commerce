import axios from "axios";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { AxiosResponse } from "axios";
import { Response } from ".";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function decreaseOneItemToShoppingCart(
  productId: string,
  token: string
): Promise<Response> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const addProduct: AxiosResponse<Response> = await axios.delete(
      `${BASE_URL}/shoppingcart/decrease-one-shoppingcart-Product?productId=${productId}`,
      config
    );
    return addProduct.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
