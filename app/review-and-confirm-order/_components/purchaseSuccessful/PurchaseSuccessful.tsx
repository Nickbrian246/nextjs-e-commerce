import React, { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { createMyOrder } from "@/services/myOrders/createOrder";
import { getTodayDateInFormatMMDDYYYY } from "@/utils/date";
import { AddressDb } from "@/services/address";
import { createOrderAdapter } from "../../_adapter/createOrderAdapter";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { MyOrderProduct } from "../../_interfaces/myOrderProduct";
interface Props {
  groupOfCardProducts: MyOrderProduct[];
  address: AddressDb;
}
export default function PurchaseSuccessful(props: Props) {
  const { address, groupOfCardProducts } = props;
  const [startTransition, setStartTransition] = useState<boolean>(false);
  const [purchasedId, setPurchasedId] = useState<string>("");
  const [textAnimation, setTextAnimation] = useState<boolean>(false);
  const router = useRouter();
  setTimeout(() => {
    setStartTransition(true);
  }, 1000);
  setTimeout(() => {
    setTextAnimation(true);
  }, 5000);
  // setTimeout(() => {
  //   router.replace("/check-purchased?purchasedId=${}");
  // }, 7000);
  const titleStyle = "text-xl font-semibold     ";
  useEffect(() => {
    const currentDate = getTodayDateInFormatMMDDYYYY();
    const { token_access } = getEntityInLocalStorage("userToken");
    const adapterForCreateAnOrder = createOrderAdapter(
      address,
      groupOfCardProducts,
      currentDate
    );

    createMyOrder(adapterForCreateAnOrder, token_access)
      .then((res) => setPurchasedId(res))
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div>
      <div
        className="
      w-72
      h-24
      rounded-md
      bg-science-blue-600
      flex
      justify-center
      items-center
      relative
      overflow-hidden
  
      "
      >
        <div
          className={`absolute  left-0   bg-[#22c55e]
          h-24  transition-all duration-[5000ms]  rounded-md ${
            startTransition ? "w-72" : "w-0"
          }
          `}
        >
          <div className="w-full h-full relative flex items-center  justify-center  rounded-md">
            <p
              className={`text-xl font-semibold transition-all duration-1000 ${
                textAnimation ? "opacity-1 scale-100" : " opacity-0 scale-75"
              }`}
            >
              Compra exitosa !!!
            </p>
            <span className="text-4xl text-[#22c55e] absolute -right-9 ">
              <FaTruckMoving />
            </span>
          </div>
        </div>
        <span className={titleStyle}>
          Procesando <br /> tu compra
        </span>
      </div>
    </div>
  );
}
