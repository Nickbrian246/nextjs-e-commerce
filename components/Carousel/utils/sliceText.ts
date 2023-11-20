export function sliceText(
  text: string,
  from: number,
  to: number,
  addEllipsis?: boolean
) {
  if (addEllipsis) {
    return text.substring(from, to).concat("...");
  }
  return text.substring(from, to).concat("...");
}
