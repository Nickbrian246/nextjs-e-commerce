import { HiOutlineUserCircle } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface HeaderMenuOptionGroup {
  titleEs: string;
  titleEn: string;
  icon?: React.ReactNode;
  isLogged: boolean;
  route: string;
  id: string;
}
export const menuOptionsForLoggedUserGroup: HeaderMenuOptionGroup[] = [
  {
    titleEn: "Logout",
    titleEs: "Cerrar sesión",
    icon: <FiLogOut />,
    isLogged: true,
    route: "/",
    id: "logout",
  },
  {
    titleEn: "shopping cart",
    titleEs: "Carrito de compras",
    icon: <AiOutlineShoppingCart />,
    isLogged: true,
    route: "/shoppingcart",
    id: "shoppingcart",
  },
  {
    titleEn: "User",
    titleEs: "Usuario",
    icon: <HiOutlineUserCircle />,
    isLogged: true,
    route: "/",
    id: "user",
  },
];
export const menuOptionsForNotLoggedUserGroup: HeaderMenuOptionGroup[] = [
  {
    titleEn: "shopping cart",
    titleEs: "Carrito de compras",
    icon: <AiOutlineShoppingCart />,
    isLogged: true,
    route: "/shoppingcart",
    id: "shoppingcart",
  },
  {
    titleEn: "Login",
    titleEs: "Iniciar sesión.",
    icon: <BiLogIn />,
    isLogged: true,
    route: "/auth/signin",
    id: "login",
  },
  {
    titleEn: "signup",
    titleEs: "Registrarse",
    icon: <BiLogIn />,
    isLogged: true,
    route: "/auth/register",
    id: "signup",
  },
];
