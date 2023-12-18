import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { AddressDb } from "@/services/address";
import { CreateOrder } from "@/services/myOrders/interfaces";
import { v4 as uuidv4 } from "uuid";
import { MyOrderProduct } from "../_interfaces/myOrderProduct";
export function createOrderAdapter(
  address: AddressDb,
  groupOfCardProducts: MyOrderProduct[],
  date: string,
  totalCost: string,
  totalProducts: string,
  totalShippingPrice: string,
  paymentMethod: string,
  paymentMethodNameOwner: string
): CreateOrder {
  return {
    myOrders: [
      {
        uniqueId: uuidv4(),
        date,
        deliveryAddress: { ...address },
        products: groupOfCardProducts,
        totalCost,
        totalProducts,
        totalShippingPrice,
        paymentMethod,
        paymentMethodNameOwner,
      },
    ],
  };
}
