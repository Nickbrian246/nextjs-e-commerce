"use client";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { getAllOrders } from "@/services/myOrders/getOrders";
import { Order } from "@/services/myOrders/interfaces";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NoOrders from "./_components/NoOrders/NoOrders";
import MobileOrdersTable from "./_components/mobileTable/MobileOrdersTable";
import OrdersTable from "./_components/table/OrdersTable";
import Loading from "./loading";
import { sortOrdersByAscendingDate } from "./_utils";
export default function MyOrdersPage() {
  const [groupOfOrders, setGroupOfOrders] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const token = getEntityInLocalStorage("userToken");
    getAllOrders(token.token_access)
      .then((res) => {
        setIsLoading(false);
        const sortOrdersByDate = sortOrdersByAscendingDate(res);
        setGroupOfOrders(sortOrdersByDate);
      })
      .catch((err) => {
        setIsLoading(false);

        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err.response.data.message}`,
          })
        );
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : groupOfOrders && groupOfOrders.length >= 1 ? (
        <>
          <OrdersTable groupOfOrders={groupOfOrders} />
          <MobileOrdersTable groupOfOrders={groupOfOrders} />
        </>
      ) : (groupOfOrders && groupOfOrders.length === 0) || !groupOfOrders ? (
        <NoOrders />
      ) : null}
    </>
  );
}
