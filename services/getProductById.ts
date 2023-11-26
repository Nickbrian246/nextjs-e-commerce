import { Product } from "@/interfaces/product";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductById(id: number): Promise<Product> {
  const request = await fetch(`${BASEURL}products/${id}`);
  return await request.json();
}
