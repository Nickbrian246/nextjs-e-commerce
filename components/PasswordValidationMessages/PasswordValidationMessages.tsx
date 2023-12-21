import React from "react";
interface Props {
  isWriting: boolean;
  isLengthCorrect: boolean;
  hasOneEspecialCharacter: boolean;
  atLeastOneUppercase: boolean;
  hasNoWhiteSpace: boolean;
}
export default function PasswordValidationMessages(props: Props) {
  const {
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
    isWriting,
    atLeastOneUppercase,
  } = props;
  return (
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
  );
}
