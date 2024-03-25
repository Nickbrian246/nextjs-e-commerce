"use client";
import { ChangeEvent, FormEvent, useEffect, useState , useContext} from "react";
import { Button } from "@/components/components/Button";
import LoadingSpinner from "@/components/components/LoadingSpinner";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { UserRegister } from "@/redux/thunks/auth/registerUserThunk";
import { updateShoppingCartUserLogged } from "@/utils/shoppingCartForUserLogged/updateShoppingCartUserLogged";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import FacebookOauth from "../_components/facebookOauth/FacebookOauth";
import GoogleOauth from "../_components/googleOauth/GoogleOauth";
import { useCheckPassword } from "./_hooks/useCheckPassword";
import { RegisterUser } from "./_interfaces/register";
import { registerPageLanguageEn, registerPageLanguageEs } from "./language/registerPageLanguage";
import useContextLanguage from "@/hooks/useContextLanguage";
import PasswordValidationMessages from "@/components/PasswordValidationMessages/PasswordValidationMessages";

export default function RegisterPage() {
  const [currentLanguage] = useContextLanguage()
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isAvailableToSubmit, setIsAvailableToSubmit] =
    useState<boolean>(false);
      //@ts-ignore
  const { isLogged, isLoading } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();
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
    if (isLogged) {
      updateShoppingCartUserLogged().catch((err) => {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err}`,
            duration: 4000,
            warningSubMessage: "",
          })
        );
      });

      router.replace("/");
    }
  }, [isLogged]);

  const language = currentLanguage ==="en" ? registerPageLanguageEn : registerPageLanguageEs
  
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
      //@ts-ignore
      dispatch(UserRegister(registerUser));
  };
  return (
    <section className="p-4 shadow-lg flex flex-col  lg:gap-2 gap-1 relative">
      <form
        className="p-4  flex flex-col  lg:gap-2 gap-1 relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center">{language.title}</h2>
        <h2 className="text-center ">{language.subTitle}</h2>
        <div className="flex items-center p-4 gap-7  flex-wrap">
          <label htmlFor="firstName">{language.inputNameLabel}</label>
          <input
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            id="firstName"
            placeholder={language.inputNameLabel}
            type="text"
            name="firstName"
            onChange={handleInputs}
            value={registerUser.firstName}
          />
        </div>
        <div className="flex items-center p-4 gap-7 flex-wrap">
          <label htmlFor="lastName">{language.inputLastNameLabel}</label>
          <input
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            id="lastName"
            placeholder={language.inputLastNameLabel}
            type="text"
            name="lastName"
            onChange={handleInputs}
            value={registerUser.lastName}
          />
        </div>
        <div className="flex items-center p-4 gap-7 flex-wrap">
          <label htmlFor="email">{language.inputEmailLabel}</label>
          <input
            className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
            id="email"
            placeholder={language.inputEmailLabel}
            type="email"
            name="email"
            onChange={handleInputs}
            value={registerUser.email}
          />
        </div>

        <div className="flex flex-col items-center p-4 gap-7 flex-wrap">
          <div className="flex gap-4 items-center relative">
            <label htmlFor="password">{language.inputPasswordLabel}</label>
            <input
              className="lg:w-[380px] w-[200px] border border-borderGray p-2 rounded-md"
              id="password"
              placeholder={language.inputPasswordLabel}
              type={showPass ? "text" : "password"}
              onChange={handleInputs}
              name="password"
              value={registerUser.password}
            />
            <div
              onClick={handleShowPass}
              className="scale-150 absolute  lg:-right-5 right-2 bg-white"
            >
              {showPass ? <BiShow /> : <GrHide />}
            </div>
          </div>
          <PasswordValidationMessages
          atLeastOneUppercase={atLeastOneUppercase}
          hasNoWhiteSpace={hasNoWhiteSpace}
          hasOneEspecialCharacter={hasOneEspecialCharacter}
          isLengthCorrect={isLengthCorrect}
          isWriting={isWriting}
          />
        </div>
        <Button
          disabled={!isAvailableToSubmit}
          className="m-auto tracking-wider"
        >
          {language.registerButtonText}
        </Button>
        <span>
              {language.logInSpanText}
          <Link
            href={"/auth/signin"}
            className="text-science-blue-500 underline"
          >
            {language.logInLinkText}
          </Link>
        </span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-gray-300">
            <LoadingSpinner className="text-3xl text-science-blue-400" />
          </div>
        )}
      </form>
      <GoogleOauth />
      <FacebookOauth />
  
    </section>
  );
}
