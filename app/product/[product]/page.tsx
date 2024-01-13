"use client";
import Carousel from "@/components/Carousel/Carousel";
import { getProductsByCategory } from "@/components/Carousel/services/getProductByCategory";
import { Button } from "@/components/components/Button";
import { Product } from "@/interfaces/product";
import {
  addItemsToProductByAmount,
  updateShoppingCartCounter,
} from "@/redux/slices/ShoppingCart";
import { getProducts } from "@/services";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileProductCarousel from "./_components/productCarousel.tsx/MobileProductCarousel";
import ProductCostDetails from "./_components/productDetails/ProductCostDetails";
import ProductDescription from "./_components/productDetails/ProductDescription";
import ProductTitleAndOffer from "./_components/productDetails/ProductTitleAndOffer";
import QuantityToAddToCart from "./_components/productDetails/QuantityToAddToCart";
import ShippingDetails from "./_components/productDetails/ShippingDetails";
import ProductViewer from "./_components/productViewer/ProductViewer";
import { getProduct } from "./_services";
import Error from "./error";
import { activeGlobalSpinner } from "@/redux/slices/globalSpinner/globalSpinner";
import { adapterForAddProductForAmount } from "./_adapter";
import { activeWarning } from "@/redux/slices/globalWarning/globalWarning";
import { getEntityInLocalStorage } from "@/utils/localStorage/localStorageGeneric";
import { addProductToShippingCartByAmount } from "@/services/shoppingCartdb/addProductToShoppingCartByAmount";

import Loading from "./loading";
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
  //@ts-ignore
  const { isLogged } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const product = await getProduct(params.product);
        setProduct(product);

        const groupProducts = await getProducts();
        setGroupOfProducts(groupProducts);

        const { category } = product;
        const groupOfProductsByCategory = await getProductsByCategory(category);
        setGroupOfProductsByCategory(groupOfProductsByCategory);

        const randomImages = groupProducts.map((product) => product.image);
        const extractThreeImages = randomImages
          .slice(0, 2)
          .concat(product.image);
        setExtractThreeImages(extractThreeImages);

        const truncateGroupOfProductsTo15 = groupProducts.slice(15, 30);
        setTruncateGroupOfProductsTo15(truncateGroupOfProductsTo15);
      } catch (error) {
        dispatch(
          //@ts-ignore
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            //@ts-ignore
            warningMessage: `${error.response.data.message}`,
          })
        );
      }
    };
    getData();
  }, []);

  const handleAddItem = async () => {
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
  const handleAddToCart = async () => {
    if (isLogged) {
      try {
        dispatch(
          activeGlobalSpinner({
            isActiveLoadingSpinner: true,
            itemID: "",
          })
        );
        const token = getEntityInLocalStorage("userToken");
        const adapterForAddByAmount = adapterForAddProductForAmount({
          productId: Number(params.product),
          quantity,
        });
        const counter = await addProductToShippingCartByAmount(
          adapterForAddByAmount,
          token.token_access
        );
        dispatch(updateShoppingCartCounter({ count: counter }));
        return;
      } catch (error) {
        return dispatch(
          activeWarning({
            isActiveWarning: true,
            severity: "error",
            //@ts-ignore
            warningMessage: `${error.response.data.message}`,
          })
        );
      }
    }

    dispatch(
      addItemsToProductByAmount({
        key: "shoppingCart",
        product: { productId: parseInt(params.product), quantity },
      })
    );
  };

  const handleBuy = () => {
    router.push(
      `/delivery-address?product=${params.product}&quantity=${quantity}`
    );
  };
  return (
    <>
      {groupOfProducts?.length > 1 &&
      extractThreeImages?.length > 1 &&
      groupOfProductsByCategory?.length > 1 &&
      truncateGroupOfProductsTo15?.length > 1 ? (
        //@ts-ignore
        <ErrorBoundary errorComponent={<Error />}>
          <div className=" w-full flex flex-col md:flex-row items-start lg:max-w-6xl mt-5">
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
              <Button onClick={handleBuy} className=" min-w-[400px] m-auto">
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
          <div className="w-full overflow-hidden flex flex-col gap-16 mt-8">
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
        <section className=" w-full h-screen flex flex-col justify-start items-center  ">
          <Loading />
        </section>
      )}
    </>
  );
}
