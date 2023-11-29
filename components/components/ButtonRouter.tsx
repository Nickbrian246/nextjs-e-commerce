"use client";
import { useRouter } from "next/navigation";
import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonRouter extends ComponentPropsWithRef<"button"> {
  children: string;
  route: string;
  className?: string;
}

export function ButtonRouter({
  children,
  route,
  className,
  ...ButtonRouter
}: ButtonRouter) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(route);
      }}
      className={twMerge(
        `
      p-4
      px-6
      rounded-lg
      flex
      justify-center
      bg-science-blue-500
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
