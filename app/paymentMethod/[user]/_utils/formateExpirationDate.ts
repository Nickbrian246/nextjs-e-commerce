export function formateExpirationDate(date: string): string {
  if (date.length <= 2) {
    return date;
  }

  if (date.length <= 4) {
    return `${date.slice(0, 2)} / ${date.slice(2, 4)}`;
  }

  return `${date.slice(0, 2)} / ${date.slice(2, 4)}`;
}
