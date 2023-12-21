"use client";
import React, { useState } from "react";
import { AddressDb } from "@/services/address/interfaces/Address";
import { Button } from "@/components/components/Button";

export default function AddressCardReadOnlyAndEdit({
  address,
}: {
  address: AddressDb;
}) {
  const [editableAddress, setEditableAddress] = useState<AddressDb>(address);
  const [isEditableAddress, setIsEditableAddress] = useState<boolean>(false);
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
  } = address;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleIsEditable = () => {
    setIsEditableAddress(true);
  };

  return (
    <div
      className={`bg-white sm:p-6 p-1 rounded-md shadow-md border-[#cbd5e1] border
      overflow-hidden`}
    >
      <div className="grid grid-cols-2 sm:gap-4 gap-1">
        <div>
          <label className="font-semibold">Nombre:</label>
          <input
            readOnly={isEditableAddress}
            value={name}
            onChange={handleInputChange}
            name="name"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Email:</label>
          <input
            readOnly={isEditableAddress}
            value={email}
            onChange={handleInputChange}
            name="email"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Apellido:</label>
          <input
            readOnly={isEditableAddress}
            value={lastName}
            onChange={handleInputChange}
            name="lastName"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Ciudad:</label>
          <input
            readOnly={isEditableAddress}
            value={city}
            onChange={handleInputChange}
            name="city"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Colonia:</label>
          <input
            readOnly={isEditableAddress}
            value={colony}
            onChange={handleInputChange}
            name="colony"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Teléfono:</label>
          <input
            readOnly={isEditableAddress}
            value={phoneNumber}
            onChange={handleInputChange}
            name="phoneNumber"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Referencia Vecinal:</label>
          <input
            readOnly={isEditableAddress}
            value={neighborReference}
            onChange={handleInputChange}
            name="neighborReference"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Estado:</label>
          <input
            readOnly={isEditableAddress}
            value={state}
            onChange={handleInputChange}
            name="state"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Código Postal:</label>
          <input
            readOnly={isEditableAddress}
            value={zipCode}
            onChange={handleInputChange}
            name="zipCode"
            className="break-words bg-gray-100 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleIsEditable}>Editar</Button>
      </div>
    </div>
  );
}
