"use client";
import React from "react";
import { FcSimCardChip } from "react-icons/fc";
import img from "@/assets/Visa.png";
import Image from "next/image";
import { BankCardDetail } from "../../_interfaces";
import { checkBankCardSystem } from "../../_utils";
export default function BankCard({ value }: { value: BankCardDetail }) {
  const title = " text-sm text-[#d4d4d4]";
  const subTitle = "text-sm text-[#e5e5e5] uppercase";
  const bankImg = checkBankCardSystem(value.cardNumber);

  return (
    <div className="sm:w-96 w-72 flex flex-col gap-3 p-2 h-fit rounded-lg bg-[#171717]">
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
          {value.cardNumber ? value.cardNumber : "4323 2312 1245 1242"}
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
            <span className={subTitle}> {value.cvv ? value.cvv : "123"}</span>
          </div>
          <div className="flex flex-col">
            <span className={title}>Vencimiento</span>
            <span className={subTitle}>
              {value.expirationDate ? value.expirationDate : "12/23"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
