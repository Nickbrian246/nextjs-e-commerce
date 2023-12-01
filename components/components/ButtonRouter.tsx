"use client";

import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonRouter extends ComponentPropsWithRef<"button"> {
  children: string;
  className?: string;
}

export function ButtonRouter({
  children,
  className,
  disabled,
  ...ButtonRouter
}: ButtonRouter) {
  return (
    <button
      disabled
      className={twMerge(
        `
      p-4
      px-6
      rounded-lg
      flex
      justify-center
      ${disabled ? "bg-textGray opacity-50" : "bg-science-blue-500"}
      font-semibold
      text-white
      active:bg-science-blue-700
      `,
        className
      )}
      {...ButtonRouter}
    >
      {children}
    </button>
  );
}
