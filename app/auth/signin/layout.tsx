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
        style={{ minHeight: "93vh" }}
        className="p-1 flex flex-col w-full items-center justify-center max-w-6xl m-auto overflow-hidden"
      >
        {children}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
