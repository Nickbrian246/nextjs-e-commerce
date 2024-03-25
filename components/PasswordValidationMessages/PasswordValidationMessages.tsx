import React from "react";
import useContextLanguage from "@/hooks/useContextLanguage";
import { 
  passwordValidationMessagesLanguageEn,
  passwordValidationMessagesLanguageEs,
  } from "./Language/language-for-password-validation-messages";
interface Props {
  isWriting: boolean;
  isLengthCorrect: boolean;
  hasOneEspecialCharacter: boolean;
  atLeastOneUppercase: boolean;
  hasNoWhiteSpace: boolean;
}
export default function PasswordValidationMessages(props: Props) {
  const [currentLanguage] = useContextLanguage()
  const {
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
    isWriting,
    atLeastOneUppercase,
  } = props;
  const language = currentLanguage ==="en" ?  passwordValidationMessagesLanguageEn: passwordValidationMessagesLanguageEs
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
      {language.atLeast8Characters}
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
            {language.atLeastOneUpperCase}
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
            {language.atLeastOneANormalCharacter}
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
              {language.mustNotContainWhiteSpaces}
      </span>
    </div>
  );
}
