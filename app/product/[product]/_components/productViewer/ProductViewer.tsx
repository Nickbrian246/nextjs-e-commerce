"use client";
import React, { useState } from "react";
import Image from "next/image";
interface Props {
  images: string[];
}
export default function ProductViewer(props: Props) {
  const { images } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState(images[currentIndex]);

  const handleChangeImg = (newIndex: number) => {
    setImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="md:flex gap-2 w-full p-1 md:max-w-[812px] min-h-[400px]  hidden  ">
      {images.length > 1 && (
        <ProductViewerOptions
          currentIndex={currentIndex}
          handleChangeImg={handleChangeImg}
          images={images}
        />
      )}
      <div className="relative flex-grow-[1]">
        <Image src={image} alt="main Product Image" fill />
      </div>
    </div>
  );
}

interface ProductViewerProps extends Props {
  handleChangeImg: (index: number) => void;
  currentIndex: number;
}
function ProductViewerOptions(props: ProductViewerProps) {
  const { handleChangeImg, images, currentIndex } = props;

  return (
    <div className=" flex flex-col gap-2 ">
      {images.map((image, index) => (
        <div
          onClick={() => {
            handleChangeImg(index);
          }}
          className={`relative w-24 h-24  ${
            index === currentIndex
              ? "border-science-blue-600 border-2"
              : "border-none"
          }`}
        >
          <Image src={image} alt="productImg" fill />
        </div>
      ))}
    </div>
  );
}
