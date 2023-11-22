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

import Error from "./error";
export default async function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);
  const groupProducts = await getProducts();
  const { category } = product;
  const { id } = category;
  const truncateGroupOfProductsTo15 = groupProducts.slice(15, 30);
  const groupOfProductsByCategory = await getProductsByCategory(id);

  return (
    //@ts-ignore
    <ErrorBoundary errorComponent={<Error />}>
      <div className=" w-full flex flex-col md:flex-row items-center lg:max-w-6xl">
        <MobileProductCarousel images={product.images} />
        <ProductViewer images={product.images} />
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
  );
}
