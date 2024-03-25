import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getGoogleCredentials } from "./services/getGoogleCredentials";
import useContextLanguage from "@/hooks/useContextLanguage";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export default function GoogleOauth() {
  const [currentLanguage] = useContextLanguage()
  const handleClick = async () => {
    window.location.href = `${BASE_URL}/auth/google/login`;
  };
  return (
    <button
      onClick={handleClick}
      className="
      m-auto
    px-4
    py-2
    rounded-md
    flex
    items-center
    gap-2
    w-fit
    border-[2px]
    border-[#6b7280]
    "
    >
      <span className="text-xl">
        {" "}
        <FcGoogle />{" "}
      </span>
      {currentLanguage ==="en" ? "Log in with Google" : "Iniciar sesión con Google"}
    </button>
  );
}
