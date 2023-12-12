import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { twMerge } from "tailwind-merge";
interface LoadingSpinner {
  className?: string;
}
export default function LoadingSpinner(props: LoadingSpinner) {
  const { className } = props;
  return <ImSpinner9 className={twMerge("animate-spin ", className)} />;
}
