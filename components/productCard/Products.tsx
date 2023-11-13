import React from "react";
import ProductCard from "./components/ProductCard";
import { getProductsByPagination } from "@/services/getProductsByPagination";
export default async function Products() {
  const groupOfProducts = await getProductsByPagination();
  return (
    <div className="flex  flex-col md:w-3/4  lg:max-w-5xl  p-1">
      <h2 className="text-base-color md:text-2xl font-bold text-lg">
        Productos Mas vendidos
      </h2>
      <div className="w-full flex flex-wrap gap-9 md:gap-6     items-center mt-5">
        {groupOfProducts.map((product) => (
          <ProductCard
            category={product.category}
            description={product.description}
            id={product.id}
            images={product.images}
            price={product.price}
            title={product.title}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
