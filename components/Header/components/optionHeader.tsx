"use client";
import React, { useEffect } from "react";
import { HeaderMenuOptionGroup as Props } from "../utils/menuOptionsGroup";
import QuantityIndicator from "@/components/components/quantityIndicator/QuantityIndicator";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { checkShoppingCart } from "@/redux/slices/ShoppingCart";
import { logOut } from "@/redux/slices/auth/sliceForAuth";
export default function OptionHeader(props: Props) {
  const { titleEn, titleEs, icon, route, id } = props;
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkShoppingCart({ key: "shoppingCart" }));
  }, []);
  const handleLogOut = (title: string) => {
    if (title === "Cerrar sesión") dispatch(logOut());
  };
  return (
    <Link href={route}>
      <button onClick={() => handleLogOut(titleEs)}>
        <div className="md:flex hidden flex-col items-center">
          <div
            className={`text-xl relative ${
              titleEs === "Cerrar sesión" ? "text-[#fea3a7]" : ""
            }`}
          >
            {icon}
            {id === "shoppingcart" && productsInShoppingCart > 0 && (
              <span className="absolute -top-3 -right-3">
                <QuantityIndicator />
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">{titleEs}</p>
          </div>
        </div>
      </button>
    </Link>
  );
}
