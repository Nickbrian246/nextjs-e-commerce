import { ShoppingCartProduct } from "./interfaces";
import { checkIfProductExist, addProductByAmount } from "./utils";
import { addProduct } from "./utils/Product";

export function createEntityLikeArrayOfIdsInLocalStorage(
  key: string,
  data: ShoppingCartProduct
) {
  const createShape: ShoppingCartProduct[] = [
    { productId: data.productId, quantity: data.quantity },
  ];
  localStorage.setItem(key, JSON.stringify(createShape));
  return "ok";
}

export function getEntityProductsFromLocalStorage(
  key: string
): ShoppingCartProduct[] | string {
  const exitsDataStored = localStorage.getItem(key);
  if (exitsDataStored === null) {
    return "entity not found";
  }
  return JSON.parse(exitsDataStored);
}

export function addItemToEntityInLocalStorage(
  entity: string,
  newItem: ShoppingCartProduct
) {
  const groupOfProducts = getEntityProductsFromLocalStorage(entity);
  if (groupOfProducts === "entity not found") {
    return "entity not found";
  }
  if (
    Array.isArray(groupOfProducts) &&
    checkIfProductExist(groupOfProducts, newItem)
  ) {
    const groupOfShoppingCartProducts = addProduct(groupOfProducts, newItem);
    localStorage.setItem(entity, JSON.stringify(groupOfShoppingCartProducts));
    return "ok";
  }
  if (Array.isArray(groupOfProducts)) {
    const groupOfShoppingCartProducts = [...groupOfProducts, newItem];
    localStorage.setItem(entity, JSON.stringify(groupOfShoppingCartProducts));
  }
}

export function addProductsByAmountToEntityInLocalStorage(
  key: string,
  product: ShoppingCartProduct
) {
  const groupOfProducts = getEntityProductsFromLocalStorage(key);

  if (Array.isArray(groupOfProducts)) {
    const checkPrevExistences = checkIfProductExist(groupOfProducts, product);
    if (checkPrevExistences) {
      const updateGroupOfProducts = addProductByAmount(
        groupOfProducts,
        product
      );
      localStorage.setItem(key, JSON.stringify(updateGroupOfProducts));
    } else {
      const products = groupOfProducts.concat(product);
      localStorage.setItem(key, JSON.stringify(products));
    }
  }
}

export function subtractItemFromEntityInLocalStorage(
  key: string,
  productId: number
) {
  const groupOfProducts = getEntityProductsFromLocalStorage(key);
  if (
    groupOfProducts === "entity not found" ||
    !Array.isArray(groupOfProducts)
  ) {
    return "entity not found";
  }
  const products = groupOfProducts.map((product) => {
    if (product.productId === productId) {
      if (product.quantity === 1) return product;
      else return { ...product, quantity: product.quantity - 1 };
    }
    return product;
  });

  localStorage.setItem(key, JSON.stringify(products));
}

export function deleteItemFromEntityInLocalStorage(key: string, id: any) {
  const dataStored = getEntityProductsFromLocalStorage(key);
  if (dataStored === "entity not found" || !Array.isArray(dataStored)) {
    return "entity not found";
  }
  const deleteItem = dataStored.filter((item) => item.productId !== id);
  localStorage.setItem(key, JSON.stringify(deleteItem));
  return "ok";
}

export function deleteEntityFromLocalStorage(entity: string) {
  localStorage.removeItem(entity);
}
