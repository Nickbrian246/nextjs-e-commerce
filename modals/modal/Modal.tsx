import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: ReactNode;
  className?: string;
  handleCloseModal?: () => void;
}

export default function Modal({
  children,
  className,
  handleCloseModal,
}: Props) {
  return (
    <section
      className={twMerge("z-10", className)}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        bottom: 0,
        left: 0,
        background: "rgb(0,0,0,.5)",
        overflow: "auto",
      }}
    >
      <div className="z-20">{children}</div>
    </section>
  );
}
