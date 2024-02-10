"use client";
import { Button } from "@/components/components/Button";
import LoadingSpinner from "@/components/components/LoadingSpinner";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { disableGlobalSpinner } from "@/redux/slices/globalSpinner/globalSpinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoProduct from "./_components/noProduct/NoProduct";
import ProductResume from "./_components/productResume/ProductResume";
import SavedProducts from "./_components/savedProducts/SavedProducts";
import SaleResume from "./_components/shoppingProductCard/SaleResume";
import Loading from "./loading";

export default function ShoppingCart() {
  const router = useRouter();
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);

  const { isActiveLoadingSpinner } = useSelector(
    //@ts-ignore
    (state) => state.globalSpinner
  ); //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const {
    calculateShoppingCart,
    groupOfProducts,
    shippingCost,
    totalPrice,
    isLoading,
  } = useShoppingCart();

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
      ) : groupOfProducts.length === 0 && !isLoading ? (
        <section className="w-full flex justify-center items-start">
          <NoProduct />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
