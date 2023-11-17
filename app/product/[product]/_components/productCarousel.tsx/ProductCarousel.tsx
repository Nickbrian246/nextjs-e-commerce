"use client";
import { useRef, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductCarousel(props: Props) {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imageRefs = images.map(() => useRef<HTMLDivElement>(null));

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setCurrentIndex(index);
      }
    });
  };

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    imageRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [imageRefs]);

  return (
    <div className="max-w-[300px] relative flex gap-2  bg-base-color overflow-hidden">
      <div className=" absolute   top-2 left-4 z-10  w-12 bg-science-blue-500 text-center rounded-lg text-white">
        {`${currentIndex + 1} / ${images.length}`}
      </div>

      <SwipeableViews
        index={currentIndex}
        onChangeIndex={handleIndexChange}
        enableMouseEvents
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative min-w-[310px] min-h-[300px] max-h-[350px] max-w-[350px]"
            ref={imageRefs[index]}
          >
            <Image src={image} alt="product" fill={true} />
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
}
