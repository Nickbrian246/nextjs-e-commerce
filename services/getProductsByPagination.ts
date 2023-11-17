import { Product } from "@/interfaces/product";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductsByPagination(
  limit: string
): Promise<Product[]> {
  const request = await fetch(`${BASEURL}products?offset=0&limit=${limit}`);
  const res = request.json();
  return res;
}
