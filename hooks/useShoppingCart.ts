import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import {
  addQuantityOfCartItems,
  checkOfferAndAdaptPrice,
  calculateTotalPrice,
  calculateShippingCost,
} from "@/app/shoppingcart/utils";
import { getProductById } from "@/services/getProductById";
import { getProductsWithPromiseAll } from "@/services/getProductsWithPromiseAll";
import { getShoppingCartProductsDb } from "@/services/shoppingCartdb/getShoppingCartProductsdb";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { useRouter } from "next/navigation";
export function useShoppingCart() {
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);
  const [
    groupOfIdsAndQuantitiesOfShoppingCart,
    setGroupOfIdsAndQuantitiesOfShoppingCart,
  ] = useState<ShoppingCartProduct[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const { isLogged } = useSelector((state) => state.loggedUser);
  console.log(isLogged);
  const dispatch = useDispatch();
  const router = useRouter();

  function calculateShoppingCart() {
    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");
      getShoppingCartProductsDb(token.token_access)
        .then((res) => {
          const dbProducts = res.productsCart;
          setGroupOfIdsAndQuantitiesOfShoppingCart(dbProducts);
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
        setGroupOfIdsAndQuantitiesOfShoppingCart(productFromLocalStorage);
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
          .catch((error) => console.error(error));
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
