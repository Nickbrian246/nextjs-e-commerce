"use client";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import {
  addQuantityOfCartItems,
  calculateShippingCost,
  calculateTotalPrice,
  checkOfferAndAdaptPrice,
} from "@/app/shoppingcart/utils";
import { getProductById } from "@/services/getProductById";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ViewOnlyProductCard from "@/components/components/viewOnlyProductCard/ViewOnlyProductCard";
import { useSelector } from "react-redux";
interface Props {
  groupOfProducts: AdapterForPriceAndFreeShipping[];
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
  setGroupOfProducts: React.Dispatch<
    React.SetStateAction<AdapterForPriceAndFreeShipping[]>
  >;
}
export default function GroupOfProducts(props: Props) {
  const {
    setShippingCost,
    setTotalPrice,
    setGroupOfProducts,
    groupOfProducts,
  } = props;

  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const router = useRouter();
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
          const shippingCost = calculateShippingCost(groupOfCartProducts);

          setShippingCost(shippingCost);
          setTotalPrice(totalPrice);
          setGroupOfProducts(groupOfCartProducts);
        })
        .catch((error) => console.error(error));
    }
  }, [productsInShoppingCart]);

  return (
    <section>
      {groupOfProducts.map((product) => (
        <ViewOnlyProductCard
          hasFreeShipping={product.hasFreeShipping}
          hasOffer={product.hasOffer}
          imgSrc={product.image}
          porcentageOfDiscount={product.porcentageOfDiscount}
          price={product.price}
          priceWithOffer={product.priceWithOffer}
          productId={product.id}
          quantity={product.quantity ? product.quantity : 1}
          title={product.title}
          key={product.id}
        />
      ))}
    </section>
  );
}
