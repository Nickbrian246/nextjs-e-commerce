import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addItemToEntityInLocalStorage,
  createEntityLikeArrayOfIdsInLocalStorage,
  deleteEntityFromLocalStorage,
  deleteItemFromEntityInLocalStorage,
  getEntityProductsFromLocalStorage,
  subtractItemFromEntityInLocalStorage,
  addProductsByAmountToEntityInLocalStorage,
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
    addProductToShoppingCart: (
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
    deleteProductInShoppingCart: (
      state,
      action: PayloadAction<{ productId: number; key: string }>
    ) => {
      const { productId, key } = action.payload;
      deleteItemFromEntityInLocalStorage(key, productId);

      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      state.productsInShoppingCart =
        quantityOfItemsInShoppingCart(groupOfProducts);
    },
    checkShoppingCart: (state, action: PayloadAction<{ key: string }>) => {
      const { key } = action.payload;

      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      const itemsInShoppingCart =
        quantityOfItemsInShoppingCart(groupOfProducts);
      state.productsInShoppingCart = itemsInShoppingCart;
    },
    addOneItemToProductInShoppingCart: (
      state,
      action: PayloadAction<{ productId: ShoppingCartProduct; key: string }>
    ) => {
      const { key, productId } = action.payload;
      addItemToEntityInLocalStorage(key, productId);
      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      const itemsInShoppingCart =
        quantityOfItemsInShoppingCart(groupOfProducts);
      state.productsInShoppingCart = itemsInShoppingCart;
    },
    subtractOneItemToProductInShoppingCart: (
      state,
      action: PayloadAction<{ key: string; product: ShoppingCartProduct }>
    ) => {
      const { key, product } = action.payload;
      subtractItemFromEntityInLocalStorage(key, product.productId);
      const products = getEntityProductsFromLocalStorage(key);
      const totalProducts = quantityOfItemsInShoppingCart(products);
      state.productsInShoppingCart = totalProducts;
    },
    addItemsToProductByAmount: (
      state,
      action: PayloadAction<{ key: string; product: ShoppingCartProduct }>
    ) => {
      const { key, product } = action.payload;
      addProductsByAmountToEntityInLocalStorage(key, product);
      const groupOfProducts = getEntityProductsFromLocalStorage(key);
      const totalProducts = quantityOfItemsInShoppingCart(groupOfProducts);
      state.productsInShoppingCart = totalProducts;
    },
  },
});

export default ShoppingCart.reducer;

export const {
  addProductToShoppingCart,
  checkShoppingCart,
  deleteProductInShoppingCart,
  addOneItemToProductInShoppingCart,
  subtractOneItemToProductInShoppingCart,
} = ShoppingCart.actions;
