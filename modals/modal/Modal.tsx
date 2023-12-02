import React, { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <section className="fixed z-20 bg-textGray  w-screen h-screen top-0 left-0">
      {children}
    </section>
  );
}
