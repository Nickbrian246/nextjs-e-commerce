import { AdapterForPriceAndFreeShipping } from "../interfaces";
export function calculateTotalPrice(
  groupOfProducts: AdapterForPriceAndFreeShipping[]
): number {
  const total: number = groupOfProducts.reduce((prevValue, currentValue) => {
    if (currentValue.hasOffer) {
      const priceMultipliedByUnits =
        currentValue.priceWithOffer * (currentValue.quantity || 1);
      return priceMultipliedByUnits + prevValue;
    }
    const priceMultipliedByUnits =
      currentValue.price * (currentValue.quantity || 1);
    return priceMultipliedByUnits + prevValue;
  }, 0);
  return total;
}
