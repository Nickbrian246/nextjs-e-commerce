import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addItemToEntityInLocalStorage,
  createEntityLikeArrayOfIdsInLocalStorage,
  deleteEntityFromLocalStorage,
  deleteItemFromEntityInLocalStorage,
  getEntityProductsFromLocalStorage,
} from "@/utils/localStorage/localStorage";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { quantityOfItemsInShoppingCart } from "@/utils/localStorage/utils";

const initialState = {
  productsInShoppingCart: 0,
};
export const ShoppingCart = createSlice({
  name: "productsInCart",
  initialState,
  reducers: {
    addItemToShoppingCart: (
      state,
      action: PayloadAction<{ key: string; products: ShoppingCartProduct }>
    ) => {
      const { key, products } = action.payload;

      if (addItemToEntityInLocalStorage(key, products) === "entity not found") {
        createEntityLikeArrayOfIdsInLocalStorage(key, products);
      }
      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      const itemsInShoppingCart =
        quantityOfItemsInShoppingCart(groupOfProducts);
      state.productsInShoppingCart = itemsInShoppingCart;
    },
    checkShoppingCart: (state, action: PayloadAction<{ key: string }>) => {
      const { key } = action.payload;
      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      const itemsInShoppingCart =
        quantityOfItemsInShoppingCart(groupOfProducts);
      state.productsInShoppingCart = itemsInShoppingCart;
    },
  },
});

export default ShoppingCart.reducer;

export const { addItemToShoppingCart, checkShoppingCart } =
  ShoppingCart.actions;
