"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import OptionHeader from "./components/optionHeader";
import OptionsForHeaderMenu from "./components/optionsForMenu/OptionsForHeaderMenu";

export default function Header() {
  const [isOpenCollapsableMenu, setIsOpenCollapsableMenu] =
    useState<boolean>(false);
  return (
    <>
      {/* <MenuTop /> */}
      <div className=" flex w-full  ">
        <div className="w-full flex  justify-between p-4 text-white  ">
          <button
            className="text-2xl text-white  md:hidden"
            onClick={() => setIsOpenCollapsableMenu((prevState) => !prevState)}
          >
            <AiOutlineMenu />
          </button>
          <OptionsForHeaderMenu isLogged={true} />
        </div>
      </div>
    </>
  );
}
{
  /* <CollapsableMenu isOpenCollapsableMenu={isOpenCollapsableMenu} />; */
}
