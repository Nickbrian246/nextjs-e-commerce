"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MobileProductCarousel from "./_components/productCarousel.tsx/MobileProductCarousel";
import AddToCartAndBuyButtons from "./_components/productDetails/AddToCartAndBuyButtons";
import ProductCostDetails from "./_components/productDetails/ProductCostDetails";
import ProductTitleAndOffer from "./_components/productDetails/ProductTitleAndOffer";
import ShippingDetails from "./_components/productDetails/ShippingDetails";
import ProductViewer from "./_components/productViewer/ProductViewer";
import ProductDescription from "./_components/productDetails/ProductDescription";
import QuantityToAddToCart from "./_components/productDetails/QuantityToAddToCart";
import Carousel from "@/components/Carousel/Carousel";
import { getProduct } from "./_services";
import { getProductsByCategory } from "@/components/Carousel/services/getProductByCategory";
import { getProducts } from "@/services";
import { Product } from "@/interfaces/product";

import Error from "./error";
import { useEffect, useState } from "react";
export default function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const [extractThreeImages, setExtractThreeImages] = useState<string[]>();
  const [truncateGroupOfProductsTo15, setTruncateGroupOfProductsTo15] =
    useState<Product[]>();
  const [product, setProduct] = useState<Product>();
  const [groupOfProducts, setGroupOfProducts] = useState<Product[]>();
  const [groupOfProductsByCategory, setGroupOfProductsByCategory] =
    useState<Product[]>();
  useEffect(() => {
    const getData = async () => {
      const product = await getProduct(params.product);
      setProduct(product);
      console.log(product);
      const groupProducts = await getProducts();
      console.log(groupProducts);
      setGroupOfProducts(groupProducts);
      const { category } = product;
      console.log(category);

      const groupOfProductsByCategory = await getProductsByCategory(category);
      console.log(groupOfProductsByCategory);
      setGroupOfProductsByCategory(groupOfProductsByCategory);
      const randomImages = groupProducts.map((product) => product.image);
      const extractThreeImages = randomImages.slice(0, 2).concat(product.image);
      console.log(extractThreeImages);
      setExtractThreeImages(extractThreeImages);
      const truncateGroupOfProductsTo15 = groupProducts.slice(15, 30);
      setTruncateGroupOfProductsTo15(truncateGroupOfProductsTo15);
    };
    getData();

    // const product = await getProduct(params.product);
    // const groupProducts = await getProducts();
    // const { category } = product;
    // const groupOfProductsByCategory = await getProductsByCategory(category);
  }, []);
  console.log(extractThreeImages);
  console.log(product);

  return (
    <>
      {groupOfProducts?.length > 1 ? (
        <ErrorBoundary errorComponent={<Error />}>
          <div className=" w-full flex flex-col md:flex-row items-center lg:max-w-6xl">
            <MobileProductCarousel images={extractThreeImages} />
            <ProductViewer images={extractThreeImages} />
            <div className="w-full flex flex-col gap-4 p-2">
              <ProductTitleAndOffer productDetails={product} />
              <ProductDescription productDetails={product} />
              <ProductCostDetails product={product} />
              <ShippingDetails />
              <QuantityToAddToCart />
              <AddToCartAndBuyButtons />
            </div>
          </div>
          <div className="w-full overflow-hidden flex flex-col gap-16">
            <Carousel
              title="Productos Relacionados"
              groupOfProducts={groupOfProductsByCategory}
            />
            <Carousel
              title="Productos que te podrían  gustar"
              groupOfProducts={truncateGroupOfProductsTo15}
            />
          </div>
        </ErrorBoundary>
      ) : (
        <p>hola</p>
      )}
    </>
  );
}
