"use client";
import {
  addOneItemToShoppingCart,
  decreaseOneItemToShoppingCart,
} from "@/app/shoppingcart/_services";
import ProductQuantityBox from "@/components/components/productQuantityBox/ProductQuantityBox";
import {
  addOneItemToProductInShoppingCart,
  deleteProductInShoppingCart,
  subtractOneItemToProductInShoppingCart,
  updateShoppingCartCounter,
} from "@/redux/slices/ShoppingCart";
import { activeGlobalSpinner } from "@/redux/slices/globalSpinner/globalSpinner";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { deleteOneProductFromShoppingCart } from "@/services/shoppingCartdb/deleteOneProductFromShoppingCart";
import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferAndFreeShipping from "./OfferAndFreeShipping";
import { adapterForSavedProduct } from "@/app/shoppingcart/adapters";
import { createSavedProduct } from "@/app/shoppingcart/_services/savedProducts/createSavedProduct";

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
}
export default function ProductResumeCard(props: Props) {
  const {
    price,
    title,
    hasFreeShipping,
    hasOffer,
    porcentageOfDiscount,
    priceWithOffer,
    productId,
    imgSrc,
    quantity,
  } = props;
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [debounce, setDebounce] = useState<number>(1);
  const router = useRouter();
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);

  useEffect(() => {
    const time = setTimeout(() => {}, 500);
    return () => clearTimeout(time);
  }, [debounce]);

  const totalPrice = price.toLocaleString("es-MX", {
    currency: "MXN",
    style: "currency",
  });

  const offerPrice = priceWithOffer.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  const handleDelete = async (key: string, id: number) => {
    if (isLogged) {
      try {
        dispatch(
          activeGlobalSpinner({ isActiveLoadingSpinner: true, itemID: "" })
        );
        const token = getEntityInLocalStorage("userToken");
        const counter = await deleteOneProductFromShoppingCart(
          productId,
          token.token_access
        );
        dispatch(updateShoppingCartCounter({ count: counter }));
        return;
      } catch (error) {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${error}`,
          })
        );
      }
    }

    dispatch(
      addOneItemToProductInShoppingCart({
        key,
        productId: { productId, quantity: 1 },
      })
    );
    dispatch(deleteProductInShoppingCart({ key, productId: id }));
  };
  const handleAddItem = async (key: string, product: ShoppingCartProduct) => {
    if (isLogged) {
      try {
        dispatch(
          activeGlobalSpinner({
            isActiveLoadingSpinner: true,
            itemID: "",
          })
        );
        const token = getEntityInLocalStorage("userToken");
        const counter = await addOneItemToShoppingCart(
          { productId, quantity },
          token.token_access
        );
        dispatch(updateShoppingCartCounter({ count: counter }));
        return;
      } catch (error) {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${error}`,
          })
        );
      }
    }

    dispatch(
      addOneItemToProductInShoppingCart({
        key,
        productId: { productId, quantity: 1 },
      })
    );
  };
  const handleSubtractItem = async (
    key: string,
    product: ShoppingCartProduct
  ) => {
    if (isLogged) {
      try {
        dispatch(
          activeGlobalSpinner({
            isActiveLoadingSpinner: true,
            itemID: "",
          })
        );
        const token = getEntityInLocalStorage("userToken");
        const counter = await decreaseOneItemToShoppingCart(
          String(productId),
          token.token_access
        );

        dispatch(updateShoppingCartCounter({ count: counter }));
        return;
      } catch (error) {
        dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: `${error}`,
          })
        );
      }
    }

    dispatch(
      subtractOneItemToProductInShoppingCart({
        key,
        product: { productId, quantity: 1 },
      })
    );
  };
  const handleQuantityToAddCart = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filterValue = value.toString().replace(/[^0-9]g/, "");
    setProductQuantity(Number(filterValue));
  };

  const handleSaveProduct = async () => {
    try {
      dispatch(
        activeGlobalSpinner({ isActiveLoadingSpinner: true, itemID: "" })
      );
      const token = getEntityInLocalStorage("userToken");
      const savedProductAdapter = adapterForSavedProduct({
        productId,
        quantity,
      });
      const response = await createSavedProduct(
        savedProductAdapter,
        token.token_access
      );
      const counter = await deleteOneProductFromShoppingCart(
        productId,
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

  const handleBuyNowBtn = (id: number) => {
    router.push(`/delivery-address?product=${id}&quantity=${quantity}`);
  };
  return (
    <div
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
              onClick={() => handleDelete("shoppingCart", productId)}
              className=" mr-4 text-base-color font-medium"
            >
              Eliminar
            </button>
            {isLogged && (
              <button
                onClick={handleSaveProduct}
                className=" mr-4 text-base-color font-medium"
              >
                Guardar
              </button>
            )}
            <button
              onClick={() => handleBuyNowBtn(productId)}
              className=" mr-4 text-base-color font-medium"
            >
              Comprar ahora
            </button>
          </div>
        </div>
        <ProductQuantityBox
          handleOnChange={handleQuantityToAddCart}
          quantity={productQuantity}
          setQuantity={setProductQuantity}
          handleSubtractItem={handleSubtractItem}
          handleAddItem={handleAddItem}
          productId={productId}
          quantityInShoppingCart={quantity}
        />
      </div>
      <div className="relative flex  flex-col flex-wrap ">
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
      </div>
    </div>
  );
}
