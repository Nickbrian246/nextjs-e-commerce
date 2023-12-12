import { useState } from "react";

export function useCheckPassword() {
  const [isLengthCorrect, setIsLengthCorrect] = useState<boolean>(false);
  const [hasNoWhiteSpace, setHasNoWhiteSpace] = useState<boolean>(false);
  const [hasOneEspecialCharacter, setHasOneEspecialCharacter] =
    useState<boolean>(false);
  const [atLeastOneUppercase, setAtLeastOneUppercase] =
    useState<boolean>(false);

  function checkPassword(password: string) {
    setIsLengthCorrect(password.length >= 8);

    setHasNoWhiteSpace(!/\s/.test(password));

    setHasOneEspecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(password));

    setAtLeastOneUppercase(/[A-Z]/.test(password));
  }

  return {
    isLengthCorrect,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    atLeastOneUppercase,
    checkPassword,
  };
}
