import React from "react";
import Category from "./CategoryCard/CategoryCard";
import { catagoriesLinksGroup } from "./utils/catagoriesLinksGroup";
export default function MobileCategories() {
  return (
    <>
      <h2 className="text-base-color md:hidden font-bold text-lg">
        Categorias
      </h2>
      <div className="w-full flex gap-2  md:hidden  overflow-hidden overflow-x-auto">
        {catagoriesLinksGroup.map((category) => (
          <Category
            titleEs={category.titleEs}
            icon={category.icon}
            route="/"
            id={category.id}
            titlesEn={category.titlesEn}
            key={category.id}
          />
        ))}
      </div>
    </>
  );
}
