"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { Product } from "@/interfaces/product";
import { smMdBreakpoint } from "@/utils/tailwind/tailwind";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import wrapperStyles from "./carousel.module.css";
import CarouselProductCard from "./components/carouselProductCard/CarouselProductCard";

export default function Carousel({
  groupOfProducts,
  title,
}: {
  groupOfProducts: Product[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [computerSize, setComputerSize] = useState<boolean>(false);
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
      if (windowSize.width >= smMdBreakpoint) setComputerSize(true);
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
      <section
        className={
          computerSize
            ? wrapperStyles.carouselComputerSizeWrapper
            : wrapperStyles.carouselMobileWrapper
        }
      >
        <p className="text-base-color text-start text-3xl font-semibold">
          {title}
        </p>
        <div
          style={{ transform: translateValue }}
          className="
          w-full
          p-1
          gap-2
          flex
          mb-6
          mt-6
          transition-all
          duration-500
          "
        >
          {truncateProducts.map((product, index) => {
            if (index === 0) {
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  reference={firsElement}
                  key={product.id}
                />
              );
            } else if (index + 1 === truncateProducts.length) {
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  key={product.id}
                  reference={lastElement}
                />
              );
            } else
              return (
                <CarouselProductCard
                  description={product.description}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  key={product.id}
                  reference={lastElement}
                />
              );
          })}
        </div>
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
        ${!fistElementIsVisible && computerSize ? " smMd:flex" : "hidden"}
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
        ${!lastElementIsVisible && computerSize ? "smMd:flex" : "hidden"}
    
        `}
        >
          <IoIosArrowForward />
        </button>
      </section>
    </>
  );
}
