import React from "react";
import { getProduct } from "./_services";
import ProductCarousel from "./_components/productCarousel.tsx/ProductCarousel";
import ProductTitleAndOffer from "./_components/productDetails/ProductTitleAndOffer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ProductCostDetails from "./_components/productDetails/ProductCostDetails";
import ShippingDetails from "./_components/productDetails/ShippingDetails";
import AddToCart from "./_components/productDetails/AddToCart";
import Error from "./error";
export default async function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);

  return (
    //@ts-ignore
    <ErrorBoundary errorComponent={<Error />}>
      <div className=" w-full flex flex-col items-center">
        <ProductTitleAndOffer productDetails={product} />
        <ProductCarousel images={product.images} />
        <ProductCostDetails product={product} />
        <ShippingDetails />
        <AddToCart />
      </div>
    </ErrorBoundary>
  );
}
