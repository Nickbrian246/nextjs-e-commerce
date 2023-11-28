import React from "react";
interface Props {
  totalPrice: number;
  totalProducts: number;
  shippingCost: number;
}
export default function SaleResume(props: Props) {
  const { totalPrice, totalProducts, shippingCost } = props;
  const price = totalPrice.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  const shipping = shippingCost.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  const priceWithShipping = (totalPrice + shippingCost).toLocaleString(
    "es-MX",
    { style: "currency", currency: "MXN" }
  );

  return (
    <div className="p-1 shadow-md rounded-xl  sm:min-w-[300px]">
      <div className="p-5 border-b-2 border-b-textGray flex justify-center">
        <p className="text-base font-medium">Resumen de compra</p>
      </div>
      <div className="flex justify-between p-1">
        <div className="flex- flex-col">
          <p>{`${
            totalProducts > 1 ? `Productos (${totalProducts}) ` : "Producto"
          }`}</p>
          <p>Envío{shippingCost ? "(25 x u)" : null}</p>
        </div>
        <div className="flex flex-col">
          <span>{price}</span>
          <span>{shipping ? shipping : "Gratis"}</span>
        </div>
      </div>
      <div className=" flex justify-between p-1">
        <span title="total">Total:</span>
        <span
          className="font-semibold"
          title={`${shipping ? priceWithShipping : price}`}
        >
          {shipping ? priceWithShipping : price}
        </span>
      </div>
    </div>
  );
}
