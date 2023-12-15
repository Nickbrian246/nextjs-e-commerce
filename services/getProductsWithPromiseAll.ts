import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { getProductById } from "./getProductById";
import { Product } from "@/interfaces/product";
export async function getProductsWithPromiseAll(
  products: ShoppingCartProduct[]
): Promise<Product[]> {
  const promises = products.map(async (product) => {
    return await getProductById(product.productId);
  });

  const response = await Promise.all(promises);
  return response;
}

// const addQuantityToEachProduct = addQuantityOfCartItems(
//   productFromLocalStorage,
//   res
// );
// const groupOfCartProducts = checkOfferAndAdaptPrice(
//   addQuantityToEachProduct
// );
// const totalPrice = calculateTotalPrice(groupOfCartProducts);
// const shippingCost = calculateShippingCost(groupOfCartProducts);

// setShippingCost(shippingCost);
// setTotalPrice(totalPrice);
// setGroupOfProducts(groupOfCartProducts);
