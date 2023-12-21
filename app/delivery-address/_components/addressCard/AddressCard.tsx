import React from "react";
import { AddressDb } from "@/services/address/interfaces/Address";
import { Button } from "@/components/components/Button";
interface Props extends AddressDb {
  addressSelected?: (id: string) => void;
  deleteAddress?: (id: string) => void;
  editAddressId: (id: string) => void;
  addressIdSelected: string;
}
export default function AddressCard(props: Props) {
  const {
    name,
    email,
    lastName,
    city,
    colony,
    phoneNumber,
    deliveryAddressId,
    neighborReference,
    state,
    zipCode,
    addressSelected,
    editAddressId,
    addressIdSelected,
    deleteAddress,
  } = props;

  return (
    <div
      className={`bg-white p-6 rounded-md shadow-md  ${
        addressIdSelected === deliveryAddressId
          ? "border-[#fbbf24] border-4"
          : "border-[#cbd5e1] border"
      } `}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Nombre:</p>
          <p>{name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="font-semibold">Apellido:</p>
          <p>{lastName}</p>
        </div>
        <div>
          <p className="font-semibold">Ciudad:</p>
          <p>{city}</p>
        </div>
        <div>
          <p className="font-semibold">Colonia:</p>
          <p>{colony}</p>
        </div>
        <div>
          <p className="font-semibold">Teléfono:</p>
          <p>{phoneNumber}</p>
        </div>

        <div>
          <p className="font-semibold">Referencia Vecinal:</p>
          <p>{neighborReference}</p>
        </div>
        <div>
          <p className="font-semibold">Estado:</p>
          <p>{state}</p>
        </div>
        <div>
          <p className="font-semibold">Código Postal:</p>
          <p>{zipCode}</p>
        </div>
      </div>
      <div className="w-full flex justify-between flex-wrap items-center">
        {addressSelected && (
          <Button
            onClick={() => {
              addressSelected(deliveryAddressId);
            }}
            className=" mt-3 p-2 sm:p-4"
          >
            Seleccionar esta dirección de envío
          </Button>
        )}
        {deleteAddress && (
          <Button
            onClick={() => {
              deleteAddress(deliveryAddressId);
            }}
            className=" mt-3 p-2 sm:p-4 bg-red-500"
          >
            Eliminar
          </Button>
        )}
        <Button
          onClick={() => {
            editAddressId(deliveryAddressId);
          }}
          className=" mt-3 p-2 sm:p-4 bg-[#ca8a04] "
        >
          Editar dirección
        </Button>
      </div>
    </div>
  );
}
