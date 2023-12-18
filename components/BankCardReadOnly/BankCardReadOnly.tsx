import { BankCardDetail } from "@/app/payment-method/_interfaces";
import { checkBankCardSystem } from "@/app/payment-method/_utils";
import img from "@/assets/Visa.png";
import { FcSimCardChip } from "react-icons/fc";
import Image from "next/image";

interface Value extends Pick<BankCardDetail, "cardNumber" | "name"> {}

export default function BankCardReadOnly({ value }: { value: Value }) {
  const title = " text-sm text-[#d4d4d4]";
  const subTitle = "text-sm text-[#e5e5e5] uppercase";
  const bankImg = checkBankCardSystem(value.cardNumber);
  const createCardNumber = `**** **** **** ${value.cardNumber}`;
  const cvvHidden = `***`;
  return (
    <div className="sm:w-96 w-74 flex flex-col gap-3 p-2 h-fit rounded-lg bg-[#171717] m-auto">
      <div className="p-2 flex w-full justify-between items-center ">
        <span className="text-4xl">
          <FcSimCardChip />
        </span>
        <Image
          src={bankImg === "Tipo de tarjeta no identificado" ? img : bankImg}
          alt="bank type logo  "
        />
      </div>
      <div className="w-full  flex justify-center">
        <span className="text-lg text-white font-semibold">
          {value.cardNumber ? createCardNumber : "**** **** **** 1242"}
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className={title}>Nombre</span>
          <span className={subTitle}>
            {value.name ? value.name : "jose torres shohyue"}
          </span>
        </div>
        <div className="flex w-fit gap-3 ">
          <div className="flex flex-col">
            <span className={title}>CVV</span>
            <span className={subTitle}> {"***"}</span>
          </div>
          <div className="flex flex-col">
            <span className={title}>Vencimiento</span>
            <span className={subTitle}>{"**/**"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
