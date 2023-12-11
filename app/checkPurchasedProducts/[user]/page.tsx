"use client";
import BankCard from "@/app/paymentMethod/[user]/_components/Bankcard/Card";
import { BankCardDetail } from "@/app/paymentMethod/[user]/_interfaces";
import GroupOfProducts from "./_components/groupOfProducts/groupOfProducts";
import SaleResume from "@/app/shoppingcart/_components/shoppingProductCard/SaleResume";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import React, { useEffect, useState } from "react";
import ViewOnlyProductCard from "@/components/components/viewOnlyProductCard/ViewOnlyProductCard";
import { useSelector } from "react-redux";
import { LinkButton } from "@/components/components/LinkButton";
import Divider from "@/components/Divider/Divider";

export default function CheckPurchaseProducts({
  params,
}: {
  params: { user: string };
}) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const [paymentMethodDetails, setPaymentMethodDetails] =
    useState<BankCardDetail>({
      cardNumber: "",
      cvv: "",
      expirationDate: "",
      name: "",
    });

  useEffect(() => {
    const cardData = getEntityInLocalStorage("paymentMethod");
    setPaymentMethodDetails(cardData);
  }, []);
  return (
    <section>
      <h2 className="text-center  text-4xl text-science-blue-700 font-semibold">
        ¡Gracias por su compra!
      </h2>
      <Divider className="mt-5" />
      <div className="flex flex-wrap gap-4">
        <GroupOfProducts
          groupOfProducts={groupOfProducts}
          setGroupOfProducts={setGroupOfProducts}
          setShippingCost={setShippingCost}
          setTotalPrice={setTotalPrice}
        />
        <div>
          <SaleResume
            totalProducts={productsInShoppingCart}
            shippingCost={shippingCost}
            totalPrice={totalPrice}
          />
          <h2 className="text-2xl text-center mt-9">
            Método de pago seleccionado.
          </h2>
          <BankCard value={paymentMethodDetails} />
          <LinkButton className="mt-3" href={"/"}>
            Regresar al inicio
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
