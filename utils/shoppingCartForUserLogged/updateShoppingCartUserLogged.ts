import { updateShoppingCartForUserLogged } from "@/services/shoppingCartdb";
import { adapterForUpdateShoppingCart } from "@/services/shoppingCartdb/adapters";
import { getEntityProductsFromLocalStorage } from "../localStorage/localStorage";
import {
  getEntityInLocalStorage,
  removeEntityInLocalStorage,
} from "../localStorage/localStorageGeneric";

export async function updateShoppingCartUserLogged() {
  try {
    const groupOfProducts = getEntityProductsFromLocalStorage("shoppingCart");

    if (Array.isArray(groupOfProducts) && groupOfProducts.length > 1) {
      const token = getEntityInLocalStorage("userToken");
      const shoppingProductsCartAdapter =
        adapterForUpdateShoppingCart(groupOfProducts);

      const res = await updateShoppingCartForUserLogged(
        shoppingProductsCartAdapter,
        token.token_access
      );
      removeEntityInLocalStorage("shoppingCart");
      return res;
    }
  } catch (error) {
    throw error;
  }
}
