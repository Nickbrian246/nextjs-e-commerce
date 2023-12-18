"use client";

import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface Button extends ComponentPropsWithRef<"button"> {
  children: string;
  className?: string;
}

export function ButtonIcon({
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
        `scale-150
      ${disabled ? "text-textGray opacity-50" : ""}
      `,
        className
      )}
    >
      {children}
    </button>
  );
}
