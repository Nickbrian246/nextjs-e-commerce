import {
  ProductWithQuantity,
  AdapterForPriceAndFreeShipping,
} from "../interfaces";
import {
  hasOffer,
  discountAmount,
  hasFreeShipping,
  newPriceWithDiscount,
} from "@/components/productCard/utils/hasOffer";
export function checkOfferAndAdaptPrice(
  groupOfProducts: ProductWithQuantity[]
): AdapterForPriceAndFreeShipping[] {
  const productsAdapted: AdapterForPriceAndFreeShipping[] = groupOfProducts.map(
    (product) => {
      if (hasOffer(product.price)) {
        return {
          ...product,
          hasOffer: true,
          priceWithOffer: newPriceWithDiscount(product.price, 20),
          porcentageOfDiscount: "20",
          hasFreeShipping: hasFreeShipping(product.price),
        };
      }
      return {
        ...product,
        hasOffer: false,
        priceWithOffer: 0,
        porcentageOfDiscount: "",
        hasFreeShipping: false,
      };
    }
  );
  return productsAdapted;
}
