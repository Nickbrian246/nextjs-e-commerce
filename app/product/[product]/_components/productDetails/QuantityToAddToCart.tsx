"use client";
import React, { useState, useEffect } from "react";
import {
  addOneItemToProductInShoppingCart,
  subtractOneItemToProductInShoppingCart,
} from "@/redux/slices/ShoppingCart";

import { useDispatch } from "react-redux";
interface Props {
  quantityInShoppingCart: number;
  productId: number;
}
export default function QuantityToAddToCart({
  quantityInShoppingCart,
  productId,
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantity(quantityInShoppingCart);
  }, [quantityInShoppingCart]);
  const handleAddItem = () => {
    dispatch(
      addOneItemToProductInShoppingCart({
        key: "shoppingCart",
        productId: { productId, quantity: 1 },
      })
    );
  };
  const handleSubtractItem = () => {
    dispatch(
      subtractOneItemToProductInShoppingCart({
        key: "shoppingCart",
        product: { productId, quantity: 1 },
      })
    );
  };
  return (
    <div className="flex items-center gap-3">
      <p>Cantidad: </p>
      <div className="p-2 gap-2 border-[2px] border-science-blue-500 flex items-center max-w-[100px] rounded-md">
        <button className=" scale-150" onClick={handleSubtractItem}>
          -
        </button>
        <input
          value={quantity}
          placeholder="0"
          className="min-w-[50px] text-center outline-none"
          type="number"
        />
        <button className="scale-150" onClick={handleAddItem}>
          +
        </button>
      </div>
    </div>
  );
}
