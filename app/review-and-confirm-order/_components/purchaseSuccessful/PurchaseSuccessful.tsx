import { AddressDb } from "@/services/address";
import { createMyOrder } from "@/services/myOrders/createOrder";
import { getTodayDateInFormatMMDDYYYY } from "@/utils/date";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { createOrderAdapter } from "../../_adapter/createOrderAdapter";
import { MyOrderProduct } from "../../_interfaces/myOrderProduct";
import { deleteShoppingCart } from "@/services/shoppingCartdb/deleteShoppingCart";
import { updateShoppingCartCounter } from "@/redux/slices/ShoppingCart";
import { useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
interface Props {
  groupOfCardProducts: MyOrderProduct[];
  address: AddressDb;
  totalCost: string;
  totalProducts: string;
  totalShippingPrice: string;
  paymentMethod: string;
  paymentMethodNameOwner: string;
}
export default function PurchaseSuccessful(props: Props) {
  const {
    address,
    groupOfCardProducts,
    totalCost,
    totalProducts,
    totalShippingPrice,
    paymentMethod,
    paymentMethodNameOwner,
  } = props;
  const [startTransition, setStartTransition] = useState<boolean>(false);
  const [textAnimation, setTextAnimation] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const titleStyle = "text-xl font-semibold";
  useEffect(() => {
    const currentDate = getTodayDateInFormatMMDDYYYY();
    const { token_access } = getEntityInLocalStorage("userToken");
    const adapterForCreateAnOrder = createOrderAdapter(
      address,
      groupOfCardProducts,
      currentDate,
      totalCost,
      totalProducts,
      totalShippingPrice,
      paymentMethod,
      paymentMethodNameOwner
    );
    setStartTransition(true);

    createMyOrder(adapterForCreateAnOrder, token_access)
      .then((res) => {
        setTextAnimation(true);
        deleteShoppingCart(adapterForCreateAnOrder, token_access).then((res) =>
          dispatch(updateShoppingCartCounter({ count: res }))
        );
        if (typeof res === "string") {
          return router.replace(`/check-purchased?purchasedId=${res}`);
        }
        setIsError(true);
      })
      .catch((err) => {
        setIsError(true);
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err}`,
          })
        );
      });
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
          className={`absolute  left-0   ${
            isError ? "bg-red-600" : "bg-[#22c55e]"
          }
          h-24  transition-all   rounded-md ${
            startTransition
              ? textAnimation
                ? "w-72 duration-100"
                : "w-36 duration-[5000ms]"
              : "w-0"
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
