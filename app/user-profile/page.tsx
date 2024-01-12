"use client";
import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/components/Button";
import Modal from "@/modals/modal/Modal";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { AddressDb, deleteUserAddress } from "@/services/address";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Addresses from "./_components/Addresses";
import EmptyAddress from "./_components/EmptyAddress";
import { User } from "./_interfaces/user";
//@ts-ignore
import { getUserInfo } from "./_services/getUserInfo";
import ChangePassword from "./_components/ChangePassword";
import Loading from "./loading";

export default function UserProfilePage() {
  const [userInfo, setUserInfo] = useState<User>();
  const [addresses, setAddresses] = useState<AddressDb[]>();
  const [addressUserData, setAddressUserData] = useState<AddressDb>();
  const [isSpinnerActive, setIsActiveSpinner] = useState<boolean>(false);
  const [isAddAddress, setIsAddAddress] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] =
    useState<boolean>(false);
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
      handleEditAddressModal();
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      handleSpinner();
      const token = getEntityInLocalStorage("userToken");

      const status = await deleteUserAddress(id, token.token_access);
      handleSpinner();
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

  const handleSpinner = () => {
    setIsActiveSpinner((prev) => !prev);
  };

  const handleEditAddressModal = () => {
    setIsOpenEditAddressModal((prev) => !prev);
  };

  const handleAddAddressModal = () => {
    setIsAddAddress((prev) => !prev);
  };

  const handlePassModal = () => {
    setIsChangePassModalOpen((prev) => !prev);
  };

  return (
    <>
      {(addresses && addresses.length >= 1) || userInfo ? (
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
                <Button onClick={handlePassModal}>Cambiar Contraseña</Button>
              </div>
              {isChangePassModalOpen && (
                <Modal className="flex justify-center items-center p-1">
                  <ChangePassword handlePassModal={handlePassModal} />
                </Modal>
              )}
            </div>
          </section>
          {addresses?.length === 0 ? (
            <section className=" w-full flex justify-center items-center relative">
              <EmptyAddress
                handleAddressModal={handleAddAddressModal}
                isAddAddress={isAddAddress}
              />
            </section>
          ) : (
            addresses && (
              <Addresses
                addressUserData={addressUserData}
                addresses={addresses}
                deleteAddress={deleteAddress}
                handleEditAddressId={handleEditAddressId}
                handleAddAddressModal={handleAddAddressModal}
                handleEditAddressModal={handleEditAddressModal}
                isAddAddress={isAddAddress}
                isOpenEditAddressModal={isOpenEditAddressModal}
                isSpinnerActive={isSpinnerActive}
              />
            )
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
