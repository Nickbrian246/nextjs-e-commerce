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
      items-start
      
      mt-11
      flex
      flex-col
      max-w-7xl
      m-auto
      gap-5
      p-2
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
