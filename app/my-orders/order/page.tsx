"use client";
import { BankCardDetail } from "@/app/payment-method/_interfaces";
import GroupOfProducts from "@/app/review-and-confirm-order/_components/groupOfProducts/GroupOfProducts";
import { MyOrderProduct } from "@/app/review-and-confirm-order/_interfaces/myOrderProduct";
import AddressCardReadOnly from "@/components/Address/AddressCard/AddressCardReadOnly";
import BankCardReadOnly from "@/components/BankCardReadOnly/BankCardReadOnly";
import Divider from "@/components/Divider/Divider";
import TotalCostResume from "@/components/TotalCostResume/TotalCostResume";
import { AddressDb } from "@/services/address";
import { getOneMyOrder } from "@/services/myOrders/getOneOrder";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function OrderPage() {
  const [deliveryAddress, setDeliveryAddress] = useState<AddressDb>();
  const [totalCost, setTotalCost] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState<string>();
  const [totalShippingPrice, setTotalShippingPrice] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [groupOfProducts, setGroupOfProducts] = useState<MyOrderProduct[]>([]);
  //@ts-ignore

  const [paymentMethodDetails, setPaymentMethodDetails] = useState<
    Pick<BankCardDetail, "cardNumber" | "name">
  >({
    cardNumber: "",
    name: "",
  });
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const { token_access } = getEntityInLocalStorage("userToken");
      getOneMyOrder(id, token_access)
        .then((res) => {
          setDate(res.date);
          setDeliveryAddress(res.deliveryAddress);
          setTotalCost(res.totalCost);
          setTotalProducts(res.totalProducts);
          setTotalShippingPrice(res.totalShippingPrice);
          setGroupOfProducts(res.products);
          setPaymentMethodDetails({
            cardNumber: res.paymentMethod,
            name: res.paymentMethodNameOwner,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      {groupOfProducts && groupOfProducts.length >= 1 ? (
        <section className="flex justify-center flex-col items-center">
          <h2 className="text-center  text-4xl text-science-blue-700 font-semibold">
            Fecha: {date}
          </h2>
          <Divider className="mt-5" />
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col gap-4">
              <GroupOfProducts groupOfProducts={groupOfProducts} />
              {deliveryAddress && (
                <>
                  <h2 className="text-center text-2xl font-bold">
                    Dirección de envío
                  </h2>
                  <AddressCardReadOnly address={deliveryAddress} />
                </>
              )}
            </div>
            <div>
              {totalProducts && (
                <TotalCostResume
                  totalProducts={Number(totalProducts)}
                  shippingCost={totalShippingPrice}
                  totalPrice={totalCost}
                />
              )}
              <h2 className="text-2xl text-center mt-9">
                Método de pago seleccionado.
              </h2>
              <BankCardReadOnly value={paymentMethodDetails} />
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
