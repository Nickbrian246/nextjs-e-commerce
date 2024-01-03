import React from "react";
import Link from "next/link";
export default function HomeProductCardSkeleton() {
  return (
    <div
      className="
    w-full
    shadow-md 
    p-1 
    sm:max-w-[290px] 
    md:max-w-[200px]  
    lg:max-w-[320px]  
    flex flex-col 
    gap-1 
    items-center
    animate-pulse" // Add the animate-pulse class for the skeleton effect
    >
      <div className="w-full flex flex-row justify-between">
        <div className="w-1/2">
          <div className="bg-gray-300 rounded-md h-12 w-12"></div>
        </div>
        <div className="w-1/2">
          <div className="bg-gray-300 rounded-md h-12 w-12"></div>
        </div>
      </div>
      <Link href="/product/placeholder">
        <div className="min-w-[208px] relative min-h-[208px] bg-gray-300 rounded-md"></div>
      </Link>
      <div className="">
        <h2 className="bg-gray-300 h-6 w-3/4 mb-2"></h2>
        <h3 className="bg-gray-300 h-4 w-1/2"></h3>
      </div>
      <div className="font-bold flex items-start w-full gap-2">
        <span className="bg-gray-300 h-6 w-1/3"></span>
        <span className="bg-gray-300 h-4 w-1/4"></span>
      </div>
      <button
        title="agregar al carrito"
        className="self-start font-medium rounded-sm text-white flex items-center w-[190px] gap-2 p-2 bg-[#4b98e5] transition-all duration-300 opacity-0"
      >
        <div className="text-white bg-gray-300 rounded-md h-6 w-6">
          {/* Icon placeholder */}
        </div>
        <span className="bg-gray-300 h-6 w-1/2"></span>
      </button>
    </div>
  );
}
