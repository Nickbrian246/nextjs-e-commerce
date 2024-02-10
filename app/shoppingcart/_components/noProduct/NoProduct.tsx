import { LinkButton } from "@/components/components/LinkButton";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";

export default function NoProduct() {
  return (
    <div className=" lg:min-w-[580px] flex  gap-3 min-h-[200px] p-4 flex-col  justify-center items-center shadow-lg">
      <p className="text-lg font-semibold text-center ">
        Aún no tienes productos en tu carrito de compras. <br />
        Te invitamos a que agregues algunos.
      </p>
      <span className="text-4xl ">
        <FaShoppingBag />
      </span>
      <LinkButton href={"/"}>Vamos de compras!!!</LinkButton>
    </div>
  );
}
