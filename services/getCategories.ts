import { Category } from "@/interfaces/categoryInterface";
const BASEURL =  process.env.NEXT_PUBLIC_BASE_URL


export  async function getCategories():Promise<Category[]> {
  const categoriesRequest = await fetch(`${BASEURL}categories`);
  const response = await categoriesRequest.json();
  return response;
}