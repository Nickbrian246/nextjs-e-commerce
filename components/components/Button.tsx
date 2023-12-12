"use client";

import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface Button extends ComponentPropsWithRef<"button"> {
  children: string;
  className?: string;
}

export function Button({
  children,
  className,
  disabled,
  ...ButtonRouter
}: Button) {
  return (
    <button
      {...ButtonRouter}
      disabled={disabled}
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
    >
      {children}
    </button>
  );
}
