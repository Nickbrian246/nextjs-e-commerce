"use client";
import { useRef, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function MobileProductCarousel(props: Props) {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imageRefs = images.map(() => useRef<HTMLDivElement>(null));
  console.log(imageRefs);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = imageRefs.findIndex((ref) => ref.current === entry.target);
      if (entry.isIntersecting) setCurrentIndex(index);
    });
  };

  useEffect(() => {
    const options = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    imageRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-w-[300px] md:hidden w-full relative flex gap-2  bg-base-white overflow-hidden">
      <div className=" absolute   top-2 left-4 z-10  w-12 bg-science-blue-500 text-center rounded-lg text-white">
        {`${currentIndex + 1} / ${images.length}`}
      </div>

      <div className="w-full flex gap-2  md:hidden  overflow-hidden overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-full min-w-[310px] min-h-[300px] "
            ref={imageRefs[index]}
          >
            <Image src={image} alt="product" fill={true} objectFit="contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
