import { Order } from "@/services/myOrders/interfaces";

export function sortOrdersByAscendingDate(groupOfOrders: Order[]): Order[] {
  const sortByDay = sortOrderForAscendingDay(groupOfOrders);
  const sortByMonth = sortOrdersForAscendingMonth(sortByDay);
  const sortByYear = sortOrdersForAscendingYear(sortByMonth);
  return sortByYear;
}

export function sortOrderForAscendingDay(groupOfOrders: Order[]): Order[] {
  const sortByAscendingDay = groupOfOrders.sort((a, b) => {
    const firstDay = a.date.split("/")[1];
    const secondDay = b.date.split("/")[1];
    if (firstDay < secondDay) return 1;
    else return -1;
  });
  return sortByAscendingDay;
}

export function sortOrdersForAscendingMonth(groupOfOrders: Order[]): Order[] {
  const sortByAscendingMonth = groupOfOrders.sort((a, b) => {
    const firstMonth = a.date.split("/")[0];
    const secondMonth = b.date.split("/")[0];
    if (firstMonth < secondMonth) return 1;
    else return -1;
  });
  return sortByAscendingMonth;
}

export function sortOrdersForAscendingYear(groupOfOrders: Order[]): Order[] {
  const sortByAscendingMonth = groupOfOrders.sort((a, b) => {
    const firstYear = a.date.split("/")[2];
    const secondYear = b.date.split("/")[2];
    if (firstYear < secondYear) return 1;
    else return -1;
  });
  return sortByAscendingMonth;
}
