"use client";
import React, { useEffect, useState } from "react";
import QuantityToAddToCart from "@/app/product/[product]/_components/productDetails/QuantityToAddToCart";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import Image from "next/image";

interface Props {
  title: string;
  price: number;
  hasOffer: boolean;
  priceWithOffer: number;
  porcentageOfDiscount: string;
  hasFreeShipping: boolean;
  imgSrc: string;
}
export default function ProductResumeCard(props: Props) {
  const {
    price,
    title,
    hasFreeShipping,
    hasOffer,
    porcentageOfDiscount,
    priceWithOffer,
    imgSrc,
  } = props;

  return (
    <div
      className="
  flex 
  min-w-[700px] 
  min-h-[140px]  
  items-center 
  justify-between 
  p-2 
  border-b-2
border-b-textGray
"
    >
      <div className="flex gap-2">
        <div className="flex gap-2 justify-start items-center  lg:min-w-[350px]">
          <div>
            <Image src={imgSrc} alt={title} width={80} height={80} />
          </div>
          <div>
            <p className="whitespace-nowrap font-medium">{title}</p>
            <button className=" mr-4 text-base-color font-medium">
              Eliminar
            </button>
            <button className=" mr-4 text-base-color font-medium">
              Comprar ahora
            </button>
          </div>
        </div>
        <QuantityToAddToCart />
      </div>
      <div className="relative items-end">
        <div className="relative flex gap-2">
          {hasOffer && (
            <>
              <span className="text-red-600 ">-20%</span>
              <span className="line-through text-science-blue-300">
                {price.toLocaleString("es-MX", {
                  currency: "MXN",
                  style: "currency",
                })}
              </span>

              <span className="absolute text-2xl  text-red-600 -top-5 right-0">
                <BiSolidOffer />
              </span>
            </>
          )}
        </div>
        <span>
          {(hasOffer ? priceWithOffer : price).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
        {hasFreeShipping && (
          <>
            <span className="absolute text-2xl text-science-blue-400 -bottom-8 left-0 flex items-center gap-2">
              <FaShippingFast />
              <span className="text-xs">Envío gratis</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
