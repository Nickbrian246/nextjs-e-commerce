import { ShoppingCartProduct } from "../interfaces";
export function addProduct(
  shoppingCart: ShoppingCartProduct[],
  newItem: ShoppingCartProduct
): ShoppingCartProduct[] {
  const groupOfShoppingCartProducts = shoppingCart.map((product) => {
    if (product.productId === newItem.productId)
      return { ...product, quantity: product.quantity + 1 };
    else return product;
  });
  return groupOfShoppingCartProducts;
}
