import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  menuOptionsForLoggedUserGroup,
  menuOptionsForNotLoggedUserGroup,
} from "../utils";
import QuantityIndicator from "@/components/components/quantityIndicator/QuantityIndicator";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/auth/sliceForAuth";
import { checkShoppingCart } from "@/redux/slices/ShoppingCart";
import { useEffect } from "react";
interface Props {
  isOpenCollapsableMenu: boolean;
  isLogged: boolean;
}
export default function CollapsableMenu({
  isOpenCollapsableMenu,
  isLogged,
}: Props) {
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkShoppingCart({ key: "shoppingCart" }));
  }, []);

  const handleLogOut = (title: string) => {
    if (title === "Cerrar sesión") dispatch(logOut());
  };
  return (
    <nav
      style={isOpenCollapsableMenu ? { height: "200px" } : { height: "0px" }}
      className="md:hidden flex flex-col overflow-hidden transition-all top-12 ease-linear duration-300 left-0 right-0 absolute z-20 bg-base-color"
    >
      <ul className="flex  flex-col gap-4  text-sm text-white  uppercase">
        {isLogged
          ? menuOptionsForLoggedUserGroup.map((option) => (
              <Link href={option.route} key={option.id}>
                <button onClick={() => handleLogOut(option.titleEs)}>
                  <div className=" flex gap-4 p-2 items-center">
                    <div
                      className={`text-xl relative ${
                        option.titleEs === "Cerrar sesión"
                          ? "text-[#fea3a7]"
                          : ""
                      }`}
                    >
                      {option.icon}
                      {option.id === "shoppingcart" &&
                        productsInShoppingCart > 0 && (
                          <span className="absolute -top-3 -right-3">
                            <QuantityIndicator />
                          </span>
                        )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{option.titleEs}</p>
                    </div>
                  </div>
                </button>
              </Link>
            ))
          : menuOptionsForNotLoggedUserGroup.map((option) => (
              <Link href={option.route} key={option.id}>
                <button onClick={() => handleLogOut(option.titleEs)}>
                  <div className=" flex gap-4 p-2 items-center">
                    <div
                      className={`text-xl relative ${
                        option.titleEs === "Cerrar sesión"
                          ? "text-[#fea3a7]"
                          : ""
                      }`}
                    >
                      {option.icon}
                      {option.id === "shoppingcart" &&
                        productsInShoppingCart > 0 && (
                          <span className="absolute -top-3 -right-3">
                            <QuantityIndicator />
                          </span>
                        )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{option.titleEs}</p>
                    </div>
                  </div>
                </button>
              </Link>
            ))}
      </ul>
    </nav>
  );
}
