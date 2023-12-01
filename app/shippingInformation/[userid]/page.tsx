import React from "react";
import ShippingForm from "@/components/ShippingFrom/ShippingForm";
export default function ShippingInformationPage({
  params,
}: {
  params: { product: string };
}) {
  console.log(params);

  return (
    <>
      <section className="p-2 lg:p-5 shadow-xl h-fit lg:w-[900px]">
        <h2 className="text-4xl font-medium text-center mb-7">
          Formulario de envío
        </h2>
        <p className=" text-center mb-7 font-normal text-xl">
          Por favor, llene los campos para continuar con su pedido.
        </p>
        <ShippingForm />
      </section>
      <aside className=" flex flex-col gap-2 "></aside>
    </>
  );
}
