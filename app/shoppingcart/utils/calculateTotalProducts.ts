import { AdapterForPriceAndFreeShipping } from "../interfaces";
export function calculateTotalProducts(
  groupOfProducts: AdapterForPriceAndFreeShipping[]
): number {
  const totalProducts = groupOfProducts.reduce((prevVal, currentVal) => {
    return (currentVal.quantity ? currentVal.quantity : 1) + prevVal;
  }, 0);
  return totalProducts;
}
