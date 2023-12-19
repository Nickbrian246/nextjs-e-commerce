import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { GetSavedProducts } from "../interfaces/savedProducts/savedProducts";

export function adapterForSavedProduct(
  product: ShoppingCartProduct
): GetSavedProducts {
  return {
    savedProducts: [{ ...product }],
  };
}
