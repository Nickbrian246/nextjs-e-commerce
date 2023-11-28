"use client";
import React from "react";
import {
  menuOptionsForLoggedUserGroup,
  menuOptionsForNotLoggedUserGroup,
} from "../../utils";
import OptionHeader from "../optionHeader";
interface Props {
  isLogged: boolean;
}
export default function OptionsForHeaderMenu(props: Props) {
  const { isLogged } = props;
  return (
    <div className="w-full hidden md:flex justify-end gap-9">
      {isLogged
        ? menuOptionsForLoggedUserGroup.map((option) => (
            <OptionHeader
              isLogged={option.isLogged}
              titleEn={option.titleEn}
              titleEs={option.titleEs}
              icon={option.icon}
              key={option.titleEn}
              route={option.route}
              id={option.id}
            />
          ))
        : menuOptionsForNotLoggedUserGroup.map((option) => (
            <OptionHeader
              isLogged={option.isLogged}
              titleEn={option.titleEn}
              titleEs={option.titleEs}
              icon={option.icon}
              key={option.titleEn}
              route={option.route}
              id={option.id}
            />
          ))}
    </div>
  );
}
