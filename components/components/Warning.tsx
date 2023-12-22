import React from "react";
import { WarningInitialState } from "@/redux/slices/globalWarning/globalWarning";

export default function Warning(props: WarningInitialState) {
  const { duration, severity, warningMessage, warningSubMessage } = props;
  const colorOptions = {
    warning: ` bg-[#facc15]`,
    success: ` bg-[#22c55e]`,
    error: ` bg-[#dc2626]`,
  };
  const color = colorOptions[severity];

  return (
    <div
      className={`
      flex 
      absolute
      z-50
      p-4
      justify-center
      items-center
      -bottom-28 
      m-auto
      left-0
      right-0
      `}
    >
      <div
        className={`
        flex 
        flex-col 
        rounded-lg
        justify-center 
        items-center 
       ${color}
        p-4
        sm:min-w-[300px]
        `}
      >
        <p
          className={`text-lg sm:text-xl font-medium ${
            severity === "error" && "text-white"
          }  `}
        >
          {warningMessage}
        </p>
        <p
          className={`text-xs sm:text-lg  font-medium ${
            severity === "error" && "text-white"
          }  `}
        >
          {warningSubMessage}
        </p>
      </div>
    </div>
  );
}
