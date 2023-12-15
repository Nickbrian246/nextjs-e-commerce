"use client";
import { Product } from "@/interfaces/product";
import { addProductToShoppingCart } from "@/redux/slices/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { addOneItemProductToShoppingCartInDb } from "@/redux/thunks/shoppingCartdb/addOneItemProductInShoppingCartAndUpdateCounter";
import {
  discountAmount,
  hasFreeShipping,
  hasOffer,
  newPriceWithDiscount,
} from "../utils/hasOffer";
export default function ProductCard(props: Product) {
  const { category, description, id, image, price, title } = props;
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [priceWithDiscount, setPriceWithDiscount] = useState<number>();
  const [savedMoney, setSavedMoney] = useState<number>(0);
  const [itHasFreeShipping, setItHasFreeShipping] = useState<boolean>();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasOffer(price)) {
      setHasDiscount(true);
      setPriceWithDiscount(newPriceWithDiscount(price, 20));
      setSavedMoney(discountAmount(price, 20));
      if (hasFreeShipping(price)) setItHasFreeShipping(true);
      return;
    }
  }, []);
  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsMouseOver(true);
  };
  const handleMouseleave: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsMouseOver(false);
  };
  const handleAddCartBtn = (key: string, id: number) => {
    if (isLogged) {
      const token = getEntityInLocalStorage("userToken");
      dispatch(
        addOneItemProductToShoppingCartInDb({
          productId: id,
          quantity: 1,
          token: token.token_access,
        })
      );
    } else {
      dispatch(
        addProductToShoppingCart({
          key,
          products: { productId: id, quantity: 1 },
        })
      );
    }
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseleave}
      className="w-full shadow-md p-1 sm:max-w-[290px] md:max-w-[200px]  lg:max-w-[320px]  flex flex-col gap-1 items-center "
    >
      {hasDiscount && (
        <div className="flex w-full flex-row justify-between">
          <Image
            src={
              "https://ddtech.mx/assets/uploads/bb7b38fe3596d6ae2baa7ba831e0e7bc.jpg"
            }
            alt={title}
            width={75}
            height={75}
          />
          {itHasFreeShipping && (
            <Image
              src={
                "https://ddtech.mx/assets/uploads/f62702bf38f686cd610313c2367c254e.jpg"
              }
              alt={title}
              width={110}
              height={27}
            />
          )}
        </div>
      )}
      <Link href={`/product/${id}`}>
        <div className="min-w-[208px] relative min-h-[208px] bg-white">
          <Image src={image} alt={title} fill={true} className="rounded-sm" />
        </div>
      </Link>
      <div className="">
        <h2>
          {title} {id}
        </h2>
        <h3 className="">
          <Link
            href={`/product/${id}`}
            className="
            text-left
          text-productTextColor
            font-sans
            leading-4
            "
          >
            {description.length > 200
              ? description.substring(0, 200)
              : description}
          </Link>
        </h3>
      </div>
      <div className=" font-bold flex items-start w-full gap-2">
        <span className="text-priceColor text-base leading-8">
          {hasDiscount
            ? priceWithDiscount?.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })
            : price.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
        </span>
        {hasDiscount && (
          <span className="text-textGray  text-xs line-through leading-8">
            {savedMoney.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </span>
        )}
      </div>
      <button
        onClick={() => {
          handleAddCartBtn("shoppingCart", id);
        }}
        title="agregar al carrito"
        className={`
        self-start
        font-medium 
        rounded-sm
      text-white
        flex 
        items-center
        w-[190px] 
        gap-2 
        p-2 
        bg-[#4b98e5]
        transition-all
        duration-300
        ${isMouseOver ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="text-white">
          <VscAdd />
        </div>
        <span>Agregar al carrito </span>
      </button>
    </div>
  );
}
