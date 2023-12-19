import axios from "axios";
import { GetSavedProducts } from "../../interfaces/savedProducts/savedProducts";

const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function createSavedProduct(
  product: GetSavedProducts,
  token: string
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const createSavedProduct = await axios.post(
    `${BASE_URL}/saved-products/create-saved-product`,
    product,
    config
  );
  return createSavedProduct.data;
}
