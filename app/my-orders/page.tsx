"use client";
import { getAllOrders } from "@/services/myOrders/getOrders";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useState } from "react";
import { Order } from "@/services/myOrders/interfaces";
import { FaCreditCard } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/components/LinkButton";

export default function MyOrdersPage() {
  const [groupOfOrders, setGroupOfOrders] = useState<Order[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getEntityInLocalStorage("userToken");
    getAllOrders(token.token_access)
      .then((res) => setGroupOfOrders(res))
      .catch((err) => {
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err.data}`,
          })
        );
      });
  }, []);

  return (
    <>
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
                  <td className="py-4 px-6 lg:flex hidden">
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
    </>
  );
}
