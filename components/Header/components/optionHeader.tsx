import React from "react";
import { HeaderMenuOptionGroup as Props } from "../utils/menuOptionsGroup";
import QuantityIndicator from "@/components/components/quantityIndicator/QuantityIndicator";
import Link from "next/link";
export default function OptionHeader(props: Props) {
  const { titleEn, titleEs, icon, route, id } = props;
  return (
    <Link href={route}>
      <div className="md:flex hidden flex-col items-center">
        <div
          className={`text-xl relative ${
            titleEs === "Cerrar sesión" ? "text-[#fea3a7]" : ""
          }`}
        >
          {icon}
          {id === "shoppingcart" && (
            <span className="absolute -top-3 -right-3">
              <QuantityIndicator />
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{titleEs}</p>
        </div>
      </div>
    </Link>
  );
}
