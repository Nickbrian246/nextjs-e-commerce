import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export async function deleteOneProductFromShoppingCart(
  productId: number,
  token: string
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteOneProduct = await axios.delete(
      `${BASE_URL}/shoppingcart/delete-one-shoppingcart-Product?productId=${productId}`,
      config
    );
    return deleteOneProduct.data;
  } catch (error) {
    console.log(error);
  }
}
