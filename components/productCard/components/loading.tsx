import React from "react";
import HomeProductCardSkeleton from "@/skeletons/homeProductCard/HomeProductCardSkeleton";
export default function ProductsCardLoading() {
  const skeletonArr = new Array(20).fill("2");
  return (
    <div>
      {skeletonArr.map((item) => (
        <>
          <HomeProductCardSkeleton />
        </>
      ))}
    </div>
  );
}
