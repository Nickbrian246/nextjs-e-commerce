import Header from "@/components/Header/Header";

export default function ProdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <section className="p-1">{children}</section>
    </>
  );
}
