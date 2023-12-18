import { MyOrderProduct } from "@/app/review-and-confirm-order/_interfaces/myOrderProduct";
import { AddressDb } from "@/services/address";
export interface Order {
  deliveryAddress: AddressDb;
  date: string;
  uniqueId: string;
  products: MyOrderProduct[];
  totalCost: string;
  totalProducts: string;
  totalShippingPrice: string;
  paymentMethod: string;
  paymentMethodNameOwner: string;
}
