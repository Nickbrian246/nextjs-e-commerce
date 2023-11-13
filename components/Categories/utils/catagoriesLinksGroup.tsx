import { Link } from "@/interfaces";
import {
  GiClothes,
  GiConverseShoe,
  GiShinyApple,
  GiDiamondRing,
} from "react-icons/gi";
import { BsMouse2 } from "react-icons/bs";
import { BiSolidWatch, BiSolidBook } from "react-icons/bi";
import {
  MdChair,
  MdKitchen,
  MdOutlineHealthAndSafety,
  MdOutlineSportsTennis,
  MdOutlineSmartToy,
} from "react-icons/md";

export const catagoriesLinksGroup: Link[] = [
  {
    titleEs: "ropa", //check
    titlesEn: "clothes",
    route: "",
    description: "this route takes  you to accessories page",
    icon: <GiClothes />,
    id: "1",
  },
  {
    titleEs: "electronicos", //check
    titlesEn: "electronics",
    route: "",
    description: "this route takes  you to accessories page",
    icon: <BsMouse2 />,
    id: "2",
  },
  {
    titleEs: "deportes y exteriores ", //check
    titlesEn: "sports and outdoors",
    route: "",
    description: "this route takes  you to accessories page",
    icon: <MdOutlineSportsTennis />,
    id: "18",
  },
  {
    titleEs: "relojes y joyeria ", //check
    titlesEn: "jewelry and watches",
    route: "",
    description: "this route takes  you to accessories page",
    icon: <GiDiamondRing />,
    id: "19",
  },
  {
    titleEs: "muebles",
    titlesEn: "furniture", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <MdChair />,
    id: "20",
  },
  {
    titleEs: "zapatos", //check
    titlesEn: "shoes",
    route: "",
    description: "this route takes  you to accessories page",
    icon: <GiConverseShoe />,
    id: "4",
  },
  {
    titleEs: "frutas",
    titlesEn: "fruits", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <GiShinyApple />,
    id: "13",
  },
  {
    titleEs: "juegos y juguetes",
    titlesEn: "toys and games", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <MdOutlineSmartToy />,
    id: "15",
  },
  {
    titleEs: "casa y cocina",
    titlesEn: "home and kitchen", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <MdKitchen />,
    id: "14",
  },
  {
    titleEs: "salud y belleza",
    titlesEn: "health and beauty", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <MdOutlineHealthAndSafety />,
    id: "16",
  },
  {
    titleEs: "libros y media",
    titlesEn: "books and media", //check
    route: "",
    description: "this route takes  you to accessories page",
    icon: <BiSolidBook />,
    id: "17",
  },
];
