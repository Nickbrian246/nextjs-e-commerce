import {
  getDayOfWeekBaseOnNumber,
  getNextDateBaseOnNextDays,
} from "@/utils/date";
import { TbTruckDelivery } from "react-icons/tb";
export default function ShippingDetails() {
  const dayInNumber = getNextDateBaseOnNextDays(4).split("/")[2];
  const NameOfCurrentMonth = new Date().toLocaleString("es-ES", {
    month: "long",
  });
  const day = getDayOfWeekBaseOnNumber(4);
  return (
    <div className="w-full  flex items-center gap-2">
      <span className="text-2xl text-science-blue-500">
        <TbTruckDelivery />
      </span>
      <p className="text-productTextColor p-1">
        Recibelo antes del:
        <span>{` ${day} ${dayInNumber} de ${NameOfCurrentMonth}.`}</span>
      </p>
    </div>
  );
}
