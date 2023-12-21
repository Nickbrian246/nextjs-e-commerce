"use client";
import Divider from "@/components/Divider/Divider";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { AddressDb, deleteUserAddress } from "@/services/address";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EmptyAddress from "./_components/EmptyAddress";
import { User } from "./_interfaces/user";
import { getUserInfo } from "./_services/getuserInfo";
import Addresses from "./_components/Addresses";
import { Button } from "@/components/components/Button";

export default function UserProfilePage() {
  const [userInfo, setUserInfo] = useState<User>();
  const [addresses, setAddresses] = useState<AddressDb[]>();
  const [addressUserData, setAddressUserData] = useState<AddressDb>();
  const [isSpinnerActive, setIsActiveSpinner] = useState<boolean>(false);
  const [isAddAddress, setIsAddAddress] = useState<boolean>(false);
  const [isOpenEditAddressModal, setIsOpenEditAddressModal] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getEntityInLocalStorage("userToken");
    getUserInfo(token.token_access)
      .then((res) => {
        setUserInfo(res.user);
        setAddresses(res.addresses);
      })
      .catch((err) => console.log(err));
  }, [isOpenEditAddressModal, isSpinnerActive, isAddAddress]);

  const handleEditAddressId = (id: string) => {
    if (addresses) {
      const addressIndex = addresses.findIndex(
        (address) => address.deliveryAddressId === id
      );
      setAddressUserData(addresses[addressIndex]);
      handleOpenEditAddressModal();
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      handleActiveSpinner();
      const token = getEntityInLocalStorage("userToken");

      const status = await deleteUserAddress(id, token.token_access);
      handleDisableSpinner();
      console.log(status);
    } catch (error) {
      dispatch(
        activeWarning({
          isActiveWarning: true,
          severity: "error",
          warningMessage: `${error}`,
        })
      );
    }
  };

  const handleActiveSpinner = () => {
    setIsActiveSpinner(true);
  };
  const handleDisableSpinner = () => {
    setIsActiveSpinner(false);
  };
  const handleCloseEditAddressModal = () => {
    setIsOpenEditAddressModal(false);
  };
  const handleOpenEditAddressModal = () => {
    setIsOpenEditAddressModal(true);
  };
  const handleCloseAddAddressModal = () => {
    setIsAddAddress(false);
  };
  const handleOpenAddAddressModal = () => {
    setIsAddAddress(true);
  };

  return (
    <>
      <section className="w-full max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
        <Divider className="mb-5" />
        <div className="flex  flex-col gap-4 ">
          <div className="flex justify-between px-3 items-center">
            <label className=" font-medium">Nombre:</label>
            <input
              readOnly={true}
              value={userInfo?.firstName}
              className="w-3/4 border-2 border-[#71717a] outline-none  rounded-md px-3 py-2"
            />
          </div>
          <div className="flex justify-between px-3 items-center">
            <label className=" font-medium">Apellidos:</label>
            <input
              readOnly={true}
              value={userInfo?.lastName}
              className="w-3/4 border-2 border-[#71717a] outline-none  rounded-md px-3 py-2"
            />
          </div>
          <div className="flex justify-between px-3 items-center">
            <label className=" font-medium">Email:</label>
            <input
              readOnly={true}
              value={userInfo?.email}
              className="w-3/4 border-2 border-[#71717a] outline-none rounded-md px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <Button>Cambiar Contraseña</Button>
          </div>
        </div>
      </section>
      {addresses?.length === 0 ? (
        <EmptyAddress
          handleCloseAddAddressModal={handleCloseAddAddressModal}
          handleOpenAddAddressModal={handleOpenAddAddressModal}
          isAddAddress={isAddAddress}
        />
      ) : (
        addresses && (
          <Addresses
            addressUserData={addressUserData}
            addresses={addresses}
            deleteAddress={deleteAddress}
            handleCloseAddAddressModal={handleCloseAddAddressModal}
            handleCloseEditAddressModal={handleCloseEditAddressModal}
            handleEditAddressId={handleEditAddressId}
            handleOpenAddAddressModal={handleOpenAddAddressModal}
            isAddAddress={isAddAddress}
            isOpenEditAddressModal={isOpenEditAddressModal}
            isSpinnerActive={isSpinnerActive}
          />
        )
      )}
    </>
  );
}
