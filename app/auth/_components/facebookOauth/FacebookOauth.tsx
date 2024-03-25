import React from "react";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
import { ImFacebook2 } from "react-icons/im";
import useContextLanguage from "@/hooks/useContextLanguage";
export default function FacebookOauth() {
  const [currentLanguage] = useContextLanguage()
  const handleClick = async () => {
    window.location.href = `${BASE_URL}/auth/facebook/login`;
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
      <span className="text-xl text-science-blue-500">
        <ImFacebook2 />
      </span>
      {currentLanguage ==="en" ? "Log in with Facebook" :"Iniciar sesión con Facebook"}
    </button>
  );
}

