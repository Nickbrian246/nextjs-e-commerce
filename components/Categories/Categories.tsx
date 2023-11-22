"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import CollapsableCategoryBar from "./collapsableBar/CollapsableCategoryBar";
interface Props {
  title?: string;
}
export default function Categories(props: Props) {
  const { title } = props;
  return (
    <div
      className="
      w-[300px]
      relative
      hidden
      md:flex "
    >
      <div
        className="
      flex
      w-full
      p-4
    text-white
      font-bold
      bg-[#134c91]
      gap-5 
      items-center 
      h-fit
      "
      >
        <span className="text-white font-extrabold text-2xl">
          <AiOutlineMenu />
        </span>
        <p className="uppercase">{title ? title : "CATEGORIÁS"}</p>
        <CollapsableCategoryBar />
      </div>
    </div>
  );
}
