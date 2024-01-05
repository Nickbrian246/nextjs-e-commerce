"use client";

import ShippingForm from "@/components/ShippingFrom/ShippingForm";
import { Button } from "@/components/components/Button";
import Modal from "@/modals/modal/Modal";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { getUserAddress } from "@/services/address/getUserAddress";
import { AddressDb } from "@/services/address/interfaces";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "./_components/addAddress/AddAddress";
import AddressesDirectory from "./_components/addressesDirectory/AddressesDirectory";
import EditAddress from "./_components/editAddress/EditAddress";
import { useSearchParams } from "next/navigation";

type ModalType = "Edit" | "addone";

export default function DeliveryAddressPage() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [thereIsAddressData, setThereIsAddressData] = useState<boolean>(false);
  const [addressIdSelected, setAddressIdSelected] = useState<string>("");
  const [modalType, setModalType] = useState<ModalType>("Edit");
  const [addressUserData, setAddressUserData] = useState<AddressDb[]>();
  const [addressDataToEdit, setAddressDataToEdit] = useState<AddressDb>();
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const quantity = searchParams.get("quantity");

  useEffect(() => {
    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");
      getUserAddress(token.token_access)
        .then((res) => {
          setAddressUserData(res);
        })
        .catch((err) => {
          if (err.response.data.message.split(":")[1].trim() === "no data") {
            setThereIsAddressData(false);
            return;
          }
          dispatch(
            activeWarning({
              isActiveWarning: true,
              warningMessage: `${err.data.message}`,
              duration: 4000,
              severity: "error",
            })
          );
        });
      return;
    }
    router.push("/auth/signin");
  }, [isOpenModal, isLogged]);

  const handleAddressSelected = (id: string) => {
    setAddressIdSelected(id);
  };
  const handleEditAddress = (id: string) => {
    if (addressUserData) {
      const addressIndex = addressUserData.findIndex(
        (address) => address.deliveryAddressId === id
      );
      setAddressDataToEdit(addressUserData[addressIndex]);
    }

    setAddressIdSelected(id);
    handleOpenAddAddressModal("Edit");
  };

  const handleOpenAddAddressModal = (modalType: ModalType) => {
    setIsOpenModal(true);
    setModalType(modalType);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleContinueBtn = () => {
    if (!quantity) {
      return router.push(
        `/payment-method?product=${product}&address=${addressIdSelected}`
      );
    }
    router.push(
      `/payment-method?product=${product}&quantity=${quantity}&address=${addressIdSelected}`
    );
  };
  return (
    <>
      <section className="p-2 lg:p-5 shadow-xl h-fit lg:w-[900px]">
        <h2 className="text-4xl font-medium text-center mb-7">
          {isLogged
            ? thereIsAddressData
              ? "Seleccione la dirección de envío"
              : "Formulario de envío"
            : " Inicie sesión para continuar."}
        </h2>
        {isLogged
          ? addressUserData &&
            addressUserData?.length >= 1 && (
              <p className=" text-center mb-7 font-normal text-xl">
                {isEditable
                  ? "Por favor, confirme la información de envío. "
                  : "Por favor, llene los campos para continuar con su pedido."}
              </p>
            )
          : ""}
        {isLogged && addressUserData && addressUserData?.length >= 1 ? (
          <AddressesDirectory
            addressSelected={handleAddressSelected}
            editAddressId={handleEditAddress}
            deliveryAddresses={addressUserData}
            addressIdSelected={addressIdSelected}
          />
        ) : (
          <ShippingForm setIsEditable={setIsEditable} />
        )}

        {isLogged && thereIsAddressData && (
          <div className="w-full flex justify-end">
            <Button className="mt-5 ">Continuar</Button>
          </div>
        )}

        {isOpenModal && addressDataToEdit && (
          <Modal
            handleCloseModal={handleCloseModal}
            className="flex justify-center items-center"
          >
            {isOpenModal && modalType === "Edit" && (
              <EditAddress
                UserAddress={addressDataToEdit}
                handleCloseModal={handleCloseModal}
              />
            )}
          </Modal>
        )}
        {isOpenModal && modalType === "addone" && (
          <Modal className="flex justify-center items-center">
            <AddAddress handleCloseModal={handleCloseModal} />
          </Modal>
        )}

        {isLogged && (
          <div className="flex w-full justify-end mt-4">
            <button
              className="scale-125 flex items-center gap-1 "
              title="Agregar otra dirección"
              onClick={() => handleOpenAddAddressModal("addone")}
            >
              Agregar dirección
              <span className="text-4xl text-science-blue-600">
                <MdAddCircle />
              </span>
            </button>
          </div>
        )}
      </section>
      <Button
        onClick={handleContinueBtn}
        disabled={!addressIdSelected}
        className="h-fit min-[200px]"
      >
        Continuar
      </Button>
    </>
  );
}
