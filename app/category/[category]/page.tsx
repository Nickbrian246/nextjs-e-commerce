import React from "react";
import Categories from "@/components/Categories/Categories";
import { getProductsByCategory } from "@/components/Carousel/services/getProductByCategory";
import ProductCard from "@/components/productCard/components/ProductCard";
import Divider from "@/components/Divider/Divider";
import { categoryNameSelected } from "./_utils";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  //@ts-ignore
  const categoryName = categoryNameSelected[params.category.toLowerCase()];
  return {
    title: categoryName,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const groupOfProducts = await getProductsByCategory(params.category);

  //@ts-ignore
  const categoryName = categoryNameSelected[params.category.toLowerCase()];
  await generateMetadata({ params });
  return (
    <>
      <aside>
        <Categories title="Mas Categoriás" />
      </aside>
      <section className="  flex flex-col ">
        <h2
          className="
        text-4xl
        first-letter:uppercase
        text-science-blue-500
        font-medium
        "
        >
          {categoryName ?? "fail to get the category name"}
        </h2>
        <Divider />
        <div className="  flex flex-wrap max-w-5xl items-center justify-start  w-full">
          {groupOfProducts.map((product) => (
            <ProductCard
              category={product.category}
              description={product.description}
              id={product.id}
              image={product.image}
              price={product.price}
              title={product.title}
              key={product.id}
              rating={product.rating}
            />
          ))}
        </div>
      </section>
    </>
  );
}
