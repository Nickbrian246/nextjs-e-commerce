"use client";
import React, { useState } from "react";

export default function QuantityToAddToCart() {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddItem = () => {
    setQuantity((preValue) => preValue + 1);
  };
  const handleSubtractItem = () => {
    setQuantity((preValue) => {
      if (preValue === 1) return 1;
      return preValue - 1;
    });
  };
  return (
    <div className="flex items-center gap-3">
      <p>Cantidad: </p>
      <div className="p-2 gap-2 border-[2px] border-science-blue-500 flex items-center max-w-[100px] rounded-md">
        <button className=" scale-150" onClick={handleSubtractItem}>
          -
        </button>
        <input
          value={quantity}
          placeholder="0"
          className="min-w-[50px] text-center outline-none"
          type="number"
        />
        <button className="scale-150" onClick={handleAddItem}>
          +
        </button>
      </div>
    </div>
  );
}
