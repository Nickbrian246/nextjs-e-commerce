"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function QuantityIndicator() {
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);

  return (
    <div
      className="
    min-w-[20px]
    min-h-[20px]
    rounded-full
  bg-red-600
  text-white
    text-sm
    flex
    justify-center
    items-center
    p-[2px]
    "
    >
      <span> {productsInShoppingCart}</span>
    </div>
  );
}
