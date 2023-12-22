import { useCheckPassword } from "@/app/auth/register/_hooks/useCheckPassword";
import { Button } from "@/components/components/Button";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import { IoCloseCircleSharp } from "react-icons/io5";
import PasswordValidationMessages from "@/components/PasswordValidationMessages/PasswordValidationMessages";
import { replacePassword } from "../_services/replacePassword";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { ReplacePassword } from "../_interfaces";
import { useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
interface Props {
  handlePassModal: () => void;
}
export default function ChangePassword(props: Props) {
  const { handlePassModal } = props;
  const [matchPassword, setMatchPassword] = useState<string>("");
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isShowPassForCurrentPassword, setIsShowPassForCurrentPassword] =
    useState<boolean>(false);
  const [isShowPassForNewPassword, setIsShowPassForNewPassword] =
    useState<boolean>(false);
  const [isShowPassForConfirmNewPassword, setIsShowPassForConfirmNewPassword] =
    useState<boolean>(false);

  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [newPassWord, setNewPassWord] = useState({
    oldPassword: "",
    newPassWord: "",
  });
  const dispatch = useDispatch();
  const {
    checkPassword,
    atLeastOneUppercase,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
  } = useCheckPassword();

  const handleInputPasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    if (name === "matchPassword") {
      setIsPasswordMatch(true);
      return setMatchPassword(value);
    }
    if (name === "oldPassword") {
      setIsWrongPassword(false);
    }
    if (name === "newPassWord") {
      setIsPasswordMatch(true);
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

  const handleChangePasswordBtn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matchPassword !== newPassWord.newPassWord) {
      setIsPasswordMatch(false);

      return;
    }
    if (newPassWord.oldPassword === newPassWord.newPassWord) {
      return dispatch(
        activeWarning({
          isActiveWarning: true,
          severity: "error",
          warningMessage:
            "La nueva contraseña debe ser distinta a la contraseña anterior.",
        })
      );
    }

    try {
      const token = getEntityInLocalStorage("userToken");
      const adapter: ReplacePassword = {
        currentPassword: newPassWord.oldPassword,
        newPassword: newPassWord.newPassWord,
      };
      const data = await replacePassword(adapter, token.token_access);
      if (data === 202) {
        handlePassModal();
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "success",
            warningMessage: "Contraseña actualizada con éxito.",
          })
        );
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "ForbiddenException: Contraseña incorrecta"
      ) {
        setIsWrongPassword(true);
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${error.response.data.message.split(":")[1]}`,
          })
        );
      }
      dispatch(
        activeWarning({
          isActiveWarning: true,
          severity: "error",
          warningMessage: `${error}`,
        })
      );
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
      <div className="flex flex-col items-center p-1 md:p-4 gap-2 flex-wrap">
        <div className="flex gap-4 items-center flex-wrap relative ">
          <label>Contraseña actual</label>
          <input
            type={isShowPassForCurrentPassword ? "text" : "password"}
            className={`sm:w-[380px] w-full border-2 ${
              isWrongPassword ? "border-red-500" : "border-borderGray"
            } p-2 rounded-md`}
            placeholder="Contraseña actual"
            value={newPassWord.oldPassword}
            onChange={(e) => handleInputPasswordChange(e, "oldPassword")}
            name="oldPassword"
          />
          <div
            onClick={handleShowPassForCurrentPass}
            className="scale-150 absolute   sm:right-2 right-2 bottom-4 bg-white"
          >
            {isShowPassForCurrentPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
        {isWrongPassword && (
          <p className={`text-sm text-red-600  `}>Contraseñas incorrecta</p>
        )}
      </div>
      <div className="flex items-center p-1 md:p-4  gap-2 flex-wrap">
        <div className="flex gap-4 items-center flex-wrap relative">
          <label>Contraseña Nueva</label>
          <input
            type={isShowPassForNewPassword ? "text" : "password"}
            className={`sm:w-[380px] w-full border-2 ${
              !isPasswordMatch ? "border-red-500" : "border-borderGray"
            } p-2 rounded-md`}
            placeholder="Contraseña nueva"
            value={newPassWord.newPassWord}
            onChange={(e) => handleInputPasswordChange(e, "newPassWord")}
            name="matchPassword"
          />
          <div
            onClick={handleShowPassForNewPass}
            className="scale-150 absolute   sm:right-2 right-2 bottom-4 bg-white"
          >
            {isShowPassForNewPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-1 md:p-4   flex-wrap">
        <div className="flex gap-4 items-center flex-wrap relative">
          <label>Confirme contraseña nueva</label>
          <input
            type={isShowPassForConfirmNewPassword ? "text" : "password"}
            className={`sm:w-[380px] w-full border-2 ${
              !isPasswordMatch ? "border-red-500" : "border-borderGray"
            } p-2 rounded-md`}
            placeholder=" Confirme contraseña nueva"
            value={matchPassword}
            onChange={(e) => handleInputPasswordChange(e, "matchPassword")}
            name="matchPassword"
          />

          <div
            onClick={handleShowPassForConfirmNewPass}
            className="scale-150 absolute    sm:right-2 right-2 bottom-4 bg-white"
          >
            {isShowPassForConfirmNewPassword ? <BiShow /> : <GrHide />}
          </div>
        </div>
        {!isPasswordMatch && (
          <p className={`text-sm text-red-600  `}>Contraseñas no coinciden</p>
        )}
      </div>
      <PasswordValidationMessages
        atLeastOneUppercase={atLeastOneUppercase}
        hasNoWhiteSpace={hasNoWhiteSpace}
        hasOneEspecialCharacter={hasOneEspecialCharacter}
        isLengthCorrect={isLengthCorrect}
        isWriting={isWriting}
      />
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
