"use client";
import React, { useEffect, useState } from "react";
import GroupOfProducts from "./_components/groupOfProducts/GroupOfProducts";
import SaleResume from "@/app/shoppingcart/_components/shoppingProductCard/SaleResume";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { useSelector } from "react-redux";
import BankCard from "@/app/paymentMethod/[user]/_components/Bankcard/Card";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { BankCardDetail } from "@/app/paymentMethod/[user]/_interfaces";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import Modal from "@/modals/modal/Modal";
import PurchaseSuccessful from "./_components/purchaseSuccessful/PurchaseSuccessful";
export default function ReviewAndConfirmOderPage({
  params,
}: {
  params: { user: string };
}) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
    <section className="flex flex-wrap gap-4">
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

        <ButtonRouter
          onClick={() => setIsOpenModal(true)}
          className="mt-10 w-full"
        >
          Realizar compra.
        </ButtonRouter>
      </div>
      {isOpenModal && (
        <Modal className="flex  justify-center items-center">
          <PurchaseSuccessful />
        </Modal>
      )}
    </section>
  );
}
