import React from "react";
import { twMerge } from "tailwind-merge";
interface props {
  className?: string;
}

export default function Divider({ className }: props) {
  return <div className={twMerge("w-full h-1 bg-textGray", className)}></div>;
}
