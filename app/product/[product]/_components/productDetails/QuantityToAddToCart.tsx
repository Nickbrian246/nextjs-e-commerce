"use client";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";

interface Props {
  quantityInShoppingCart: number;
  productId: number;
  handleAddItem: (key: string, product: ShoppingCartProduct) => void;
  handleSubtractItem: (key: string, product: ShoppingCartProduct) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function QuantityToAddToCart({
  quantityInShoppingCart,
  productId,
  handleAddItem,
  handleSubtractItem,
  quantity,
  setQuantity,
  handleOnChange,
}: Props) {
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    const groupOfProducts = getEntityProductsFromLocalStorage("shoppingCart");
    if (Array.isArray(groupOfProducts)) {
      const product = groupOfProducts.find(
        (product) => product.productId === productId
      );

      if (product?.quantity) setQuantity(product.quantity);
      else return;
    }
  }, [productsInShoppingCart]);

  return (
    <div className="flex items-center gap-3">
      <p>Cantidad: </p>
      <div className="p-2 gap-2 border-[2px] border-science-blue-500 flex items-center max-w-[100px] rounded-md">
        <button
          className=" scale-150"
          onClick={() => {
            handleSubtractItem("shoppingCart", { productId, quantity: 1 });
          }}
        >
          -
        </button>
        <input
          onChange={() => handleOnChange}
          value={quantity}
          placeholder="0"
          className="min-w-[50px] text-center outline-none"
          type="number"
        />
        <button
          className="scale-150"
          onClick={() => {
            handleAddItem("shoppingCart", { productId, quantity: 1 });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
