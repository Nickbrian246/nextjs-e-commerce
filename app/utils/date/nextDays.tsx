export function nextDays(howManyDays: number): number {
  const currentDate = new Date();
  const dayInNumber = currentDate.getDay();
  let daysAdded = dayInNumber;
  for (let i = 1; i <= howManyDays; i++) {
    if (daysAdded === 6) {
      daysAdded = 0;
    } else {
      daysAdded += 1;
    }
  }
  return daysAdded;
}

export function getNextDateBaseOnNextDays(howManyDays: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + howManyDays);
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return ` ${year}/${month}/${day}`;
}
type NameOfDayOfWeek =
  | "Domingo"
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado"
  | "Rango de numero de fecha incorrecto";
export function getDayOfWeekBaseOnNumber(day: number): NameOfDayOfWeek {
  if (day > 6 || day < 0) return "Rango de numero de fecha incorrecto";

  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miércoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sábado";
    default:
      return "Rango de numero de fecha incorrecto";
  }
}
