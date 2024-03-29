import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Generated by create next app",
};

export default function ProdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <section
        className="
      justify-center
      mt-11
      flex
      md:flex-row
      flex-wrap
      flex-col
      w-full
      m-auto
      gap-5
      p-1
      min-h-screen
      "
      >
        {children}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
