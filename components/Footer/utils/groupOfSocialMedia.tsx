import { BsFacebook, BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
export interface SocialMedia {
  icon: React.ReactNode;
  title: string;
}

export const groupOfSocialMedia: SocialMedia[] = [
  {
    icon: <BsFacebook />,
    title: "Facebook",
  },
  {
    icon: <BsInstagram />,
    title: "Instagram",
  },
  {
    icon: <RiTwitterXLine />,
    title: "X",
  },
];
