import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
      flex-col
      w-full
      m-auto
      gap-5
      p-4
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
