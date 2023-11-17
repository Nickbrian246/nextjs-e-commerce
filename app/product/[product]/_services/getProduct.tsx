import { Product } from "@/interfaces/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getProduct(id: string): Promise<Product> {
  const request = await fetch(`${BASE_URL}products/${id}`);
  const response = request.json();
  return response;
}
