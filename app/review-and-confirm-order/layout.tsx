import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ReviewAndConfirmOrderLayout({
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
      items-center
      
      flex
      flex-col
      w-full
      m-auto
      p-1
      min-h-screen
      justify-start
      
      "
      >
        <h2 className="text-3xl font-semibold mb-5 mt-5 ">Resumen de compra</h2>
        {children}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
