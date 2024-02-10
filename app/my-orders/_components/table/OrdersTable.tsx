import { LinkButton } from "@/components/components/LinkButton";
import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Order } from "@/services/myOrders/interfaces";
interface Props {
  groupOfOrders: Order[];
}
export default function OrdersTable({ groupOfOrders }: Props) {
  return (
    <div className="overflow-x-auto hidden md:flex">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-black">
          <tr>
            <th className="py-3 px-6 text-left">Fecha</th>
            <th className="py-3 px-6 text-left">Método de Pago</th>
            <th className="py-3 px-6 text-left">Nombre </th>
            <th className="py-3 px-6 text-left lg:flex hidden">Estado </th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {groupOfOrders &&
            groupOfOrders.map((order) => (
              <tr
                key={order.uniqueId}
                className="transition-all hover:bg-gray-100"
              >
                <td className="py-4 px-6">{order.date}</td>
                <td className="py-4 px-6 font-medium ">
                  <span className="flex justify-center items-center text-lg">
                    <FaCreditCard />
                  </span>
                </td>
                <td className="py-4 px-6">{order.paymentMethodNameOwner}</td>
                <td className="py-6 px-6 lg:flex hidden">
                  <span className="flex gap-2 items-center justify-center">
                    <span className="text-xl">
                      <TbTruckDelivery />
                    </span>
                    Completado
                  </span>
                </td>
                <td className="py-4 px-6">{order.totalCost}</td>
                <td className="py-4 px-6">
                  <LinkButton
                    href={`/my-orders/order?id=${order.uniqueId}`}
                    className="bg-science-blue-500 text-white py-2 px-4 rounded transition-all transform hover:scale-105"
                  >
                    Ver
                  </LinkButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
