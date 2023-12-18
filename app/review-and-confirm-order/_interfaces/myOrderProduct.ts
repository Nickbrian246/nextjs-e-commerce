import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";

export interface MyOrderProduct extends AdapterForPriceAndFreeShipping {
  paymentMethod: string;
  paymentMethodNameOwner: string;
  date: string;
  subTotal: string;
  productId: number;
}
