interface Props {
  totalPrice: string;
  totalProducts: number;
  shippingCost: string;
}
export default function TotalCostResume(props: Props) {
  const { totalPrice, totalProducts, shippingCost } = props;

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
          <span>{totalPrice}</span>
          <span>{shippingCost ? shippingCost : "Gratis"}</span>
        </div>
      </div>
      <div className=" flex justify-between p-1">
        <span title="total">Total:</span>
        <span className="font-semibold" title={totalPrice}>
          {totalPrice}
        </span>
      </div>
    </div>
  );
}
