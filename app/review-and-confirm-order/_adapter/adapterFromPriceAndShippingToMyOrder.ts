import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { MyOrderProduct } from "../_interfaces/myOrderProduct";

export function adapterFromPriceAndShippingToMyOrder(
  productsFromPriceAndShipping: AdapterForPriceAndFreeShipping[],
  paymentMethod: string,
  paymentMethodNameOwner: string,
  date: string
): MyOrderProduct[] {
  const productsAdapter: MyOrderProduct[] = productsFromPriceAndShipping.map(
    (product) => {
      if (product.quantity) {
        let subTotal = (
          product.hasOffer
            ? product.priceWithOffer * product.quantity
            : product.price * product.quantity
        ).toLocaleString("es-MX", { style: "currency", currency: "MXN" });
        return {
          ...product,
          paymentMethod,
          paymentMethodNameOwner,
          date,
          subTotal,
          productId: product.id,
        };
      }
      return {
        ...product,
        paymentMethod,
        paymentMethodNameOwner,
        date,
        subTotal: "",
        productId: product.id,
      };
    }
  );
  return productsAdapter;
}
