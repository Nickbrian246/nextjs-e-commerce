import React from "react";
import { SocialMedia as Props } from "../utils/groupOfSocialMedia";
export default function SocialMedia(props: Props) {
  const { icon, title } = props;
  return (
    <button className="text-borderGray hover:text-base-color">{icon}</button>
  );
}
