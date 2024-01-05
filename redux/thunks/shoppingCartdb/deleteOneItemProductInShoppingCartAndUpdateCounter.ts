import { ShoppingCartAndToken } from "@/redux/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { updateShoppingCartCounter } from "@/redux/slices/ShoppingCart";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
interface Data {
  token: string;
  productId: string;
}
export const deleteOneItemProductToShoppingCartInDb = createAsyncThunk(
  "addProductToShoppingCartInDb",
  async (data: Data, { dispatch }) => {
    try {
      const { token, productId } = data;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const addProduct = await axios.delete(
        `${BASE_URL}/shoppingcart/decrease-one-shoppingcart-Product?productId=${productId}`,
        config
      );

      dispatch(updateShoppingCartCounter({ count: addProduct.data }));
      return addProduct.data;
    } catch (error) {
      dispatch(
        activeWarning({
          severity: "error",
          warningMessage: `${error.response.data.message}`,
          isActiveWarning: true,
        })
      );
    }
  }
);
