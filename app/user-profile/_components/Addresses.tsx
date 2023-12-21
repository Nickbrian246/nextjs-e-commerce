"use client";
import AddAddress from "@/app/delivery-address/_components/addAddress/AddAddress";
import AddressesDirectory from "@/app/delivery-address/_components/addressesDirectory/AddressesDirectory";
import EditAddress from "@/app/delivery-address/_components/editAddress/EditAddress";
import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/components/Button";
import LoadingSpinner from "@/components/components/LoadingSpinner";
import Modal from "@/modals/modal/Modal";
import { AddressDb } from "@/services/address";
import React from "react";
interface Props {
  addresses: AddressDb[];
  handleEditAddressId: (id: string) => void;
  deleteAddress: (id: string) => void;
  isOpenEditAddressModal: boolean;
  addressUserData: AddressDb | undefined;
  isAddAddress: boolean;
  handleOpenAddAddressModal: () => void;
  handleCloseEditAddressModal: () => void;
  handleCloseAddAddressModal: () => void;
  isSpinnerActive: boolean;
}
export default function Addresses(props: Props) {
  const {
    addressUserData,
    addresses,
    deleteAddress,
    handleEditAddressId,
    handleOpenAddAddressModal,
    isAddAddress,
    isOpenEditAddressModal,
    handleCloseEditAddressModal,
    handleCloseAddAddressModal,
    isSpinnerActive,
  } = props;
  return (
    <section className="w-full max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        Dirección{addresses && addresses?.length > 1 && "es"} de envío
      </h2>
      <Divider className="mb-5" />
      <div className=" flex flex-col gap-4">
        {addresses && (
          <AddressesDirectory
            deliveryAddresses={addresses}
            addressIdSelected=""
            editAddressId={handleEditAddressId}
            deleteAddressId={deleteAddress}
          />
        )}
        {isOpenEditAddressModal && addressUserData && (
          <Modal className="flex justify-center items-center">
            <EditAddress
              UserAddress={addressUserData}
              handleCloseModal={handleCloseEditAddressModal}
            />
          </Modal>
        )}
        {isAddAddress && (
          <Modal className="flex justify-center items-center">
            <AddAddress handleCloseModal={handleCloseAddAddressModal} />
          </Modal>
        )}
      </div>
      {isSpinnerActive && (
        <div className="fixed right-0 left-0 bottom-0 flex top-0 justify-center items-center ">
          <span className="scale-150 text-science-blue-500">
            <LoadingSpinner />
          </span>
        </div>
      )}
      <div className="flex w-full justify-end mt-5">
        <Button
          onClick={handleOpenAddAddressModal}
          className="items-center gap-2"
        >
          Agregar una nueva direccíon
        </Button>
      </div>
    </section>
  );
}
