"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import IndexBar from "./components/IndexBar/IndexBar";
import { CarouselData } from "./interfaces";
export default function Slider({
  groupOfProducts,
}: {
  groupOfProducts: CarouselData[];
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [groupOfImages, setGroupOfImages] =
    useState<CarouselData[]>(groupOfProducts);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState(
    groupOfImages[selectedIndex].image
  );

  const handleNextBtn = () => {
    setLoaded(false);
    setTimeout(() => {
      setSelectedIndex((prevIndex) => {
        const next = prevIndex < groupOfImages.length - 1 ? prevIndex + 1 : 0;
        setSelectedImage(groupOfImages[next].image);
        return next;
      });
    }, 500);
  };

  const handlePreviousBtn = () => {
    setLoaded(false);
    setTimeout(() => {
      setSelectedIndex((prevIndex) => {
        const lastIndex = groupOfImages.length - 1;
        const previous = prevIndex > 0 ? prevIndex - 1 : lastIndex;
        setSelectedImage(groupOfImages[previous].image);
        return previous;
      });
    }, 500);
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    setSelectedImage(groupOfImages[selectedIndex].image);
    const timeoutId = setTimeout(() => {
      handleNextBtn();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedIndex, groupOfImages]);

  return (
    <Link className="w-full  h-auto xl:p-5  relative" href={"/"}>
      <div
        className="w-full flex justify-center h-auto xl:p-5  relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full flex flex-row overflow-hidden max-w-3xl aspect-[30/20] ">
          <Image
            onLoad={() => setLoaded(true)}
            className={`object-fit ${
              loaded ? "opacity-100" : "opacity-0"
            } transition-all duration-500  `}
            fill
            src={selectedImage}
            alt="carousel image"
            quality={100}
          />
          <IndexBar
            isMouseOver={isMouseOver}
            GroupOfProducts={groupOfProducts}
            currentIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
        <button
          className={` rounded-full text-base-color font-extrabold ${
            isMouseOver ? "flex" : "hidden"
          } items-center justify-center absolute top-[45%] right-4 w-12 h-12`}
          onClick={handleNextBtn}
        >
          <SlArrowRight />
        </button>
        <button
          className={`bg-white rounded-full ${
            isMouseOver ? "flex" : "hidden"
          } text-base-color font-extrabold  items-center justify-center absolute top-[45%]  left-4 w-12 h-12`}
          onClick={handlePreviousBtn}
        >
          <SlArrowLeft />
        </button>
      </div>
    </Link>
  );
}
