import React from "react";

export default function AddToCartAndBuyButtons() {
  return (
    <div className="flex w-full  p-4 flex-col gap-4">
      <button className="p-2 bg-science-blue-600 text-base rounded-md text-white">
        Comprar
      </button>
      <button className="p-2 bg-science-blue-600 text-base rounded-md text-white">
        Agregar al carrito
      </button>
    </div>
  );
}
