import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { getSavedProduct } from "../../_services/savedProducts/getSavedProducts";
import { getProductsWithPromiseAll } from "@/services/getProductsWithPromiseAll";
import { addQuantityOfCartItems, checkOfferAndAdaptPrice } from "../../utils";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { AdapterForPriceAndFreeShipping } from "../../interfaces";
import ViewOnlyProductCardWithRef from "../ViewOnlyProductCartWithRef/ViewOnlyProductCartWithRef";
export default function SavedProducts() {
  const [groupOfSavedProducts, setGroupOfSavedProducts] =
    useState<AdapterForPriceAndFreeShipping[]>();
  const [startArrowTransition, setStartArrowTransition] =
    useState<boolean>(false);
  const handleStartArrowTransition = () => {
    setStartArrowTransition((prev) => !prev);
  };
  const [savedProductElementHeigh, setSavedProductElementHeigh] =
    useState<number>();
  const [images, setImages] = useState<AdapterForPriceAndFreeShipping[]>();
  const productsRef = useRef([]);
  productsRef.current = [];

  useEffect(() => {
    const token = getEntityInLocalStorage("userToken");
    try {
      getSavedProduct(token.token_access)
        .then((savedProducts) => {
          //@ts-ignore
          getProductsWithPromiseAll(savedProducts)
            .then((products) => {
              const addQuantity = addQuantityOfCartItems(
                savedProducts,
                products
              );
              const addOffers = checkOfferAndAdaptPrice(addQuantity);
              setGroupOfSavedProducts(addOffers);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (groupOfSavedProducts && groupOfSavedProducts?.length >= 3) {
      setImages(groupOfSavedProducts.slice(0, 3));
    }
    if (productsRef.current.length >= 1) {
      const heights = productsRef.current.map((elementRef) => {
        //@ts-ignore
        return elementRef.clientHeight;
      });
      const totalElementHeight = heights.reduce(
        (prevVal, currenVal) => currenVal + prevVal,
        0
      );
      console.log(totalElementHeight);

      setSavedProductElementHeigh(totalElementHeight);
    }
  }, [groupOfSavedProducts]);
  //@ts-ignore
  const addRef = (elementReference) => {
    //@ts-ignore
    if (elementReference && !productsRef.current.includes(elementReference)) {
      //@ts-ignore
      productsRef.current.push(elementReference);
    }
  };

  return (
    <section onClick={handleStartArrowTransition} className="mb-24">
      <div
        className="
      
      flex 
      items-center 
      justify-between
      p-2 
      min-w-[700px] 
      min-h-[130px] 
      shadow-lg 
      rounded-md 
      border 
      border-[#e5e7eb]
      cursor-pointer"
      >
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">Productos guardados</p>
          <p className="flex text-sm font-medium text-science-blue-500 items-center gap-1">
            Ver Productos
            <span
              className={`${
                startArrowTransition
                  ? "rotate-180 transition-all duration-150"
                  : "duration-150"
              }`}
            >
              <IoIosArrowDown />
            </span>
          </p>
        </div>

        <div className="flex">
          {images &&
            images.length >= 1 &&
            images?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="relative rounded-full border w-16 h-16  flex justify-center bg-white border-[#d1d5db] -ml-3"
                >
                  <Image
                    className="rounded-full object-contain"
                    src={product.image}
                    alt={product.title}
                    height={40}
                    width={40}
                  />
                </div>
              );
            })}
          {images && images.length >= 3 && groupOfSavedProducts && (
            <div className="relative rounded-full border w-16 h-16  flex justify-center bg-white border-[#d1d5db] -ml-3">
              <span className="flex justify-center items-center scale-150">
                +{groupOfSavedProducts?.length - images.length}
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className={` w-full transition-[height] duration-1000  ${
          startArrowTransition
            ? `h-[${savedProductElementHeigh}px]`
            : "h-0 overflow-hidden "
        } p-1 bg-white border border-[#e5e7eb] border-t-0`}
      >
        {groupOfSavedProducts &&
          groupOfSavedProducts.map((product, index) => (
            <ViewOnlyProductCardWithRef
              hasFreeShipping={product.hasFreeShipping}
              hasOffer={product.hasOffer}
              imgSrc={product.image}
              porcentageOfDiscount={product.porcentageOfDiscount}
              price={product.price}
              priceWithOffer={product.priceWithOffer}
              productId={product.id}
              quantity={product.quantity ?? 1}
              title={product.title}
              key={product.id}
              //@ts-ignore
              reference={addRef}
            />
          ))}
      </div>
    </section>
  );
}
