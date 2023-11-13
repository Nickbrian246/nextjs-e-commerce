import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { groupOfLinks } from "./utils/groupOfLinks";

interface Props {
  isOpenCollapsableMenu: boolean;
}
export default function CollapsableMenu({ isOpenCollapsableMenu }: Props) {
  return (
    <nav
      className={`
    w-full
    p-4
    z-[-1]
    absolute 
    bg-base-color
    border-t-[1px]
    border-t-white 
    transition-all 
    duration-500
    ease-out
    ${isOpenCollapsableMenu ? "top-[56px]" : "top-[-399px] "} 
    `}
    >
      <ul className="flex  flex-col gap-4  text-sm text-white  uppercase">
        <Link href={"/"} className="">
          <BiHomeAlt />
        </Link>
        {groupOfLinks.map((link) => (
          <Link key={link.titleEs} href={"/"}>
            {link.titleEs}
          </Link>
        ))}
        <Link href={"/"}>
          <AiOutlineShoppingCart />
        </Link>
      </ul>
    </nav>
  );
}
