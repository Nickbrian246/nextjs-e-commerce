"use client";
import React from "react";
import { CarouselData } from "../../interfaces";
interface Props {
  GroupOfProducts: CarouselData[];
  currentIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  isMouseOver: boolean;
}
export default function IndexBar(props: Props) {
  const { GroupOfProducts, currentIndex, setSelectedIndex, isMouseOver } =
    props;
  return (
    <div
      style={{ transform: "translate(-50%)" }}
      className={` ${
        isMouseOver ? "opacity-100" : "opacity-0"
      } flex justify-between p-1 gap-2  rounded-sm flex-row w-max bg-white absolute  left-1/2 bottom-0`}
    >
      {GroupOfProducts.map((product, index) => (
        <button
          key={product.id}
          onClick={() => setSelectedIndex(index)}
          className={`${
            currentIndex === index
              ? "bg-science-blue-950 "
              : "bg-science-blue-300 "
          } w-5 h-5 rounded-full`}
        ></button>
      ))}
    </div>
  );
}
