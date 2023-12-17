"use client";
import SaleResume from "@/app/shoppingcart/_components/shoppingProductCard/SaleResume";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import Modal from "@/modals/modal/Modal";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BankCard from "../payment-method/_components/Bankcard/Card";
import { BankCardDetail } from "../payment-method/_interfaces";
import GroupOfProducts from "./_components/groupOfProducts/GroupOfProducts";
import PurchaseSuccessful from "./_components/purchaseSuccessful/PurchaseSuccessful";
import { PaymentMethodCardSelected } from "./_interfaces";
import { getOneUserAddress } from "@/services/address";
import { useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { AddressDb } from "@/services/address";
import AddressCardReadOnly from "@/components/Address/AddressCard/AddressCardReadOnly";
import { adapterFromPriceAndShippingToMyOrder } from "./_adapter/adapterFromPriceAndShippingToMyOrder";
import { getTodayDateInFormatMMDDYYYY } from "@/utils/date";
import { MyOrderProduct } from "./_interfaces/myOrderProduct";

export default function ReviewAndConfirmOderPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<AddressDb>();
  const [myOrderProducts, setMyOrdersProducts] = useState<MyOrderProduct[]>();
  const [paymentMethodDetails, setPaymentMethodDetails] =
    useState<BankCardDetail>({
      cardNumber: "",
      cvv: "",
      expirationDate: "",
      name: "",
    });
  const {
    groupOfProducts,
    calculateShoppingCart,
    productsInShoppingCart,
    shippingCost,
    totalPrice,
  } = useShoppingCart();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const addressId = searchParams.get("address") ?? "";

  useEffect(() => {
    const cardData: PaymentMethodCardSelected =
      getEntityInLocalStorage("paymentMethod");
    const { token_access } = getEntityInLocalStorage("userToken");
    setPaymentMethodDetails(cardData);
    if (product === "sc") {
      calculateShoppingCart();
    }
    getOneUserAddress(addressId, token_access)
      .then((res) => setUserAddress(res))
      .catch((err) => {
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err.response.data.message}`,
          })
        );
      });
  }, []);

  useEffect(() => {
    const currentDate = getTodayDateInFormatMMDDYYYY();
    const { name, cardNumber } = paymentMethodDetails;
    const numberFixedTo4Digits = cardNumber.slice(16).trim();

    const toMyOrderAdapter = adapterFromPriceAndShippingToMyOrder(
      groupOfProducts,
      numberFixedTo4Digits,
      name,
      currentDate
    );
    setMyOrdersProducts(toMyOrderAdapter);
  }, [groupOfProducts]);
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-col gap-5 flex-wrap">
        {myOrderProducts && (
          <GroupOfProducts groupOfProducts={myOrderProducts} />
        )}
        {userAddress && (
          <>
            <h2 className="text-2xl text-center font-medium">
              Dirección de envío
            </h2>
            <AddressCardReadOnly address={userAddress} />
          </>
        )}
      </div>
      <div>
        <SaleResume
          totalProducts={productsInShoppingCart}
          shippingCost={shippingCost}
          totalPrice={totalPrice}
        />
        <h2 className="sm:text-2xl  text-xl text-center mt-9">
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
      {isOpenModal && userAddress && myOrderProducts && (
        <Modal className="flex  justify-center items-center">
          <PurchaseSuccessful
            address={userAddress}
            groupOfCardProducts={myOrderProducts}
          />
        </Modal>
      )}
    </section>
  );
}
