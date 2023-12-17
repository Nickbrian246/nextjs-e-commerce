import React, { ChangeEvent } from "react";
import { BankCardDetail } from "../../_interfaces";
import { formateCardNumbers, formateExpirationDate } from "../../_utils";
interface Props {
  value: BankCardDetail;
  setValue: React.Dispatch<React.SetStateAction<BankCardDetail>>;
}
export default function CardForm({ setValue, value }: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value;
    if (name === "name") {
      setValue((prevValue) => {
        const filterValueOnlyString = value.replace(/[^a-zA-Z\s]/g, "");
        const valueToUpperCase = filterValueOnlyString.toLocaleUpperCase();
        return {
          ...prevValue,
          [name]: valueToUpperCase,
        };
      });
      return;
    }
    const filterOnlyNumbers = value.replace(/[^\d]/g, "");

    if (name === "cvv" && value.length >= 4) {
      console.log("entrando");

      return setValue((prevValue) => {
        return { ...prevValue, [name]: prevValue[name] };
      });
    }

    setValue((prevValue) => {
      if (name === "expirationDate") {
        const formateDate = formateExpirationDate(filterOnlyNumbers);
        return {
          ...prevValue,
          [name]: formateDate,
        };
      }
      if (name === "cardNumber") {
        const formateCardNumber = formateCardNumbers(filterOnlyNumbers);
        return {
          ...prevValue,
          [name]: formateCardNumber,
        };
      }
      return {
        ...prevValue,
        [name]: filterOnlyNumbers,
      };
    });
  };
  return (
    <form className="p-1 flex flex-col gap-5">
      <div className="flex gap-1 items-center ">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="clientName"
        >
          nombre completo
        </label>
        <input
          value={value.name}
          className="p-1 rounded-lg border-2 uppercase "
          type="text"
          placeholder="Jose torres shohyue"
          id="clientName"
          name="name"
          onChange={(e) => {
            handleInput(e, "name");
          }}
        />
      </div>

      <div className="flex gap-1 items-center">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="cardNumberForm"
        >
          numero de tarjeta
        </label>
        <input
          value={value.cardNumber}
          className="p-1 rounded-lg border-2 "
          type="text"
          placeholder="4323 2312 1245 1242"
          id="cardNumberForm"
          name="cardNumber"
          onChange={(e) => {
            handleInput(e, "cardNumber");
          }}
        />
      </div>
      <div className="flex gap-3 items-center">
        <label
          htmlFor="expirationForm"
          className="text-lg font-medium first-letter:uppercase"
        >
          Vencimiento
        </label>
        <input
          value={value.expirationDate}
          className="rounded-lg max-w-[60px] p-1"
          type="text"
          placeholder="12/23"
          id="expirationForm"
          name="expirationDate"
          onChange={(e) => {
            handleInput(e, "expirationDate");
          }}
        />
        <div className="flex gap-1 items-center">
          <label htmlFor="Cvv" className="text-lg font-medium">
            CVV
          </label>
          <input
            value={value.cvv}
            className="rounded-lg max-w-[60px] p-1"
            type="text"
            placeholder="123"
            id="Cvv"
            name="cvv"
            onChange={(e) => {
              handleInput(e, "cvv");
            }}
          />
        </div>
      </div>
    </form>
  );
}
