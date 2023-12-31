export function hasOffer(price: number): boolean {
  return price > 80;
}
export function newPriceWithDiscount(price: number, discount: number): number {
  return price - discountAmount(price, discount);
}
export function discountAmount(price: number, discount: number): number {
  return parseFloat(((price * discount) / 100).toFixed(2));
}

export function hasFreeShipping(
  price: number,
  priceForHasFreeShipping?: number
): boolean {
  if (priceForHasFreeShipping) return price > priceForHasFreeShipping ?? 100;
  return price > 100;
}
