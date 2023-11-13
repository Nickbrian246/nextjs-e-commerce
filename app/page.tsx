import Header from "@/components/Header/Header";
import Products from "@/components/productCard/Products";
import MobileCategories from "@/components/Categories/MobileCategories";
import Categories from "@/components/Categories/Categories";
import Footer from "@/components/Footer/Footer";
export default async function Home() {
  return (
    <>
      <header className="w-full bg-base-color md:flex md:justify-between  ">
        <Header />
      </header>
      <section
        className="
      flex 
      flex-col
      m-auto
      md:flex-row
      md:justify-center
      gap-5
      p-4
      "
      >
        <MobileCategories />
        <Categories />
        <Products />
      </section>
      <footer className="w-full bg-black">
        <Footer />
      </footer>
    </>
  );
}
