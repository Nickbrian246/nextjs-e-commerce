"use client";
import { useState } from "react";
import BankCard from "./_components/Bankcard/Card";
import Image from "next/image";
import CardForm from "./_components/cardForm/CardForm";
import { BankCardDetail } from "./_interfaces";
import visa from "@/assets/Visa.png";
import mastercard from "@/assets/Mastercard.png";
import americanExpress from "@/assets/American-express.png";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { createEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useRouter } from "next/navigation";
import Modal from "@/modals/modal/Modal";
import { useSearchParams } from "next/navigation";
export default function PaymentMethodPage() {
  const [cartInformation, setCartInformation] = useState<BankCardDetail>({
    name: "",
    cvv: "",
    expirationDate: "",
    cardNumber: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const addressId = searchParams.get("address");
  const quantity = searchParams.get("quantity");

  const isButtonDisable =
    cartInformation.cardNumber.length === 23 &&
    cartInformation.cvv.length === 3 &&
    cartInformation.expirationDate.length === 7;
  const handleBtn = () => {
    createEntityInLocalStorage("paymentMethod", cartInformation);
    if (!quantity) {
      router.push(
        `/review-and-confirm-order?product=${product}&address=${addressId}`
      );
    }
    router.push(
      `/review-and-confirm-order?product=${product}&quantity=${quantity}&address=${addressId}`
    );
  };
  return (
    <>
      <h2 className="text-3xl font-bold text-science-blue-400">
        Agrega tu información bancaria.
      </h2>

      <div className="flex gap-2">
        <Image src={visa} alt="visa logo" />
        <Image src={mastercard} alt="mastercard logo" />
        <Image src={americanExpress} alt="americanExpress logo" />
      </div>
      <BankCard value={cartInformation} />
      <CardForm setValue={setCartInformation} value={cartInformation} />
      <ButtonRouter onClick={handleBtn} disabled={!isButtonDisable}>
        Continuar a la confirmación del pedido.
      </ButtonRouter>
    </>
  );
}
