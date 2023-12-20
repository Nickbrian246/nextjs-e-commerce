import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function deleteSavedProduct(productId: number, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const createSavedProduct = await axios.delete(
    `${BASE_URL}/saved-products/delete-saved-product?productId=${productId}`,
    config
  );
  return createSavedProduct.data;
}
