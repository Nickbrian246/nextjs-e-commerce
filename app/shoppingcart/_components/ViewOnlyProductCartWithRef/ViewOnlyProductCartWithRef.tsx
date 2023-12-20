import React from "react";
import OfferAndFreeShipping from "@/app/shoppingcart/_components/productResume/components/OfferAndFreeShipping";
import Image from "next/image";
import { adapterForAddProductForAmount } from "@/app/product/[product]/_adapter";
import { updateShoppingCartCounter } from "@/redux/slices/ShoppingCart";
import { addProductToShippingCartByAmount } from "@/services/shoppingCartdb/addProductToShoppingCartByAmount";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useDispatch } from "react-redux";
import { deleteSavedProduct } from "../../_services/savedProducts/deleteSavedProduct";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
interface Props {
  title: string;
  price: number;
  hasOffer: boolean;
  priceWithOffer: number;
  porcentageOfDiscount: string;
  hasFreeShipping: boolean;
  imgSrc: string;
  productId: number;
  quantity: number;
  reference: React.RefObject<HTMLDivElement>;
  handleUpdateGroupOfProducts: () => void;
}
export default function ViewOnlyProductCardWithRef(props: Props) {
  const {
    hasFreeShipping,
    hasOffer,
    imgSrc,
    porcentageOfDiscount,
    price,
    priceWithOffer,
    productId,
    quantity,
    title,
    reference,
    handleUpdateGroupOfProducts,
  } = props;
  const dispatch = useDispatch();
  const totalPrice = price.toLocaleString("es-MX", {
    currency: "MXN",
    style: "currency",
  });
  const offerPrice = priceWithOffer.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  const subTotal = (
    hasOffer ? priceWithOffer * quantity : price * quantity
  ).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  const handleAddToShoppingCart = async () => {
    try {
      const token = getEntityInLocalStorage("userToken");
      const adapterForAddByAmount = adapterForAddProductForAmount({
        productId,
        quantity,
      });
      await deleteSavedProduct(productId, token.token_access);
      const counter = await addProductToShippingCartByAmount(
        adapterForAddByAmount,
        token.token_access
      );
      dispatch(updateShoppingCartCounter({ count: counter }));
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

  const handleDelete = async () => {
    try {
      const token = getEntityInLocalStorage("userToken");
      await deleteSavedProduct(productId, token.token_access);
      handleUpdateGroupOfProducts();
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

  return (
    <div
      ref={reference}
      className="
flex 
lg:min-w-[700px] 
min-h-[140px]  
items-center 
justify-between 
border-b-2
border-b-textGray
flex-wrap
gap-6
pt-2
"
    >
      <div className="flex gap-2 flex-wrap ">
        <div className="flex gap-2 justify-start items-center flex-wrap lg:flex-nowrap  w-[300px]   lg:w-[380px]">
          <div>
            <Image src={imgSrc} alt={title} width={80} height={80} />
          </div>
          <div>
            <p className="font-medium" title={title}>
              {title.length > 75 ? title.substring(0, 38).concat("...") : title}
            </p>
            <button
              onClick={handleAddToShoppingCart}
              className=" mr-4 text-base-color font-medium"
            >
              Agregar al carrito
            </button>
            <button
              onClick={handleDelete}
              className=" mr-4 text-base-color font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-md text-science-blue-950 font-medium ">
            Cantidad: {quantity}
          </span>
        </div>
      </div>
      <div className="relative flex  flex-col flex-wrap items-baseline mt-4 ">
        <div className=" flex gap-1 flex-col">
          {hasOffer && (
            <OfferAndFreeShipping
              discount="%20"
              hasFreeShipping
              totalPrice={totalPrice}
            />
          )}
        </div>

        <span className="self-start font-medium">
          {hasOffer ? offerPrice : totalPrice}
        </span>
        <span className="font-semibold"> Sub total: {subTotal}</span>
      </div>
    </div>
  );
}
