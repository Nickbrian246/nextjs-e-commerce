import axios from "axios";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export type Response = number;
export async function addOneItemToShoppingCart(
  product: ShoppingCartProduct,
  token: string
): Promise<Response> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const productData = {
      productsCart: [{ ...product }],
    };

    const addProduct: AxiosResponse<Response> = await axios.put(
      `${BASE_URL}/shoppingcart/add-one-item-to-product-in-shoppingcart`,
      productData,
      config
    );
    return addProduct.data;
  } catch (error) {
    //@ts-ignore
    throw error.response.data.message;
  }
}
