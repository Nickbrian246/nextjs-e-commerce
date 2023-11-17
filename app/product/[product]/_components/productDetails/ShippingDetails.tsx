import {
  getDayOfWeekBaseOnNumber,
  getNextDateBaseOnNextDays,
} from "@/app/utils/date";
export default function ShippingDetails() {
  const dayInNumber = getNextDateBaseOnNextDays(4).split("/")[2];
  const NameOfCurrentMonth = new Date().toLocaleString("es-ES", {
    month: "long",
  });
  const day = getDayOfWeekBaseOnNumber(4);
  return (
    <div className="w-full  flex">
      <p className="text-productTextColor p-1">
        Recibalo antes del:
        <span>{` ${day} ${dayInNumber} de ${NameOfCurrentMonth}.`}</span>
      </p>
    </div>
  );
}
