import React from "react";
import MenuTop from "../menuTop/MenuTop";
import { groupOfSocialMedia } from "./utils/groupOfSocialMedia";
import SocialMedia from "./components/SocialMedia";
export default function Footer() {
  return (
    <div className="w-full p-4">
      <MenuTop />
      <div className="w-full flex flex-row justify-center gap-5 pt-5">
        {groupOfSocialMedia.map((media) => (
          <SocialMedia
            key={media.title}
            icon={media.icon}
            title={media.title}
          />
        ))}
      </div>
    </div>
  );
}
