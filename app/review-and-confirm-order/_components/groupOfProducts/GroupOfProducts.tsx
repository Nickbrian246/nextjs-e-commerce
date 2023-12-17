"use client";
import { AdapterForPriceAndFreeShipping } from "@/app/shoppingcart/interfaces";
import { useSelector } from "react-redux";
import ProductCard from "./components/productCard";
import { MyOrderProduct } from "../../_interfaces/myOrderProduct";
interface Props {
  groupOfProducts: MyOrderProduct[];
}
export default function GroupOfProducts(props: Props) {
  const { groupOfProducts } = props;
  //@ts-ignore
  const { productsInShoppingCart } = useSelector((state) => state.shoppingCart);

  return (
    <section>
      {groupOfProducts.map((product) => (
        <ProductCard
          hasFreeShipping={product.hasFreeShipping}
          hasOffer={product.hasOffer}
          image={product.image}
          porcentageOfDiscount={product.porcentageOfDiscount}
          price={product.price}
          priceWithOffer={product.priceWithOffer}
          id={product.id}
          subTotal={product.subTotal}
          quantity={product.quantity ? product.quantity : 1}
          title={product.title}
          key={product.id}
        />
      ))}
    </section>
  );
}
