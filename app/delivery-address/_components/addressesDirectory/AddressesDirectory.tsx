import React from "react";
import AddressCard from "../addressCard/AddressCard";
import { AddressDb } from "@/services/address/interfaces/Address";
interface DeliveryAddresses {
  deliveryAddresses: AddressDb[];
  addressSelected: (id: string) => void;
  editAddressId: (id: string) => void;
  addressIdSelected: string;
}
export default function AddressesDirectory({
  deliveryAddresses,
  addressSelected,
  editAddressId,
  addressIdSelected,
}: DeliveryAddresses) {
  return (
    <div className="flex flex-col gap-4">
      {deliveryAddresses.map((address) => (
        <AddressCard
          addressIdSelected={addressIdSelected}
          addressSelected={addressSelected}
          editAddressId={editAddressId}
          city={address.city}
          colony={address.colony}
          deliveryAddressId={address.deliveryAddressId}
          email={address.email}
          lastName={address.lastName}
          neighborReference={address.neighborReference}
          name={address.name}
          phoneNumber={address.phoneNumber}
          state={address.state}
          zipCode={address.zipCode}
        />
      ))}
    </div>
  );
}
