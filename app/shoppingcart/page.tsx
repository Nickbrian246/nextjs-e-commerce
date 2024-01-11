"use client";
import { Button } from "@/components/components/Button";
import { LinkButton } from "@/components/components/LinkButton";
import LoadingSpinner from "@/components/components/LoadingSpinner";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { disableGlobalSpinner } from "@/redux/slices/globalSpinner/globalSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ProductResume from "./_components/productResume/ProductResume";
import SavedProducts from "./_components/savedProducts/SavedProducts";
import SaleResume from "./_components/shoppingProductCard/SaleResume";

import Loading from "./loading";

export default function ShoppingCart() {
  const router = useRouter();
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isActiveLoadingSpinner } = useSelector(
    //@ts-ignore
    (state) => state.globalSpinner
  ); //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const { calculateShoppingCart, groupOfProducts, shippingCost, totalPrice } =
    useShoppingCart();

  useEffect(() => {
    calculateShoppingCart();
    dispatch(disableGlobalSpinner());
  }, [productsInShoppingCart]);

  const handleBtn = () => {
    router.push(`/delivery-address?product=sc`);
  };

  return (
    <>
      {productsInShoppingCart > 0 && groupOfProducts.length >= 1 ? (
        <>
          <section className="flex flex-col gap-44">
            <div className="p-2 shadow-xl h-fit relative">
              {productsInShoppingCart > 0 ? (
                <ProductResume groupOfProducts={groupOfProducts} />
              ) : (
                <NoProduct />
              )}
              {isActiveLoadingSpinner && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="scale-150 text-lg text-science-blue-500">
                    <LoadingSpinner />
                  </span>
                </div>
              )}
            </div>
            <section>{isLogged && <SavedProducts />}</section>
          </section>

          <aside className=" flex flex-col gap-2 ">
            <SaleResume
              totalPrice={totalPrice}
              totalProducts={productsInShoppingCart}
              shippingCost={shippingCost}
            />
            <Button onClick={handleBtn} disabled={!!!productsInShoppingCart}>
              Comprar ahora
            </Button>
          </aside>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
function NoProduct() {
  return (
    <>
      <div className=" lg:min-w-[580px] flex  gap-3 min-h-[200px] p-4 flex-col  justify-center items-center">
        <p className="text-lg font-semibold text-center ">
          Aún no tienes productos en tu carrito de compras. <br />
          Te invitamos a que agregues algunos.
        </p>
        <span className="text-4xl ">
          <FaShoppingBag />
        </span>
        <LinkButton href={"/"}>Vamos de compras!!!</LinkButton>
      </div>
    </>
  );
}
