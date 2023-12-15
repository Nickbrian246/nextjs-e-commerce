import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { UpdateShoppingCartProducts } from "../interfaces";
export function adapterForUpdateShoppingCart(
  products: ShoppingCartProduct[]
): UpdateShoppingCartProducts {
  return {
    productsCart: [...products],
  };
}
