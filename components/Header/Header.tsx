"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import OptionHeader from "./components/optionHeader";
import OptionsForHeaderMenu from "./components/optionsForMenu/OptionsForHeaderMenu";
import { useSelector } from "react-redux";
export default function Header() {
  const { isLogged } = useSelector((state) => state.loggedUser);

  const [isOpenCollapsableMenu, setIsOpenCollapsableMenu] =
    useState<boolean>(false);
  return (
    <>
      {/* <MenuTop /> */}
      <div className=" flex w-full bg-base-color  ">
        <div className="w-full flex  justify-between p-4 text-white  ">
          <button
            className="text-2xl text-white  md:hidden"
            onClick={() => setIsOpenCollapsableMenu((prevState) => !prevState)}
          >
            <AiOutlineMenu />
          </button>
          <OptionsForHeaderMenu isLogged={isLogged} />
        </div>
      </div>
    </>
  );
}
{
  /* <CollapsableMenu isOpenCollapsableMenu={isOpenCollapsableMenu} />; */
}
