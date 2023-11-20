import { Product } from "@/interfaces/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductsByCategory(
  category: number
): Promise<Product[]> {
  const request = await fetch(`${BASE_URL}categories/${category}/products`);
  const response = await request.json();
  return response;
}
