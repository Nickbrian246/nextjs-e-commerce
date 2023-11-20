import React, { useEffect, useState } from "react";
import { isServer } from "@/utils/utils/utils";
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (isServer()) {
      return {
        width: 0,
        height: 0,
      };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  });
  return windowSize;
}
