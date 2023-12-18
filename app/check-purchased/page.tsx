"use client";
import BankCard from "@/app/paymentMethod/[user]/_components/Bankcard/Card";
import { BankCardDetail } from "@/app/paymentMethod/[user]/_interfaces";
import SaleResume from "@/app/shoppingcart/_components/shoppingProductCard/SaleResume";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import React, { useEffect, useState } from "react";
import ViewOnlyProductCard from "@/components/components/viewOnlyProductCard/ViewOnlyProductCard";
import { useSelector } from "react-redux";
import { LinkButton } from "@/components/components/LinkButton";
import Divider from "@/components/Divider/Divider";
import AddressCardReadOnly from "@/components/Address/AddressCard/AddressCardReadOnly";
import TotalCostResume from "@/components/TotalCostResume/TotalCostResume";
import { getOneMyOrder } from "@/services/myOrders/getOneOrder";
import { useSearchParams } from "next/navigation";
import { AddressDb } from "@/services/address";
import BankCardReadOnly from "@/components/BankCardReadOnly/BankCardReadOnly";
import GroupOfProducts from "../review-and-confirm-order/_components/groupOfProducts/GroupOfProducts";
import { MyOrderProduct } from "../review-and-confirm-order/_interfaces/myOrderProduct";

export default function CheckPurchaseProducts() {
  const [deliveryAddress, setDeliveryAddress] = useState<AddressDb>();
  const [totalCost, setTotalCost] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState<string>();
  const [totalShippingPrice, setTotalShippingPrice] = useState<string>("");

  const [groupOfProducts, setGroupOfProducts] = useState<MyOrderProduct[]>([]);
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const [paymentMethodDetails, setPaymentMethodDetails] = useState<
    Pick<BankCardDetail, "cardNumber" | "name">
  >({
    cardNumber: "",
    name: "",
  });
  const searchParams = useSearchParams();
  const purchasedId = searchParams.get("purchasedId");

  useEffect(() => {
    if (purchasedId) {
      const { token_access } = getEntityInLocalStorage("userToken");
      getOneMyOrder(purchasedId, token_access)
        .then((res) => {
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
    <section className="flex justify-center flex-col items-center">
      <h2 className="text-center  text-4xl text-science-blue-700 font-semibold">
        ¡Gracias por su compra!
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
          <LinkButton className="mt-3" href={"/"}>
            Regresar al inicio
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
