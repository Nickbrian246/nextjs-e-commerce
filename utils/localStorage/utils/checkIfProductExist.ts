import { ShoppingCartProduct } from "../interfaces";

export function checkIfProductExist(
  products: ShoppingCartProduct[],
  newItem: ShoppingCartProduct
): boolean {
  if (Array.isArray(products)) {
    return products.some((product) => product.productId === newItem.productId);
  }
  return false;
}
