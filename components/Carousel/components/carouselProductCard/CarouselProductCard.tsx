import QuantityToAddToCart from "@/app/product/[product]/_components/productDetails/QuantityToAddToCart";
import {
  hasFreeShipping,
  hasOffer,
  newPriceWithDiscount,
} from "@/components/productCard/utils/hasOffer";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { sliceText } from "../../utils";
import Link from "next/link";
import {
  addItemsToProductByAmount,
  updateShoppingCartCounter,
} from "@/redux/slices/ShoppingCart";
import { Button } from "@/components/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { adapterForAddProductForAmount } from "@/app/product/[product]/_adapter";
import { activeGlobalSpinner } from "@/redux/slices/globalSpinner/globalSpinner";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { addProductToShippingCartByAmount } from "@/services/shoppingCartdb/addProductToShoppingCartByAmount";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";

interface CarouselProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  id: number;
  reference?: HTMLDivElement;
}
export default function CarouselProductCard(props: CarouselProductCardProps) {
  const { description, image, title, price, id, reference } = props;
  const [itHasOffer, setItHasOffer] = useState<boolean>(false);
  const [priceWithOffer, setPriceWithOffer] = useState<number>();
  const [itHasFreeShipping, setItHasFreeShipping] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasOffer(price)) {
      setItHasOffer(hasOffer(price));
      setItHasFreeShipping(hasFreeShipping(price, 500));
      setPriceWithOffer(newPriceWithDiscount(price, 20));
    }
  }, []);

  let standardPrice = price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  const descriptionTruncated = sliceText(description, 0, 100, true);

  const handleAddItem = () => {
    setQuantity((prev) => (!isNaN(prev) ? prev + 1 : 1));
  };

  const handleSubtractItem = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      if (isNaN(prev)) return 1;
      return prev - 1;
    });
  };

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filterOnlyNumbers = value.replace(/[^0-9]/gi, "");
    setQuantity((prev) => {
      if (parseFloat(filterOnlyNumbers) <= 1) return 1;
      return parseFloat(value);
    });
  };

  const handleAddToCart = async () => {
    if (isLogged) {
      try {
        dispatch(
          activeGlobalSpinner({
            isActiveLoadingSpinner: true,
            itemID: "",
          })
        );
        const token = getEntityInLocalStorage("userToken");
        const adapterForAddByAmount = adapterForAddProductForAmount({
          productId: id,
          quantity,
        });
        const counter = await addProductToShippingCartByAmount(
          adapterForAddByAmount,
          token.token_access
        );
        dispatch(updateShoppingCartCounter({ count: counter }));
        return;
      } catch (error) {
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            //@ts-ignore
            warningMessage: `${error.response.data.message}`,
          })
        );
      }
    }
    dispatch(
      addItemsToProductByAmount({
        key: "shoppingCart",
        product: { productId: id, quantity },
      })
    );
  };

  return (
    <>
      <div
        {...(reference ? { ref: reference as HTMLDivElement } : null)}
        className="flex flex-col gap-1 min-w-[278px] p-3 h-auto shadow-md justify-between"
      >
        <Link href={`/product/${id}`}>
          <div className=" relative w-full h-[300px]">
            <Image fill src={image} alt={`${title}`} />
            {itHasOffer && (
              <>
                <span className="z-10 absolute -right-2 -top-4 text-4xl text-red-600 bg-white rounded-full  ">
                  <BiSolidOffer />
                </span>
                {itHasFreeShipping && (
                  <span className="z-10 absolute -left-1 -top-4 text-4xl text-science-blue-500 bg-white rounded-full  ">
                    <FaShippingFast />
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-1 h-fit overflow-hidden ">
            <h3 className="font-semibold text-base-color">{title}</h3>
            <p className="hyphens-auto">{descriptionTruncated}</p>
          </div>
        </Link>
        <div className="flex flex-col ">
          {itHasOffer && (
            <span className="font-semibold text-science-blue-300 line-through text-sm">
              {price.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
          )}
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-left text-base-color">
              {itHasOffer
                ? priceWithOffer?.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })
                : standardPrice}
            </span>
            {itHasOffer && (
              <span className="text-sm text-science-blue-500">
                %20 de descuento
              </span>
            )}
          </div>
          {itHasFreeShipping && (
            <span className="text-sm text-science-blue-400">Envio Gratis</span>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-2 ">
          <span>
            <QuantityToAddToCart
              handleAddItem={handleAddItem}
              handleOnChange={handleOnInputChange}
              handleSubtractItem={handleSubtractItem}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </span>
          <Button onClick={handleAddToCart} className="p-2">
            Agregar al carrito
          </Button>
        </div>
      </div>
    </>
  );
}
