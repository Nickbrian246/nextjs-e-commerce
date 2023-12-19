import { UpdateShoppingCartProducts } from "@/services/shoppingCartdb/interfaces";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
export function adapterForAddProductForAmount(
  product: ShoppingCartProduct
): UpdateShoppingCartProducts {
  return {
    productsCart: [{ ...product }],
  };
}
