import { getProducts } from "@/services";
import Slider from "../Carousel/Slider";
import { extractImageAndIdFromGroupOFProducts } from "../Carousel/utils/filterDataForCarousel";
import ProductCard from "./components/ProductCard";
import { Suspense } from "react";
import ProductsCardLoading from "./components/loading";

export default async function Products() {
  const groupOfProducts = await getProducts();

  const groupOfProductsForCarousel = groupOfProducts.slice(0, 8);
  const filterDataForCarousel = extractImageAndIdFromGroupOFProducts(
    groupOfProductsForCarousel
  );

  return (
    <div className="flex  flex-col md:w-3/4  lg:max-w-5xl  p-1">
      <div className="w-full flex justify-center mb-5 ">
        <Slider groupOfProducts={filterDataForCarousel} />
      </div>
      <h2 className="text-base-color md:text-2xl font-bold text-lg">
        Productos Mas vendidos
      </h2>
      <div className="w-full flex flex-wrap gap-9 md:gap-6     items-center mt-5">
        {groupOfProducts.map((product) => (
          <ProductCard
            category={product.category}
            description={product.description}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            rating={product.rating}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
