"use client";
import { disableWarning } from "@/redux/slices/globalWarning/globalWarning";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Warning from "../components/Warning";
import OptionsForHeaderMenu from "./components/optionsForMenu/OptionsForHeaderMenu";

export default function Header() {
  const { isLogged } = useSelector((state) => state.loggedUser);
  const {
    duration,
    severity,
    warningMessage,
    warningSubMessage,
    isActiveWarning,
  } = useSelector((state) => state.globalWarning);
  const [isOpenCollapsableMenu, setIsOpenCollapsableMenu] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActiveWarning) {
      setTimeout(() => {
        dispatch(disableWarning());
      }, duration);
    }
  }, [isActiveWarning]);

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
