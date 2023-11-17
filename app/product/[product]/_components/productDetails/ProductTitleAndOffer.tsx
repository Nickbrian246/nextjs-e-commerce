"use client";
import React, { useState } from "react";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import {
  hasOffer,
  discountAmount,
  hasFreeShipping,
  newPriceWithDiscount,
} from "@/components/productCard/utils/hasOffer";
export default function ProductTitleAndOffer({
  productDetails,
}: {
  productDetails: Product;
}) {
  const { title, price } = productDetails;

  return (
    <>
      <div className="w-full flex flex-col p-1">
        <h1 className="font-medium text-base self-start text-base-color mb-2">
          {title}
        </h1>
        {hasOffer(price) && (
          <div className="flex justify-start w-full  gap-3">
            <Image
              src={
                "https://ddtech.mx/assets/uploads/bb7b38fe3596d6ae2baa7ba831e0e7bc.jpg"
              }
              alt={title}
              width={75}
              height={75}
            />
            {hasFreeShipping(price) && (
              <Image
                src={
                  "https://ddtech.mx/assets/uploads/f62702bf38f686cd610313c2367c254e.jpg"
                }
                alt={title}
                width={110}
                height={27}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
