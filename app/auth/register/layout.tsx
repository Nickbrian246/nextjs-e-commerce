import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RegisterLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <section
        style={{ minHeight: "92vh" }}
        className="p-1 flex justify-center w-full items-center max-w-6xl m-auto overflow-hidden "
      >
        {children}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
