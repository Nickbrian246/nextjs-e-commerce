"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { Product } from "@/interfaces/product";
import { smMdBreakpoint } from "@/utils/tailwind/tailwind";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SwipeableViews from "react-swipeable-views";
import CarouselProductCard from "./components/carouselProductCard/CarouselProductCard";

export default function Carousel({
  groupOfProducts,
  title,
}: {
  groupOfProducts: Product[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [twoSlicesCarousel, setTwoSlicesCarousel] = useState<boolean>(false);
  const [fistElementIsVisible, setFistElementIsVisible] =
    useState<boolean>(false);
  const [lastElementIsVisible, setLastElementIsVisible] =
    useState<boolean>(false);
  const firsElement = useRef<HTMLDivElement>(null);
  const lastElement = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const truncateProducts = groupOfProducts.slice(0, 18);
  const translateValue = `translateX(${currentPage}%)`;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (windowSize.width >= smMdBreakpoint) setTwoSlicesCarousel(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [windowSize.width]);

  useEffect(() => {
    const firstImageObserve = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setFistElementIsVisible(entry.isIntersecting);
    });

    if (firsElement.current) firstImageObserve.observe(firsElement.current);

    const lastImageObserve = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setLastElementIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (lastElement.current) lastImageObserve.observe(lastElement.current);
  });

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };
  const handleNextBtn = () => {
    setCurrentPage((prevValue) => {
      return prevValue + 100;
    });
  };
  const handleBackBtn = () => {
    setCurrentPage((prevValue) => {
      return prevValue - 100;
    });
  };

  return (
    <>
      <section className=" flex-col w-full relative  ">
        <p className="text-base-color text-start text-3xl font-semibold">
          {title}
        </p>
        <div
          style={{ transform: translateValue }}
          className="
          w-full
          p-1
          gap-2
          smMd:flex
          md:flex
          mb-6
          mt-6
          transition-all
          duration-500
          hidden
          
          "
        >
          {truncateProducts.map((product, index) => {
            if (index === 0) {
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  //@ts-ignore
                  reference={firsElement}
                  key={product.id}
                />
              );
            } else if (index + 1 === truncateProducts.length) {
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  key={product.id}
                  //@ts-ignore
                  reference={lastElement}
                />
              );
            } else
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  key={product.id}
                  //@ts-ignore
                  reference={lastElement}
                />
              );
          })}
        </div>
        <SwipeableViews
          index={currentIndex}
          onChangeIndex={handleIndexChange}
          enableMouseEvents
          className="smMd:hidden"
        >
          {truncateProducts.map((product) => (
            <CarouselProductCard
              description={product.description}
              image={product.images[0]}
              title={product.title}
              price={product.price}
              id={product.id}
              key={product.id}
            />
          ))}
        </SwipeableViews>
        <button
          onClick={handleNextBtn}
          className={`
        absolute
        justify-center
        items-center
        text-4xl
      text-base-color
        top-[40%]
        left-2
        z-20
      bg-white
        w-14
        h-14
        rounded-full
        ${!fistElementIsVisible ? " smMd:flex" : "hidden"}
        `}
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleBackBtn}
          className={` 
        absolute
        justify-center
        items-center
        text-4xl
      text-base-color
        top-[40%]
        right-2
        z-20
      bg-white
        w-14
        h-14
        rounded-full
        ${!lastElementIsVisible ? "smMd:flex" : "hidden"}
    
        `}
        >
          <IoIosArrowForward />
        </button>
      </section>
    </>
  );
}
