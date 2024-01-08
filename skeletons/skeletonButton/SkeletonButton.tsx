"use client";
import React from "react";

export default function SkeletonButton() {
  return (
    <div className="animate-pulse bg-gray-300 bg-#9ca3af text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <span className="w-4 h-4 bg-gray-500 mr-2 rounded-full"></span>
      <span className="w-4 h-4 bg-gray-500 mr-2 rounded-full"></span>
      <span className="w-4 h-4 bg-gray-500 mr-2 rounded-full"></span>
      <span>Loading</span>
    </div>
  );
}
