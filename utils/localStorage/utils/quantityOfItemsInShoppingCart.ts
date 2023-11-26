import { ShoppingCartProduct } from "../interfaces";

export function quantityOfItemsInShoppingCart(
  groupOfProducts: ShoppingCartProduct[] | string
): number {
  if (!Array.isArray(groupOfProducts)) {
    return -1;
  }
  return groupOfProducts.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity,
    0
  );
}
