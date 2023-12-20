import React from "react";
import Image from "next/image";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";

interface Props {
  startArrowTransition: boolean;
  images: AdapterForPriceAndFreeShipping[];
  groupOfSavedProducts: AdapterForPriceAndFreeShipping[];
}
export default function ResumeImages(props: Props) {
  const { groupOfSavedProducts, images, startArrowTransition } = props;
  return (
    <div
      className={` flex transition-all duration-500 ${
        startArrowTransition ? " opacity-0 " : " opacity-100 "
      }`}
    >
      {images &&
        images.length >= 1 &&
        images?.map((product) => {
          return (
            <div
              key={product.id}
              className="
      relative 
      rounded-full 
      border 
      w-16 h-16  
      flex 
      justify-center 
      bg-white 
      border-[#d1d5db] 
      -ml-3"
            >
              <Image
                className="rounded-full object-contain"
                src={product.image}
                alt={product.title}
                height={40}
                width={40}
              />
            </div>
          );
        })}
      {groupOfSavedProducts &&
        groupOfSavedProducts?.length >= 4 &&
        groupOfSavedProducts &&
        images && (
          <div className="relative rounded-full border w-16 h-16  flex justify-center bg-white border-[#d1d5db] -ml-3">
            <span className="flex justify-center items-center scale-150">
              +{groupOfSavedProducts?.length - images.length}
            </span>
          </div>
        )}
    </div>
  );
}
