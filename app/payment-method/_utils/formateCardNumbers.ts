export function formateCardNumbers(numbers: string): string {
  if (numbers.length <= 4) {
    return numbers;
  }
  if (numbers.length <= 8) {
    return `${numbers.slice(0, 4)}  ${numbers.slice(4, 8)}`;
  }
  if (numbers.length <= 12) {
    return `${numbers.slice(0, 4)}  ${numbers.slice(4, 8)}  ${numbers.slice(
      8,
      12
    )}`;
  }
  if (numbers.length <= 12) {
    return `${numbers.slice(0, 4)}  ${numbers.slice(4, 8)}  ${numbers.slice(
      8,
      12
    )}`;
  }
  return `${numbers.slice(0, 4)}  ${numbers.slice(4, 8)}  ${numbers.slice(
    8,
    12
  )}   ${numbers.slice(12, 16)}`;
}
