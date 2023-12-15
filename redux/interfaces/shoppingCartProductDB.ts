import { ShoppingCartProduct } from "@/utils/localStorage/interfaces";

export interface ShoppingCartAndToken extends ShoppingCartProduct {
  token: string;
}
