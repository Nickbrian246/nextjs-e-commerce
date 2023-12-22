import { getProductsWithPromiseAll } from "@/services/getProductsWithPromiseAll";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { getSavedProduct } from "../../_services/savedProducts/getSavedProducts";
import { AdapterForPriceAndFreeShipping } from "../../interfaces";
import { addQuantityOfCartItems, checkOfferAndAdaptPrice } from "../../utils";
import ResumeImages from "./components/ResumeImages";
import SavedProductsViewer from "./components/SavedProductsViewer";
import { useDispatch } from "react-redux";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";

export default function SavedProducts() {
  const [groupOfSavedProducts, setGroupOfSavedProducts] =
    useState<AdapterForPriceAndFreeShipping[]>();
  const [startArrowTransition, setStartArrowTransition] =
    useState<boolean>(false);
  const [isEmptyGroupOfProducts, setIsEmptyGroupOfProducts] =
    useState<boolean>(false);
  const [savedProductElementHeigh, setSavedProductElementHeigh] =
    useState<number>();
  const [updateGroupOfProducts, setUpdateGroupOfProducts] =
    useState<boolean>(false);
  const [images, setImages] = useState<AdapterForPriceAndFreeShipping[]>();
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const productsRef = useRef([]);
  productsRef.current = [];

  useEffect(() => {
    const token = getEntityInLocalStorage("userToken");
    try {
      getSavedProduct(token.token_access).then((savedProducts) => {
        if (savedProducts.length === 0) {
          return setIsEmptyGroupOfProducts(true);
        }
        setIsEmptyGroupOfProducts(false);
        //@ts-ignore
        getProductsWithPromiseAll(savedProducts).then((products) => {
          //@ts-ignore
          const addQuantity = addQuantityOfCartItems(savedProducts, products);
          const addOffers = checkOfferAndAdaptPrice(addQuantity);
          setGroupOfSavedProducts(addOffers);
        });
      });
    } catch (err) {
      dispatch(
        activeWarning({
          isActiveWarning: true,
          severity: "error",
          warningMessage: `${err}`,
        })
      );
    }
  }, [productsInShoppingCart, updateGroupOfProducts, isEmptyGroupOfProducts]);

  useEffect(() => {
    if (groupOfSavedProducts && groupOfSavedProducts?.length >= 2) {
      setImages(groupOfSavedProducts.slice(0, 3));
    } else {
      setImages(groupOfSavedProducts);
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

  const handleStartArrowTransition = () => {
    setStartArrowTransition((prev) => !prev);
  };

  const handleUpdateGroupOfProducts = () => {
    setUpdateGroupOfProducts((prev) => !prev);
  };

  return (
    <>
      {!isEmptyGroupOfProducts && (
        <>
          <section onClick={handleStartArrowTransition}>
            <div
              className="
              flex 
              items-center 
              justify-between
              p-2 
              md:min-w-[700px] 
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

              {groupOfSavedProducts && images && (
                <ResumeImages
                  groupOfSavedProducts={groupOfSavedProducts}
                  images={images}
                  startArrowTransition={startArrowTransition}
                />
              )}
            </div>
          </section>
          {groupOfSavedProducts && (
            <SavedProductsViewer
              groupOfSavedProducts={groupOfSavedProducts}
              handleUpdateGroupOfProducts={handleUpdateGroupOfProducts}
              savedProductElementHeigh={savedProductElementHeigh ?? 0}
              startArrowTransition={startArrowTransition}
              //@ts-ignore
              addRef={addRef}
            />
          )}
        </>
      )}
    </>
  );
}
