import { Product } from "@/interfaces/product";
import { CarouselData } from "../interfaces";
export function extractImageAndIdFromGroupOFProducts(
  groupOfProducts: Product[]
): CarouselData[] {
  const carouselData: CarouselData[] = groupOfProducts.map((product) => {
    return { alt: product.title, id: product.id, image: product.image };
  });
  return carouselData;
}
