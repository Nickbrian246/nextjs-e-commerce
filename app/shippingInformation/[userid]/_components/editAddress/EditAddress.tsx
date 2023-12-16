import { FormList, ShippingForm } from "@/components/ShippingFrom/interfaces";
import {
  addHyphensToPhoneNumber,
  formList,
  mexicoStatesList,
} from "@/components/ShippingFrom/utils";
import { Button } from "@/components/components/Button";
import OptionSelect from "@/components/components/OptionSelect";
import { AddressDb } from "@/services/address/interfaces";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { updateUserAddress } from "@/services/address";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useDispatch } from "react-redux";

interface Props {
  UserAddress: AddressDb;
  handleCloseModal: () => void;
}
export default function EditAddress(props: Props) {
  const { handleCloseModal, UserAddress } = props;
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (UserAddress) {
      setShippingForm({
        Apellidos: UserAddress.lastName,
        Nombre: UserAddress.name,
        Teléfono: UserAddress.phoneNumber,
      });
      setCity(UserAddress.city);
      setColony(UserAddress.colony);
      setEmail(UserAddress.email);
      setZipCode(UserAddress.zipCode);
      setStateSelected(UserAddress.state);
      setNeighborReference(UserAddress.neighborReference);
      setReadOnly(true);
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

    updateUserAddress(
      {
        deliveryAddresses: [{ ...deliveryAddresses }],
      },
      token.token_access
    )
      .then((res) => handleCloseModal())
      .catch((err) => {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${err.response.data.message}`,
          })
        );
      });
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
    setZipCode(e.target.value);
  };

  const handleOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setStateSelected(event.target.value);
  };
  const handleEdit = () => {
    setReadOnly(false);
  };
  return (
    <div className="position relative p-5 bg-white rounded-md">
      <button
        onClick={handleCloseModal}
        className="absolute right-0 top-0 text-4xl text-red-500 "
      >
        <RiCloseCircleLine />
      </button>
      <form
        className="flex flex-wrap max-w-4xl gap-y-10 gap-x-4 bg-white  "
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
            id={"city"}
          />
          <OptionSelect
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
            className="sm:w-80 w-64 p-1 border-2 border-b-textGray rounded-md"
            name="neighborReference"
            value={neighborReference}
            placeholder="Referencia domiliciar ejemplo: Casa de dos pisos color morado"
            onChange={handleNeighborReference}
            id={"neighborReference"}
          />
        </div>
        <Button className="bg-[#059669]">Guardar cambios</Button>
      </form>
    </div>
  );
}
