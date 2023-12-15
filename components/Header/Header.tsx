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
export default function Header() {
  const [isOpenCollapsableMenu, setIsOpenCollapsableMenu] =
    useState<boolean>(false);
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const {
    duration,
    severity,
    warningMessage,
    warningSubMessage,
    isActiveWarning,
  } = useSelector((state) => state.globalWarning);

  useEffect(() => {
    if (isActiveWarning) {
      setTimeout(() => {
        dispatch(disableWarning());
      }, duration);
    }
  }, [isActiveWarning]);

  useEffect(() => {
    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");
      getShoppingCartCounter(token.token_access)
        .then((res) => {
          dispatch(updateShoppingCartCounter({ count: res }));
        })
        .catch((err) => {
          return dispatch(
            activeWarning({
              isActiveWarning: true,
              severity: "error",
              warningMessage: `${err.message}`,
            })
          );
        });
    }
  }, []);

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
{
  /* <CollapsableMenu isOpenCollapsableMenu={isOpenCollapsableMenu} />; */
}
