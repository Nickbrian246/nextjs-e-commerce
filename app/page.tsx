"use client";
import Categories from "@/components/Categories/Categories";
import MobileCategories from "@/components/Categories/MobileCategories";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Products from "@/components/productCard/Products";
import { Product } from "@/interfaces/product";
import { getProducts } from "@/services";
import { error } from "console";
import { useEffect, useState } from "react";
import globalWarning from "@/redux/slices/globalWarning/globalWarning";
import { useDispatch } from "react-redux";

import { isLogged } from "@/redux/slices/auth/sliceForAuth";
import Loading from "./loading";

export default function Home() {
  const [groupOfProducts, setGroupOfProduct] = useState<Product[]>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLogged());
    getProducts()
      .then((res) => setGroupOfProduct(res))
      .catch(() => {
        dispatch(
          //@ts-ignore
          globalWarning({
            isActiveWarning: true,
            severity: "error",
            warningMessage: "Error al cargar los productos",
          })
        );
      });
  }, []);

  return (
    <>
      {groupOfProducts && groupOfProducts?.length > 1 ? (
        <>
          <header className="w-full bg-base-color md:flex md:justify-between  ">
            <Header />
          </header>
          <section
            className="
      flex 
      flex-col
      m-auto
      md:flex-row
      md:justify-center
      gap-5
      p-4
      "
          >
            <MobileCategories />
            <Categories />

            {groupOfProducts && groupOfProducts.length >= 1 && (
              <Products groupOfProducts={groupOfProducts} />
            )}
          </section>
          <footer className="w-full bg-black">
            <Footer />
          </footer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
