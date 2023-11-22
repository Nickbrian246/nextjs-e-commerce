import React from "react";
import Categories from "@/components/Categories/Categories";
import { getProductsByCategory } from "@/components/Carousel/services/getProductByCategory";
import ProductCard from "@/components/productCard/components/ProductCard";
import Divider from "@/components/Divider/Divider";
import { categoryNameSelected } from "./_utils";

export default async function CategoryPage({
  params,
}: {
  params: { category: number };
}) {
  const groupOfProducts = await getProductsByCategory(params.category);
  const { category } = groupOfProducts[0];
  const { name } = category;
  //@ts-ignore
  const categoryName = categoryNameSelected[name.toLowerCase()];

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
          {categoryName}
        </h2>
        <Divider />
        <div className="  flex flex-wrap max-w-5xl items-center justify-start  w-full">
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
      </section>
    </>
  );
}
