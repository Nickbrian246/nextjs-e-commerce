import { Product } from "@/interfaces/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const request = await fetch(`${BASE_URL}products/category/${category}`);
  const response = await request.json();
  return response;
}
