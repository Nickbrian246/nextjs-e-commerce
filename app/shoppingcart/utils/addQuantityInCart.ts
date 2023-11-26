import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { Product } from "@/interfaces/product";
import { ProductWithQuantity } from "../interfaces";
export function addQuantityOfCartItems(
  groupOfIdsAndQuantities: ShoppingCartProduct[],
  groupOfProducts: Product[]
): ProductWithQuantity[] {
  const filterProducts = groupOfProducts.filter((product) => product.title);

  const groupOfProductWithQuantity: ProductWithQuantity[] = filterProducts.map(
    (product) => {
      const quantity = groupOfIdsAndQuantities.find(
        (item) => item.productId === product.id
      );
      if (quantity) {
        return { ...product, quantity: quantity.quantity };
      }
      return product;
    }
  );
  return groupOfProductWithQuantity;
}
