"use client";
import { ChangeEvent } from "react";
import { ButtonIcon } from "@/components/components/ButtonIcon";

interface Props {
  handleAddItem: () => void;
  handleSubtractItem: () => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function QuantityToAddToCart({
  handleAddItem,
  handleSubtractItem,
  quantity,
  handleOnChange,
}: Props) {
  //@ts-ignore

  return (
    <div className="flex items-center gap-3">
      <p>Cantidad: </p>
      <div className="p-2 gap-2 border-[2px] border-science-blue-500 flex items-center max-w-[100px] rounded-md">
        <ButtonIcon
          disabled={quantity <= 1}
          onClick={() => {
            handleSubtractItem();
          }}
        >
          -
        </ButtonIcon>
        <input
          onChange={handleOnChange}
          value={quantity}
          placeholder="0"
          className="min-w-[50px] text-center outline-none"
          type="number"
        />
        <ButtonIcon
          onClick={() => {
            handleAddItem();
          }}
        >
          +
        </ButtonIcon>
      </div>
    </div>
  );
}
