import { Product } from "@/interfaces/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getProducts(): Promise<Product[]> {
  const request = await fetch(`${BASE_URL}products`);
  const response = await request.json();
  return response;
}
