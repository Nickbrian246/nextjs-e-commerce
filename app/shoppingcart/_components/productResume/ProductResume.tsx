"use client";
import { AdapterForPriceAndFreeShipping } from "../../interfaces";
import ProductResumeCard from "./components/ProductResumeCard";

export default function ProductResume({
  groupOfProducts,
}: {
  groupOfProducts: AdapterForPriceAndFreeShipping[];
}) {
  return (
    <div className="flex flex-col">
      {groupOfProducts.length > 0 &&
        groupOfProducts.map((product) => (
          <ProductResumeCard
            hasFreeShipping={product.hasFreeShipping}
            hasOffer={product.hasOffer}
            porcentageOfDiscount={product.porcentageOfDiscount}
            price={product.price}
            priceWithOffer={product.priceWithOffer}
            title={product.title}
            imgSrc={product.image}
            productId={product.id}
            key={product.id}
          />
        ))}
    </div>
  );
}
