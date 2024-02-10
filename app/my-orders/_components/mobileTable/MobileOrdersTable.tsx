import { LinkButton } from "@/components/components/LinkButton";
import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { Order } from "@/services/myOrders/interfaces";
interface Props {
  groupOfOrders: Order[];
}
export default function MobileOrdersTable({ groupOfOrders }: Props) {
  return (
    <div className="  md:hidden flex flex-col gap-4 w-full border-t-2 border-[#1f2937]">
      {groupOfOrders?.map((order) => (
        <div
          className="flex  flex-col gap-2 p-1  border-b-2 border-[#1f2937]"
          key={order.uniqueId}
        >
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Fecha:</p>
            <p>{order.date}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Método de Pago:</p>
            <p>{order.paymentMethod}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Nombre:</p>
            <p>{order.paymentMethodNameOwner}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Estado:</p>
            <p className="flex gap-2 items-center">
              <span className="text-lg">
                <TbTruckDelivery />
              </span>{" "}
              Completado
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Total:</p>
            <p>{order.totalCost}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left font-bold">Acciones:</p>
            <LinkButton
              href={`/my-orders/order?id=${order.uniqueId}`}
              className="bg-science-blue-500 text-white py-2 px-4 rounded transition-all transform hover:scale-105"
            >
              Ver
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}
