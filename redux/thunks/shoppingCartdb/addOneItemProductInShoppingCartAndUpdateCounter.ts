import { ShoppingCartAndToken } from "@/redux/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { updateShoppingCartCounter } from "@/redux/slices/ShoppingCart";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export const addOneItemProductToShoppingCartInDb = createAsyncThunk(
  "addProductToShoppingCartInDb",
  async (product: ShoppingCartAndToken, { dispatch }) => {
    try {
      const { token } = product;
      const { quantity, productId } = product;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const productData = { productsCart: [{ productId, quantity }] };

      const addProduct = await axios.put(
        `${BASE_URL}/shoppingcart/add-one-item-to-product-in-shoppingcart`,
        productData,
        config
      );

      dispatch(updateShoppingCartCounter({ count: addProduct.data }));
      return addProduct.data;
    } catch (error) {
      dispatch(
        activeWarning({
          severity: "error",
          //@ts-ignore
          warningMessage: `${error.response.data.message}`,
          isActiveWarning: true,
        })
      );
    }
  }
);
