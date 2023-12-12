"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/components/Button";
import { RegisterUser } from "./_interfaces/register";
import { useCheckPassword } from "./_hooks/useCheckPassword";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "@/redux/thunks/auth/registerUserThunk";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/components/LoadingSpinner";

export default function RegisterPage() {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isAvailableToSubmit, setIsAvailableToSubmit] =
    useState<boolean>(false);
  const [registerUser, setRegisterUser] = useState<RegisterUser>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const {
    atLeastOneUppercase,
    checkPassword,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
  } = useCheckPassword();
  const { isLogged, isLoading } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      registerUser.email &&
      registerUser.firstName &&
      registerUser.lastName &&
      registerUser.password &&
      atLeastOneUppercase &&
      hasNoWhiteSpace &&
      hasOneEspecialCharacter &&
      isLengthCorrect
    ) {
      setIsAvailableToSubmit(true);
      return;
    }
    setIsAvailableToSubmit(false);
  }, [registerUser]);
  useEffect(() => {
    if (isLogged) router.replace("/");
  }, [isLogged]);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const name = e.target.name;
    setRegisterUser((prev) => {
      if (name === "password") {
        setIsWriting(true);
        checkPassword(inputValue);
        if (e.target.value.length === 0) {
          setIsWriting(false);
          setShowPass(false);
        }
        return {
          ...prev,
          [name]: inputValue,
        };
      }
      return {
        ...prev,
        [name]: inputValue,
      };
    });
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      registerUser.email &&
      registerUser.firstName &&
      registerUser.lastName &&
      registerUser.password &&
      atLeastOneUppercase &&
      hasNoWhiteSpace &&
      hasOneEspecialCharacter &&
      isLengthCorrect
    )
      dispatch(UserRegister(registerUser));
  };
  return (
    <form
      className="p-4 shadow-lg flex flex-col  lg:gap-2 gap-1 relative"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center">Registrate</h2>
      <h2 className="text-center ">Es rápido y fácil.</h2>
      <div className="flex items-center p-4 gap-7  flex-wrap">
        <label htmlFor="firstName">Nombre</label>
        <input
          className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
          id="firstName"
          placeholder="Nombre"
          type="text"
          name="firstName"
          onChange={handleInputs}
          value={registerUser.firstName}
        />
      </div>
      <div className="flex items-center p-4 gap-7 flex-wrap">
        <label htmlFor="lastName">Apellido</label>
        <input
          className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
          id="lastName"
          placeholder="Apellidos"
          type="text"
          name="lastName"
          onChange={handleInputs}
          value={registerUser.lastName}
        />
      </div>
      <div className="flex items-center p-4 gap-7 flex-wrap">
        <label htmlFor="email">Correo</label>
        <input
          className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
          id="email"
          placeholder="Correo"
          type="email"
          name="email"
          onChange={handleInputs}
          value={registerUser.email}
        />
      </div>
      <div className="flex flex-col items-center p-4 gap-7 flex-wrap">
        <div className="flex gap-4 items-center relative">
          <label htmlFor="password">Contraseña</label>
          <input
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            id="password"
            placeholder="Contraseña"
            type={showPass ? "text" : "password"}
            onChange={handleInputs}
            name="password"
            value={registerUser.password}
          />
          <button
            onClick={handleShowPass}
            className="scale-150 absolute  lg:-right-5 right-2 bg-white"
          >
            {showPass ? <BiShow /> : <GrHide />}
          </button>
        </div>
        <div className="flex  flex-wrap max-w-[400px]">
          <span
            className={`text-sm  ${
              isWriting
                ? isLengthCorrect
                  ? "text-[#22c55e]"
                  : "text-red-600"
                : "text-textGray"
            }`}
          >
            * La contraseña debe tener al menos 8 caracteres.
          </span>
          <span
            className={`text-sm  ${
              isWriting
                ? atLeastOneUppercase
                  ? "text-[#22c55e]"
                  : "text-red-600"
                : "text-textGray"
            }`}
          >
            * La contraseña debe contener al menos una letra mayúscula.
          </span>
          <span
            className={`text-sm  ${
              isWriting
                ? hasOneEspecialCharacter
                  ? "text-[#22c55e]"
                  : "text-red-600"
                : "text-textGray"
            }`}
          >
            * La contraseña debe contener al menos un carácter especial como ?*.
          </span>
          <span
            className={`text-sm  ${
              isWriting
                ? hasNoWhiteSpace
                  ? "text-[#22c55e]"
                  : "text-red-600"
                : "text-textGray"
            }`}
          >
            * La contraseña no debe contener espacios.
          </span>
        </div>
      </div>
      <Button disabled={!isAvailableToSubmit} className="m-auto tracking-wider">
        Registrarse
      </Button>
      <span>
        {"Ya tienes cuenta?  "}
        <Link href={"/auth/signin"} className="text-science-blue-500 underline">
          Iniciar sesión
        </Link>
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-gray-300">
          <LoadingSpinner className="text-3xl text-science-blue-400" />
        </div>
      )}
    </form>
  );
}
