import React from "react";
import { HeaderMenuOptionGroup as Props } from "../utils/menuOptionsGroup";
export default function OptionHeader(props: Props) {
  const { titleEn, titleEs, icon } = props;
  return (
    <button>
      <div className="md:flex hidden flex-col items-center">
        <div
          className={`text-lg ${
            titleEs === "Cerrar sesión" ? "text-[#fea3a7]" : ""
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{titleEs}</p>
        </div>
      </div>
    </button>
  );
}
