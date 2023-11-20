import React from "react";
import { Product } from "@/interfaces/product";
export default function ProductDescription({
  productDetails,
}: {
  productDetails: Product;
}) {
  const { description } = productDetails;
  return <p>{description}</p>;
}
