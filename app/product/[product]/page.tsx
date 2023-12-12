"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MobileProductCarousel from "./_components/productCarousel.tsx/MobileProductCarousel";
import AddToCartAndBuyButtons from "./_components/productDetails/AddToCartAndBuyButtons";
import ProductCostDetails from "./_components/productDetails/ProductCostDetails";
import ProductTitleAndOffer from "./_components/productDetails/ProductTitleAndOffer";
import ShippingDetails from "./_components/productDetails/ShippingDetails";
import ProductViewer from "./_components/productViewer/ProductViewer";
import ProductDescription from "./_components/productDetails/ProductDescription";
import QuantityToAddToCart from "./_components/productDetails/QuantityToAddToCart";
import Carousel from "@/components/Carousel/Carousel";
import { getProduct } from "./_services";
import { getProductsByCategory } from "@/components/Carousel/services/getProductByCategory";
import { getProducts } from "@/services";
import { Product } from "@/interfaces/product";
import Error from "./error";
import { ChangeEvent, useEffect, useState } from "react";
import { ButtonRouter } from "@/components/components/ButtonRouter";
import { useRouter } from "next/navigation";
import { addItemsToProductByAmount } from "@/redux/slices/ShoppingCart";
import { useDispatch } from "react-redux";
import { Button } from "@/components/components/Button";
export default function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const [extractThreeImages, setExtractThreeImages] = useState<string[]>([]);
  const [truncateGroupOfProductsTo15, setTruncateGroupOfProductsTo15] =
    useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [groupOfProducts, setGroupOfProducts] = useState<Product[]>([]);
  const [groupOfProductsByCategory, setGroupOfProductsByCategory] = useState<
    Product[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const product = await getProduct(params.product);
      setProduct(product);

      const groupProducts = await getProducts();
      setGroupOfProducts(groupProducts);

      const { category } = product;
      const groupOfProductsByCategory = await getProductsByCategory(category);
      setGroupOfProductsByCategory(groupOfProductsByCategory);

      const randomImages = groupProducts.map((product) => product.image);
      const extractThreeImages = randomImages.slice(0, 2).concat(product.image);
      setExtractThreeImages(extractThreeImages);

      const truncateGroupOfProductsTo15 = groupProducts.slice(15, 30);
      setTruncateGroupOfProductsTo15(truncateGroupOfProductsTo15);
    };
    getData();
  }, []);
  const handleAddItem = () => {
    setQuantity((prev) => (!isNaN(prev) ? prev + 1 : 1));
  };
  const handleSubtractItem = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      if (isNaN(prev)) return 1;
      return prev - 1;
    });
  };
  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filterOnlyNumbers = value.replace(/[^0-9]/gi, "");
    setQuantity((prev) => {
      if (parseFloat(filterOnlyNumbers) <= 1) return 1;
      return parseFloat(value);
    });
  };
  const handleAddToCart = () => {
    dispatch(
      addItemsToProductByAmount({
        key: "shoppingCart",
        product: { productId: parseInt(params.product), quantity },
      })
    );
  };
  return (
    <>
      {groupOfProducts?.length > 1 ? (
        <ErrorBoundary errorComponent={<Error />}>
          <div className=" w-full flex flex-col md:flex-row items-center lg:max-w-6xl">
            {extractThreeImages?.length > 1 && (
              <MobileProductCarousel images={extractThreeImages} />
            )}
            {extractThreeImages?.length > 1 && (
              <ProductViewer images={extractThreeImages} />
            )}
            <div className="w-full flex flex-col gap-4 p-2">
              {product && (
                <>
                  <ProductTitleAndOffer productDetails={product} />
                  <ProductDescription productDetails={product} />
                  <ProductCostDetails product={product} />
                </>
              )}
              <ShippingDetails />
              <QuantityToAddToCart
                handleOnChange={handleOnInputChange}
                handleAddItem={handleAddItem}
                handleSubtractItem={handleSubtractItem}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <Button
                onClick={() =>
                  router.push(`/shippingInformation/${params.product}`)
                }
                className=" min-w-[400px] m-auto"
              >
                Comprar
              </Button>
              <Button
                onClick={handleAddToCart}
                className=" min-w-[400px] m-auto"
              >
                Agregar al carrito
              </Button>
              {/* <AddToCartAndBuyButtons /> */}
            </div>
          </div>
          <div className="w-full overflow-hidden flex flex-col gap-16">
            {groupOfProductsByCategory?.length > 1 && (
              <Carousel
                title="Productos Relacionados"
                groupOfProducts={groupOfProductsByCategory}
              />
            )}
            {truncateGroupOfProductsTo15?.length > 1 && (
              <Carousel
                title="Productos que te podrían  gustar"
                groupOfProducts={truncateGroupOfProductsTo15}
              />
            )}
          </div>
        </ErrorBoundary>
      ) : (
        <p>hola</p>
      )}
    </>
  );
}
