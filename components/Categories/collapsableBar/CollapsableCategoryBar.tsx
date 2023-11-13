import React from "react";
import { catagoriesLinksGroup } from "../utils/catagoriesLinksGroup";
import Link from "next/link";
export default function CollapsableCategoryBar() {
  return (
    <>
      <nav
        className={`
      w-full
      absolute
      top-[56px]
      left-0
      border
    border-gray
      transition-all
      duration-1000
      block
      overflow-hidden
      md:flex
      md:flex-col
      `}
      >
        <ul>
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
          border-b-gray
            border-b-[1px]
            `}
              key={category.titlesEn}
            >
              <span className="m-0 p-0">{category.icon}</span>
              <Link href={"/"}>{category.titleEs}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
