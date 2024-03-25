import { PasswordValidationMessageLanguage } from "../interfaces/language-interface-for-Password-Validation-Message"
export const  passwordValidationMessagesLanguageEs:PasswordValidationMessageLanguage={
  atLeast8Characters:"* La contraseña debe tener al menos 8 caracteres.",
  atLeastOneANormalCharacter:"* La contraseña debe contener al menos un carácter especial como ?*.",
  atLeastOneUpperCase:"* La contraseña debe contener al menos una letra mayúscula.",
  mustNotContainWhiteSpaces:"* La contraseña no debe contener espacios."
}

export const passwordValidationMessagesLanguageEn: PasswordValidationMessageLanguage = {
  atLeast8Characters: "* Password must be at least 8 characters long.",
  atLeastOneANormalCharacter: "* Password must contain at least one special character like ?*.",
  atLeastOneUpperCase: "* Password must contain at least one uppercase letter.",
  mustNotContainWhiteSpaces: "* Password must not contain any white spaces."
};