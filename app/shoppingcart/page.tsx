"use client";
import { getProductById } from "@/services/getProductById";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { useEffect, useState } from "react";
import ProductResume from "./_components/productResume/ProductResume";
import SaleResume from "./_components/shoppingProductCard/SaleResume";
import {
  AdapterForPriceAndFreeShipping,
  ProductWithQuantity,
} from "./interfaces";
import { addQuantityOfCartItems, checkOfferAndAdaptPrice } from "./utils";

export default function ShoppingCart() {
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);
  useEffect(() => {
    const groupOfIdsAndQuantitiesOfShoppingCart =
      getEntityProductsFromLocalStorage("shoppingCart");
    if (Array.isArray(groupOfIdsAndQuantitiesOfShoppingCart)) {
      const promises = groupOfIdsAndQuantitiesOfShoppingCart.map(
        async (product) => {
          return await getProductById(product.productId);
        }
      );

      Promise.all(promises)
        .then((res) => {
          const addQuantityToEachProduct = addQuantityOfCartItems(
            groupOfIdsAndQuantitiesOfShoppingCart,
            res
          );
          const groupOfCartProducts = checkOfferAndAdaptPrice(
            addQuantityToEachProduct
          );
          setGroupOfProducts(groupOfCartProducts);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <>
      <section>
        <ProductResume groupOfProducts={groupOfProducts} />
      </section>
      <aside>
        <SaleResume />
      </aside>
    </>
  );
}
