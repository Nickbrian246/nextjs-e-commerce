import axios from "axios";
import { GetSavedProducts } from "../../interfaces/savedProducts/savedProducts";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getSavedProduct(
  token: string
): Promise<GetSavedProducts[]> {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const createSavedProduct = await axios.get(
    `${BASE_URL}/saved-products/get-saved-Products`,
    config
  );
  return createSavedProduct.data;
}
