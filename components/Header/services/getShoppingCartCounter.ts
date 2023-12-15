import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export async function getShoppingCartCounter(token: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const request = await axios.get(
      `${BASE_URL}/shoppingcart/getshoppingcartCounter`,
      config
    );
    return request.data;
  } catch (error) {
    throw error;
  }
}
