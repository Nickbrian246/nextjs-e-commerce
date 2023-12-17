import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import {
  addQuantityOfCartItems,
  calculateShippingCost,
  calculateTotalPrice,
  checkOfferAndAdaptPrice,
} from "@/app/shoppingcart/utils";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { getProductsWithPromiseAll } from "@/services/getProductsWithPromiseAll";
import { getShoppingCartProductsDb } from "@/services/shoppingCartdb/getShoppingCartProductsdb";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export function useShoppingCart() {
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  function calculateShoppingCart() {
    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");
      getShoppingCartProductsDb(token.token_access)
        .then((res) => {
          const dbProducts = res.productsCart;

          getProductsWithPromiseAll(res.productsCart).then((res) => {
            const addQuantityToEachProduct = addQuantityOfCartItems(
              dbProducts,
              res
            );

            const groupOfCartProducts = checkOfferAndAdaptPrice(
              addQuantityToEachProduct
            );
            const totalPrice = calculateTotalPrice(groupOfCartProducts);
            const shippingCost = calculateShippingCost(groupOfCartProducts);

            setShippingCost(shippingCost);
            setTotalPrice(totalPrice);
            setGroupOfProducts(groupOfCartProducts);
          });
        })
        .catch((err) => {
          if (err.response.data.message === "Unauthorized") {
            dispatch(
              activeWarning({
                isActiveWarning: true,
                severity: "error",
                warningMessage: `Sesión expirada.`,
                duration: 4000,
                warningSubMessage: "Por favor, inicie sesión.",
              })
            );
          }
        });
    } else {
      const productFromLocalStorage =
        getEntityProductsFromLocalStorage("shoppingCart");
      if (Array.isArray(productFromLocalStorage)) {
        getProductsWithPromiseAll(productFromLocalStorage)
          .then((res) => {
            const addQuantityToEachProduct = addQuantityOfCartItems(
              productFromLocalStorage,
              res
            );
            const groupOfCartProducts = checkOfferAndAdaptPrice(
              addQuantityToEachProduct
            );
            const totalPrice = calculateTotalPrice(groupOfCartProducts);
            const shippingCost = calculateShippingCost(groupOfCartProducts);

            setShippingCost(shippingCost);
            setTotalPrice(totalPrice);
            setGroupOfProducts(groupOfCartProducts);
          })
          .catch((error) => {
            dispatch(
              activeWarning({
                isActiveWarning: true,
                severity: "error",
                warningMessage: `${error.response.data.message}`,
              })
            );
          });
      }
    }
  }

  return {
    groupOfProducts,
    totalPrice,
    shippingCost,
    productsInShoppingCart,
    calculateShoppingCart,
  };
}
