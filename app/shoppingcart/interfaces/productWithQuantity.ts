import { Product } from "@/interfaces/product";
export interface ProductWithQuantity extends Product {
  quantity?: number;
}
