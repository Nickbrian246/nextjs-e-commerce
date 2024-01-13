import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getProductById } from "@/services/getProductById";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: {
  params: { product: string };
}): Promise<Metadata> {
  const product = await getProductById(Number(params.product));

  return {
    title: product.title,
  };
}

export default async function ProdLayout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: { product: string };
}) {
  await generateMetadata({ params });

  return (
    <>
      <header>
        <Header />
      </header>
      <section className="p-1 flex flex-col w-full items-center max-w-6xl m-auto overflow-hidden">
        {children}
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
