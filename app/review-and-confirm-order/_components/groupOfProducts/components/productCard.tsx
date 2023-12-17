import React from "react";
import OfferAndFreeShipping from "@/app/shoppingcart/_components/productResume/components/OfferAndFreeShipping";
import Image from "next/image";
import { MyOrderProduct } from "@/app/review-and-confirm-order/_interfaces/myOrderProduct";

interface Props
  extends Pick<
    MyOrderProduct,
    | "title"
    | "price"
    | "hasOffer"
    | "priceWithOffer"
    | "porcentageOfDiscount"
    | "hasFreeShipping"
    | "image"
    | "id"
    | "quantity"
    | "subTotal"
  > {}
// title: string;
// price: number;
// hasOffer: boolean;
// priceWithOffer: number;
// porcentageOfDiscount: string;
// hasFreeShipping: boolean;
// image: string;
// id: number;
// quantity: number;
export default function ProductCard(props: Props) {
  const {
    hasFreeShipping,
    hasOffer,
    image,
    porcentageOfDiscount,
    price,
    priceWithOffer,
    id,
    quantity,
    title,
    subTotal,
  } = props;

  const totalPrice = price.toLocaleString("es-MX", {
    currency: "MXN",
    style: "currency",
  });
  const offerPrice = priceWithOffer.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  // const subTotal = (
  //   hasOffer ? priceWithOffer * quantity : price * quantity
  // ).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  return (
    <div
      className="
flex
lg:min-w-[700px]
min-h-[140px]
items-center
justify-between
border-b-2
border-b-textGray
flex-wrap
gap-6
pt-2
"
    >
      <div className="flex gap-2 flex-wrap ">
        <div className="flex gap-2 justify-start items-center flex-wrap lg:flex-nowrap  w-[300px]   lg:w-[380px]">
          <div>
            <Image src={image} alt={title} width={80} height={80} />
          </div>
          <div>
            <p className="font-medium" title={title}>
              {title.length > 75 ? title.substring(0, 38).concat("...") : title}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-md text-science-blue-950 font-medium ">
            Cantidad: {quantity}
          </span>
        </div>
      </div>
      <div className="relative flex  flex-col flex-wrap items-baseline mt-4 ">
        <div className=" flex gap-1 flex-col">
          {hasOffer && (
            <OfferAndFreeShipping
              discount="%20"
              hasFreeShipping
              totalPrice={totalPrice}
            />
          )}
        </div>

        <span className="self-start font-medium">
          {hasOffer ? offerPrice : totalPrice}
        </span>
        <span className="font-semibold"> Sub total: {subTotal}</span>
      </div>
    </div>
  );
}
