import { AdapterForPriceAndFreeShipping } from "../interfaces";
export function calculateShippingCost(
  groupOfProducts: AdapterForPriceAndFreeShipping[]
): number {
  const shippingCost = 25;
  const totalShippingCost = groupOfProducts.reduce((prevVal, currentVal) => {
    if (currentVal.hasFreeShipping) {
      return 0 + prevVal;
    }
    return prevVal + shippingCost;
  }, 0);
  return totalShippingCost;
}
