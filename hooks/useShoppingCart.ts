import {
  AdapterForPriceAndFreeShipping,
  ProductWithQuantity,
} from "@/app/shoppingcart/interfaces";
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
import { getProductById } from "@/services/getProductById";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  function calculateShoppingCart() {
    if (isLogged) {
      setIsLoading(true);
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
            setIsLoading(false);
          });
        })
        .catch((err) => {
          setIsLoading(false);
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
      setIsLoading(true);
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
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
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
  function calculateShoppingCartForOneProduct(id: number, quantity: number) {
    try {
      setIsLoading(true);
      if (isLogged && quantity) {
        getProductById(id).then((res) => {
          const addQuantity: ProductWithQuantity = { ...res, quantity };
          const adaptToArray = new Array(addQuantity);
          const groupOfCartProducts = checkOfferAndAdaptPrice(adaptToArray);
          const totalPrice = calculateTotalPrice(groupOfCartProducts);
          const shippingCost = calculateShippingCost(groupOfCartProducts);

          setShippingCost(shippingCost);
          setTotalPrice(totalPrice);
          setGroupOfProducts(groupOfCartProducts);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsLoading(false);

      dispatch(
        activeWarning({
          isActiveWarning: true,
          severity: "error",
          //@ts-ignore
          warningMessage: `${error.response.data.message}`,
        })
      );
    }
  }

  return {
    groupOfProducts,
    totalPrice,
    shippingCost,
    productsInShoppingCart,
    calculateShoppingCart,
    calculateShoppingCartForOneProduct,
    isLoading,
  };
}
