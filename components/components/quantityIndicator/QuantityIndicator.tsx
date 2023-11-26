"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkShoppingCart } from "@/redux/slices/ShoppingCart";
export default function QuantityIndicator() {
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const [quantity, setQuantity] = useState<boolean>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkShoppingCart({ key: "shoppingCart" }));
  }, []);
  useEffect(() => {
    setQuantity(productsInShoppingCart);
  }, [productsInShoppingCart]);
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
      <span> {quantity}</span>
    </div>
  );
}
