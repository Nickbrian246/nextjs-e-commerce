import React from "react";
import {
  hasOffer,
  discountAmount,
  hasFreeShipping,
  newPriceWithDiscount,
} from "@/components/productCard/utils/hasOffer";
import { Product } from "@/interfaces/product";

export default function ProductCostDetails({ product }: { product: Product }) {
  const { price } = product;
  const priceAfterDiscount = newPriceWithDiscount(price, 20).toLocaleString(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
    }
  );
  const howMuchSavedMoney = discountAmount(price, 20).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  return (
    <>
      <div className="  flex flex-col justify-start w-full p-1">
        <p className="line-through text-science-blue-300 text-sm">
          {price.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </p>
        <div className="flex  gap-3 items-center">
          <span className="text-science-blue-600 text-lg">
            {priceAfterDiscount}
          </span>
          <span className=" text-science-blue-300 text-sm">
            20% de descuento
          </span>
        </div>
        {true && <span>Paga a meses sin intereses </span>}
      </div>
    </>
  );
}
