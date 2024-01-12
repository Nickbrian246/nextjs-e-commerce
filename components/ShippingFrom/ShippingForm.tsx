"use client";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { createUserAddress } from "@/services/address/createUserAddress";
import { AddressDb } from "@/services/address/interfaces";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import OptionSelect from "../components/OptionSelect";
import { ShippingForm } from "./interfaces/ShippingForm";
import { FormList } from "./interfaces/formList";
import { addHyphensToPhoneNumber } from "./utils";
import { formList } from "./utils/formList/formList";
import { mexicoStatesList } from "./utils/stateList";

interface Props {
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstAddressAdded: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ShippingForm({
  setIsEditable,
  setFirstAddressAdded,
}: Props) {
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    Nombre: "",
    Apellidos: "",
    Teléfono: "",
  });
  const [city, setCity] = useState<string>("");
  const [colony, setColony] = useState<string>("");
  const [neighborReference, setNeighborReference] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [stateSelected, setStateSelected] = useState("Tabasco");
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const quantity = searchParams.get("quantity");

  useEffect(() => {
    const localStorageData = getEntityInLocalStorage("shippingFormData");
    if (localStorageData) {
      setShippingForm({
        Apellidos: localStorageData.Apellidos,
        Nombre: localStorageData.Nombre,
        Teléfono: localStorageData.Teléfono,
      });
      setCity(localStorageData.city);
      setColony(localStorageData.colony);
      setEmail(localStorageData.email);
      setZipCode(localStorageData.zipCode);
      setStateSelected(localStorageData.stateSelected);
      setNeighborReference(localStorageData.neighborReference);
      setReadOnly(true);
      setIsEditable(true);
    }
  }, []);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const deliveryAddresses: AddressDb = {
      city,
      colony,
      neighborReference,
      email,
      zipCode,
      state: stateSelected,
      name: shippingForm.Nombre,
      lastName: shippingForm.Apellidos,
      phoneNumber: shippingForm.Teléfono,
      deliveryAddressId: "1",
    };
    const token = getEntityInLocalStorage("userToken");

    createUserAddress(
      {
        deliveryAddresses: [{ ...deliveryAddresses }],
      },
      token.token_access
    )
      .then((res) => {
        setFirstAddressAdded(true);
      })
      .catch((err) => {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err.response.data.message}`,
          })
        );
      });
    // if (!readOnly) createEntityInLocalStorage("shippingFormData", formData);
  };
  const handleOnInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;

    setShippingForm((prevValue) => {
      if (name === "Teléfono") {
        const filterOnlyNumbers = value.replace(/[^\d]/g, "");
        const phoneNumberFormate = addHyphensToPhoneNumber(filterOnlyNumbers);
        if (phoneNumberFormate.length >= 17) {
          return { ...prevValue, [name]: prevValue.Teléfono };
        }
        return { ...prevValue, [name]: phoneNumberFormate };
      }

      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleColony = (e: ChangeEvent<HTMLInputElement>) => {
    setColony(e.target.value);
  };

  const handleNeighborReference = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNeighborReference(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filterLetters = value.replace(/ [a-z]/gi, "");
    setZipCode((prevValue) =>
      prevValue.length === 5 ? prevValue : filterLetters
    );
  };

  const handleOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setStateSelected(event.target.value);
  };
  const handleEdit = () => {
    setReadOnly(false);
    setIsEditable(false);
  };

  return (
    <form
      className="flex flex-wrap max-w-4xl gap-y-10 gap-x-4"
      onSubmit={handleSubmit}
    >
      {formList.map((listItem: FormList) => (
        <div className="flex gap-2 items-center flex-wrap">
          <label
            className="text-lg font-medium first-letter:uppercase"
            htmlFor={listItem.id}
          >
            {listItem.name}:
          </label>
          <input
            readOnly={readOnly}
            required={true}
            className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
            name={listItem.name}
            type="text"
            //@ts-ignore
            value={shippingForm[listItem.id]}
            placeholder={listItem.name}
            onChange={(e) => handleOnInputChange(e, listItem.id)}
            id={listItem.id}
          />
        </div>
      ))}
      <div className="flex gap-2 items-center flex-wrap">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="city"
        >
          Ciudad:
        </label>
        <input
          required={true}
          className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
          name="city"
          type="text"
          value={city}
          placeholder="Ciudad"
          onChange={handleCity}
          readOnly={readOnly}
          id={"city"}
        />
        <OptionSelect
          disabled={readOnly}
          className="border-2 rounded-lg border-b-textGray"
          selectedOption={stateSelected}
          optionLabel="Seleccione su estado: "
          dataList={mexicoStatesList}
          handleOnChange={handleOptionSelect}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="colony"
        >
          Colonia:
        </label>
        <input
          readOnly={readOnly}
          required={true}
          className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
          name="colony"
          type="text"
          value={colony}
          placeholder="Colonia"
          onChange={handleColony}
          id={"colony"}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="zipCode"
        >
          Codigo postal:
        </label>
        <input
          readOnly={readOnly}
          required={true}
          className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
          name="zipCode"
          type="text"
          value={zipCode}
          placeholder="Codigo postal"
          onChange={handleZipCode}
          id={"zipCode"}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="email"
        >
          Direccion de correo:
        </label>
        <input
          readOnly={readOnly}
          required={true}
          className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
          name="colony"
          type="email"
          value={email}
          placeholder="Direccion de correo electronico"
          onChange={handleEmail}
          id={"email"}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <label
          className="text-lg font-medium first-letter:uppercase"
          htmlFor="neighborReference"
        >
          Referencia domiliciar:
        </label>
        <textarea
          readOnly={readOnly}
          className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
          name="neighborReference"
          value={neighborReference}
          placeholder="Referencia domiliciar ejemplo: Casa de dos pisos color morado"
          onChange={handleNeighborReference}
          id={"neighborReference"}
        />
      </div>
      <button
        className={twMerge(
          `
      p-4
      px-6
      rounded-lg
      flex
      justify-center
  bg-science-blue-500
      font-semibold
      text-white
      active:bg-science-blue-700
      `
        )}
      >
        Guardar
      </button>
      {/* {readOnly && (
        <button
          onClick={handleEdit}
          title="Editar "
          className=" bg-base-color gap-2 p-2 rounded-full flex justify-center items-center active:bg-science-blue-800"
        >
          <span className="text-xl text-white" title="Editar">
            <FaEdit />
          </span>
          <p className="text-white font-medium">Editar formulario</p>
        </button>
      )} */}
    </form>
  );
}
