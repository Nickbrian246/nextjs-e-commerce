import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Modal from "@/modals/modal/Modal";

export default function ShippingInformationLayout({
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
      mt-11
      flex
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
