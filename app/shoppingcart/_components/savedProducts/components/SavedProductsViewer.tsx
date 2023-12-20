import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import React from "react";
import ViewOnlyProductCardWithRef from "../../ViewOnlyProductCartWithRef/ViewOnlyProductCartWithRef";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
interface Props {
  startArrowTransition: boolean;
  groupOfSavedProducts: AdapterForPriceAndFreeShipping[];
  handleUpdateGroupOfProducts: () => void;
  savedProductElementHeigh: number;
  addRef: () => void;
}
export default function SavedProductsViewer(props: Props) {
  const {
    groupOfSavedProducts,
    handleUpdateGroupOfProducts,
    startArrowTransition,
    savedProductElementHeigh,
    addRef,
  } = props;

  return (
    <div
      style={
        startArrowTransition
          ? { height: `${savedProductElementHeigh}px` }
          : { height: "0px" }
      }
      className={`mb-24 w-full transition-all ease-in duration-300 overflow-hidden  ${
        startArrowTransition ? "p-1" : ""
      }  bg-white border border-[#e5e7eb] border-t-0`}
    >
      {groupOfSavedProducts &&
        groupOfSavedProducts.map((product, index) => (
          <ViewOnlyProductCardWithRef
            hasFreeShipping={product.hasFreeShipping}
            hasOffer={product.hasOffer}
            imgSrc={product.image}
            porcentageOfDiscount={product.porcentageOfDiscount}
            price={product.price}
            priceWithOffer={product.priceWithOffer}
            productId={product.id}
            quantity={product.quantity ?? 1}
            title={product.title}
            handleUpdateGroupOfProducts={handleUpdateGroupOfProducts}
            key={product.id}
            //@ts-ignore
            reference={addRef}
          />
        ))}
    </div>
  );
}
