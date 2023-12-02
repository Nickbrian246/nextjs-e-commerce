"use client";
import { LinkButton } from "@/components/components/LinkButton";
import { getProductById } from "@/services/getProductById";
import { getEntityProductsFromLocalStorage } from "@/utils/localStorage/localStorage";
import { useEffect, useState } from "react";
import ProductResume from "./_components/productResume/ProductResume";
import SaleResume from "./_components/shoppingProductCard/SaleResume";
import { AdapterForPriceAndFreeShipping } from "./interfaces";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  addQuantityOfCartItems,
  calculateShippingCost,
  calculateTotalPrice,
  calculateTotalProducts,
  checkOfferAndAdaptPrice,
} from "./utils";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const [groupOfProducts, setGroupOfProducts] = useState<
    AdapterForPriceAndFreeShipping[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const router = useRouter();

  useEffect(() => {
    const groupOfIdsAndQuantitiesOfShoppingCart =
      getEntityProductsFromLocalStorage("shoppingCart");
    if (Array.isArray(groupOfIdsAndQuantitiesOfShoppingCart)) {
      const promises = groupOfIdsAndQuantitiesOfShoppingCart.map(
        async (product) => {
          return await getProductById(product.productId);
        }
      );

      Promise.all(promises)
        .then((res) => {
          const addQuantityToEachProduct = addQuantityOfCartItems(
            groupOfIdsAndQuantitiesOfShoppingCart,
            res
          );
          const groupOfCartProducts = checkOfferAndAdaptPrice(
            addQuantityToEachProduct
          );
          const totalPrice = calculateTotalPrice(groupOfCartProducts);
          const shippingCost = calculateShippingCost(groupOfCartProducts);

          setShippingCost(shippingCost);
          setTotalPrice(totalPrice);
          setGroupOfProducts(groupOfCartProducts);
        })
        .catch((error) => console.error(error));
    }
  }, [productsInShoppingCart]);
  const handleBtn = () => {
    router.push("/shippingInformation/23");
  };
  return (
    <>
      <section className="p-2 shadow-xl h-fit">
        {productsInShoppingCart > 0 ? (
          <ProductResume groupOfProducts={groupOfProducts} />
        ) : (
          <NoProduct />
        )}
      </section>
      <aside className=" flex flex-col gap-2 ">
        <SaleResume
          totalPrice={totalPrice}
          totalProducts={productsInShoppingCart}
          shippingCost={shippingCost}
        />
        <ButtonRouter
          onClick={handleBtn}
          disabled={productsInShoppingCart === 0}
        >
          Comprar ahora
        </ButtonRouter>
      </aside>
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
