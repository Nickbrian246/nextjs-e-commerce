"use client";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import {
  menuOptionsForLoggedUserGroup,
  menuOptionsForNotLoggedUserGroup,
} from "../../utils";
import OptionHeader from "../optionHeader";
import Link from "next/link";
import { CgSearch } from "react-icons/cg";
import Search from "../Search";
interface Props {
  isLogged: boolean;
}
export default function OptionsForHeaderMenu(props: Props) {
  const { isLogged } = props;

  return (
    <>
      <Link className="" href={"/"}>
        <h1 className="text-lg border-b  border-b-[#d1d5db]">Smart shopping</h1>
      </Link>
      <Search />
      <div className=" hidden md:flex items-center justify-end gap-9 ">
        {isLogged
          ? menuOptionsForLoggedUserGroup.map((option) => (
              <OptionHeader
                key={option.id}
                isLogged={option.isLogged}
                titleEn={option.titleEn}
                titleEs={option.titleEs}
                icon={option.icon}
                route={option.route}
                id={option.id}
              />
            ))
          : menuOptionsForNotLoggedUserGroup.map((option) => (
              <OptionHeader
                key={option.id}
                isLogged={option.isLogged}
                titleEn={option.titleEn}
                titleEs={option.titleEs}
                icon={option.icon}
                route={option.route}
                id={option.id}
              />
            ))}
      </div>
    </>
  );
}
