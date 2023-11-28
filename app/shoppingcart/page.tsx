"use client";
import { LinkButton } from "@/components/components/LinkButton";
import { getProductById } from "@/services/getProductById";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { useEffect, useState } from "react";
import ProductResume from "./_components/productResume/ProductResume";
import SaleResume from "./_components/shoppingProductCard/SaleResume";
import { AdapterForPriceAndFreeShipping } from "./interfaces";
import {
  addQuantityOfCartItems,
  calculateShippingCost,
  calculateTotalPrice,
  calculateTotalProducts,
  checkOfferAndAdaptPrice,
} from "./utils";

export default function ShoppingCart() {
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(1);
  const [shippingCost, setShippingCost] = useState<number>(0);
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
          const totalPrice = calculateTotalPrice(groupOfCartProducts);
          const totalProducts = calculateTotalProducts(groupOfCartProducts);
          const shippingCost = calculateShippingCost(groupOfCartProducts);

          setShippingCost(shippingCost);
          setTotalProducts(totalProducts);
          setTotalPrice(totalPrice);
          setGroupOfProducts(groupOfCartProducts);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <>
      <section className="p-2 shadow-xl h-fit">
        <ProductResume groupOfProducts={groupOfProducts} />
      </section>
      <aside className=" flex flex-col gap-2">
        <SaleResume
          totalPrice={totalPrice}
          totalProducts={totalProducts}
          shippingCost={shippingCost}
        />
        <LinkButton href={"/shoppingcart"}>Comprar ahora</LinkButton>
      </aside>
    </>
  );
}
