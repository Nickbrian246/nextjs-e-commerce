import { useCheckPassword } from "@/app/auth/register/_hooks/useCheckPassword";
import { Button } from "@/components/components/Button";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import { IoCloseCircleSharp } from "react-icons/io5";
interface Props {
  handlePassModal: () => void;
}
export default function ChangePassword(props: Props) {
  const { handlePassModal } = props;
  const {
    checkPassword,
    atLeastOneUppercase,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
  } = useCheckPassword();

  const [newPassWord, setNewPassWord] = useState({
    oldPassword: "",
    newPassWord: "",
  });
  const [matchPassword, setMatchPassword] = useState<string>("");
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isShowPassForCurrentPassword, setIsShowPassForCurrentPassword] =
    useState<boolean>(false);
  const [isShowPassForNewPassword, setIsShowPassForNewPassword] =
    useState<boolean>(false);
  const [isShowPassForConfirmNewPassword, setIsShowPassForConfirmNewPassword] =
    useState<boolean>(false);
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const handleInputPasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    if (name === "matchPassword") {
      console.log("entrando");

      return setMatchPassword(value);
    }
    if (name === "newPassWord") {
      setIsWriting(true);
      checkPassword(value);
    }
    setNewPassWord((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangePasswordBtn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matchPassword !== newPassWord.newPassWord) {
      setIsPasswordMatch(false);
      setErrorMessage("Las contraseñas no coinciden");
    }
  };

  const handleShowPassForCurrentPass = () => {
    setIsShowPassForCurrentPassword((prev) => !prev);
  };
  const handleShowPassForNewPass = () => {
    setIsShowPassForNewPassword((prev) => !prev);
  };
  const handleShowPassForConfirmNewPass = () => {
    setIsShowPassForConfirmNewPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleChangePasswordBtn}
      className="bg-white p-2 flex flex-col gap-6 relative"
    >
      <div className="flex items-center p-4 gap-2 flex-wrap">
        <div className="flex gap-4 items-center relative">
          <label>Contraseña actual</label>
          <input
            type={isShowPassForCurrentPassword ? "text" : "password"}
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            placeholder="Contraseña actual"
            value={newPassWord.oldPassword}
            onChange={(e) => handleInputPasswordChange(e, "oldPassword")}
            name="oldPassword"
          />
          <div
            onClick={handleShowPassForCurrentPass}
            className="scale-150 absolute   right-2 bg-white"
          >
            {isShowPassForCurrentPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 gap-2 flex-wrap">
        <div className="flex gap-4 items-center relative">
          <label>Contraseña Nueva</label>
          <input
            type={isShowPassForCurrentPassword ? "text" : "password"}
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            placeholder="Contraseña nueva"
            value={newPassWord.newPassWord}
            onChange={(e) => handleInputPasswordChange(e, "newPassWord")}
            name="matchPassword"
          />
          <div
            onClick={handleShowPassForNewPass}
            className="scale-150 absolute   right-2 bg-white"
          >
            {isShowPassForNewPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-4  flex-wrap">
        <div className="flex gap-4 items-center relative">
          <label>Confirme contraseña nueva</label>
          <input
            type={isShowPassForConfirmNewPassword ? "text" : "password"}
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            placeholder=" Confirme contraseña nueva"
            value={matchPassword}
            onChange={(e) => handleInputPasswordChange(e, "matchPassword")}
            name="matchPassword"
          />

          <div
            onClick={handleShowPassForConfirmNewPass}
            className="scale-150 absolute   right-2 bg-white"
          >
            {isShowPassForConfirmNewPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
        {!isPasswordMatch && (
          <p className={`text-sm text-red-600  `}>Contraseñas no coinciden</p>
        )}
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
      <Button
        disabled={
          !(
            newPassWord.newPassWord.length >= 8 &&
            newPassWord.oldPassword.length >= 8 &&
            matchPassword.length >= 8
          )
        }
      >
        Cambiar contraseña
      </Button>
      <div onClick={handlePassModal} className="absolute -right-2 -top-2">
        <span className="text-4xl text-red-500 cursor-pointer">
          <IoCloseCircleSharp />
        </span>
      </div>
    </form>
  );
}
