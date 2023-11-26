import React from "react";

export default function SaleResume() {
  return (
    <div className="p-1 shadow-md">
      <div className="p-2 mb-5 ">Resumen de compra </div>
      <div>
        <div>
          <p>Producto</p>
          <p>Envío</p>
        </div>
        <div>
          <span>$234</span>
          <span>Gratis</span>
        </div>
      </div>
      <div>
        <span>Total</span>
        <span>$134</span>
      </div>
    </div>
  );
}
