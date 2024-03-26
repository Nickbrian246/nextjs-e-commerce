import React from "react";
import { catagoriesLinksGroup } from "../utils/catagoriesLinksGroup";
import Link from "next/link";
import useContextLanguage from "@/hooks/useContextLanguage";
export default function CollapsableCategoryBar() {
  const [currentLanguage] = useContextLanguage()
  return (
    <>
      <nav
        className={`
      w-full
      absolute
      top-[56px]
      left-0
      border
      border-[#f0f0f0]
      transition-all
      duration-1000
      block
      overflow-hidden
      md:flex
      md:flex-col
      `}
      >
        <ul className="flex flex-col ">
          {catagoriesLinksGroup.map((category) => (
            <li
              className={`
            bg-gray
            p-2
            uppercase
            flex
            gap-2
            items-center
          text-textGray
          hover:text-base-color
          border-b-[#f0f0f0]
            border-b-[2px]
            `}
              key={category.titlesEn}
            >
              <span className="m-0 p-0 text-xl h-12 flex items-center ">
                {category.icon}
              </span>
              <Link href={`/category/${category.id}`}>{currentLanguage ==="en" ?   category.titlesEn  :category.titleEs}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
