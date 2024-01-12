import { Link } from "@/interfaces";
type FooterLink = Omit<Link, "icon">;
export const topNavBarLinks: FooterLink[] = [
  {
    titleEs: "Nosotros",
    titlesEn: "About us",
    description: "description link",
    route: "/",
    id: "Nosotros2",
  },
  {
    titleEs: "Blog",
    titlesEn: "Blog",
    description: "Bloglink",
    route: "/",
    id: "blog23",
  },
  {
    titleEs: "Contacto",
    titlesEn: "Contact",
    description: "description link",
    route: "/",
    id: "contacto1223",
  },
  // {
  //   titleEs: "Inicias sesión",
  //   titlesEn: "Log in",
  //   description: "description link",
  //   route: "/"
  // },
  // {
  //   titleEs: "Registrarme",
  //   titlesEn: "Sign in",
  //   description: "description link",
  //   route: "/"
  // },
];
