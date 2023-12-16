"use client";
import { Button } from "@/components/components/Button";
import { LinkButton } from "@/components/components/LinkButton";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import ProductResume from "./_components/productResume/ProductResume";
import SaleResume from "./_components/shoppingProductCard/SaleResume";

export default function ShoppingCart() {
  const router = useRouter();
  const {
    calculateShoppingCart,
    groupOfProducts,
    productsInShoppingCart,
    shippingCost,
    totalPrice,
  } = useShoppingCart();

  useEffect(() => {
    calculateShoppingCart();
  }, []);

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
        <Button onClick={handleBtn} disabled={!!!productsInShoppingCart}>
          Comprar ahora
        </Button>
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
