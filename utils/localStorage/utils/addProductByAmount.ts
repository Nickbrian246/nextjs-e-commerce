import { ShoppingCartProduct } from "../interfaces";
export function addProductByAmount(
  groupOfProducts: ShoppingCartProduct[],
  newProduct: ShoppingCartProduct
): ShoppingCartProduct[] {
  const products = groupOfProducts.map((productItem) => {
    if (productItem.productId === newProduct.productId) {
      return {
        ...productItem,
        quantity: (productItem.quantity = newProduct.quantity),
      };
    }
    return productItem;
  });
  return products;
}
