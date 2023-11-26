import { ProductWithQuantity } from ".";
export interface AdapterForPriceAndFreeShipping extends ProductWithQuantity {
  hasOffer: boolean;
  priceWithOffer: number;
  porcentageOfDiscount: string;
  hasFreeShipping: boolean;
}
