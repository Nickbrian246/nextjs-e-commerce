"use client";
import { updateShoppingCartCounter } from "@/redux/slices/ShoppingCart";
import {
  activeWarning,
  disableWarning,
} from "@/redux/slices/globalWarning/globalWarning";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Warning from "../components/Warning";
import OptionsForHeaderMenu from "./components/optionsForMenu/OptionsForHeaderMenu";
import { getShoppingCartCounter } from "./services/getShoppingCartCounter";
import CollapsableMenu from "./collapsableMenu/CollapsableMenu";
import { isLogged as checkIsUserLogged } from "@/redux/slices/auth/sliceForAuth";
import { useRouter } from "next/navigation";
export default function Header() {
  const [isOpenCollapsableMenu, setIsOpenCollapsableMenu] =
    useState<boolean>(false);
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    duration,
    severity,
    warningMessage,
    warningSubMessage,
    isActiveWarning,
    //@ts-ignore
  } = useSelector((state) => state.globalWarning);

  // disable global warning
  useEffect(() => {
    if (isActiveWarning) {
      setTimeout(() => {
        dispatch(disableWarning());
      }, duration);
    }
  }, [isActiveWarning]);

  // once user is logged get the counter for shopping cart
  useEffect(() => {
    dispatch(checkIsUserLogged());

    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");

      getShoppingCartCounter(token.token_access)
        .then((res) => {
          console.log(res);
          dispatch(updateShoppingCartCounter({ count: res }));
        })
        .catch((err) => {
          if (err.response.data.message === "Unauthorized") {
            return dispatch(
              activeWarning({
                isActiveWarning: true,
                severity: "error",
                warningMessage: `Session expirada por favor inicie sesión`,
              })
            );
          }
          return dispatch(
            activeWarning({
              isActiveWarning: true,
              severity: "error",
              warningMessage: `${err.response.data.message}`,
            })
          );
        });
    }
  }, [isLogged]);

  return (
    <>
      {/* <MenuTop /> */}
      <div className=" flex w-full bg-base-color  relative">
        <div className="w-full flex  justify-between p-4 text-white  ">
          <button
            className="text-2xl text-white  md:hidden"
            onClick={() => setIsOpenCollapsableMenu((prevState) => !prevState)}
          >
            <AiOutlineMenu />
          </button>
          <OptionsForHeaderMenu isLogged={isLogged} />
        </div>
        <CollapsableMenu
          isLogged={isLogged}
          isOpenCollapsableMenu={isOpenCollapsableMenu}
        />
        {isActiveWarning && (
          <Warning
            duration={duration}
            warningMessage={warningMessage}
            warningSubMessage={warningSubMessage}
            severity={severity}
          />
        )}
      </div>
    </>
  );
}
