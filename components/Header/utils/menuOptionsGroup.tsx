import { HiOutlineUserCircle } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface HeaderMenuOptionGroup {
  titleEs: string;
  titleEn: string;
  icon?: React.ReactNode;
  isLogged: boolean;
}
export const menuOptionsForLoggedUserGroup: HeaderMenuOptionGroup[] = [
  {
    titleEn: "Logout",
    titleEs: "Cerrar sesión",
    icon: <FiLogOut />,
    isLogged: true,
  },
  {
    titleEn: "shopping cart",
    titleEs: "Carrito de compras",
    icon: <AiOutlineShoppingCart />,
    isLogged: true,
  },
  {
    titleEn: "User",
    titleEs: "Usuario",
    icon: <HiOutlineUserCircle />,
    isLogged: true,
  },
];
export const menuOptionsForNotLoggedUserGroup: HeaderMenuOptionGroup[] = [
  {
    titleEn: "shopping cart",
    titleEs: "Carrito de compras",
    icon: <AiOutlineShoppingCart />,
    isLogged: true,
  },
  {
    titleEn: "Login",
    titleEs: "Iniciar sesión.",
    icon: <BiLogIn />,
    isLogged: true,
  },
];
