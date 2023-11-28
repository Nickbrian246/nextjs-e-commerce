"use client";
import React, { useEffect } from "react";
import { HeaderMenuOptionGroup as Props } from "../utils/menuOptionsGroup";
import QuantityIndicator from "@/components/components/quantityIndicator/QuantityIndicator";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { checkShoppingCart } from "@/redux/slices/ShoppingCart";
export default function OptionHeader(props: Props) {
  const { titleEn, titleEs, icon, route, id } = props;
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkShoppingCart({ key: "shoppingCart" }));
  }, []);

  return (
    <Link href={route}>
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
    </Link>
  );
}
