import { Product } from "@/interfaces/product";
import globalWarning from "@/redux/slices/globalWarning/globalWarning";
import { getProducts } from "@/services";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { useDispatch } from "react-redux";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [
    groupOfProductOfDifferentCategories,
    setGroupOfProductsOfDifferentCategories,
  ] = useState<Product[]>();
  const [groupOfMatchProducts, setGroupOfMatchProducts] = useState<Product[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      getProducts().then((res) =>
        setGroupOfProductsOfDifferentCategories((prev) => [...res])
      );
    } catch (error) {
      dispatch(
        //@ts-ignore
        globalWarning({
          isActiveWarning: true,
          severity: "error",
          warningMessage: `${error}`,
        })
      );
    }
  }, []);

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsSearching(true);
    if (value.length === 0) setIsSearching(false);
    setSearch(value);
    setGroupOfMatchProducts(() => {
      return groupOfProductOfDifferentCategories?.filter((product) => {
        return product.title
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      });
    });
  };

  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const inputFocus = () => {
    if (search.length >= 1) {
      setIsSearching(true);
      setGroupOfMatchProducts(() => {
        return groupOfProductOfDifferentCategories?.filter((product) => {
          return product.title
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim());
        });
      });
    }
  };
  return (
    <form
      className="flex relative w-fit"
      onSubmit={handleSearchFormSubmit}
      onBlur={() => {
        setIsSearching(false);
      }}
      onFocus={inputFocus}
    >
      <input
        onChange={handleInputSearch}
        value={search}
        placeholder="¿Que buscas?"
        className="p-2 w-1/2 lg:w-[300px] xl:w-[500px] rounded-l-xl outline-[#22d3ee] outline-1 text-black"
      />
      <button className="bg-white rounded-r-xl p-2 border-l border-l-[#e2e8f0]">
        <span className="text-2xl text-black ">
          <CgSearch />
        </span>
      </button>
      {isSearching && (
        <div
          className="
          max-h-[700px]
        overflow-y-auto
        absolute
        w-[95%]
      bg-white
        p-2
        top-8
        z-30
        flex
        flex-col
        gap-2
        border-b-1
        border-b-[#a8a29e]
        "
        >
          {groupOfMatchProducts && groupOfMatchProducts?.length >= 1 ? (
            groupOfMatchProducts.map((matchProduct) => (
              <Link
                className="text-black hover:text-[#1d4ed8] hover:bg-[#e7e5e4] p-1"
                href={`/product/${matchProduct.id}`}
              >
                <p>{matchProduct.title}</p>
              </Link>
            ))
          ) : (
            <p className="text-black">
              No se encontraron productos con este nombre
            </p>
          )}
        </div>
      )}
    </form>
  );
}
