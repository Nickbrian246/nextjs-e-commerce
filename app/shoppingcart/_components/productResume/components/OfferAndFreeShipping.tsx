import { BiSolidOffer } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";

interface OfferAndFreeShippingProps {
  hasFreeShipping: boolean;
  totalPrice: string;
  discount: string;
}
export default function OfferAndFreeShipping(props: OfferAndFreeShippingProps) {
  const { hasFreeShipping, discount, totalPrice } = props;
  return (
    <>
      <div className=" flex gap-1">
        {hasFreeShipping && (
          <>
            <span className=" text-2xl text-science-blue-400   flex items-center sm:gap-2 gap-1">
              <FaShippingFast />
              <span className="text-xs">Envío gratis</span>
            </span>
          </>
        )}
        <span className=" text-2xl  text-red-600  ">
          <BiSolidOffer />
        </span>
      </div>
      <div className="flex gap-1">
        <span className="text-red-600 ">{discount}</span>
        <span className="line-through text-science-blue-300">{totalPrice}</span>
      </div>
    </>
  );
}
