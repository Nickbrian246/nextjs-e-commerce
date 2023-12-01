// export function addHyphensToPhoneNumber(phoneNumber: string) {
//   let phoneNumberWithHyphens = "(";
//   for (let i = 0; i < phoneNumber.length; i++) {
//     if (i === 3) phoneNumberWithHyphens += ") ";
//     i === 5 || i === 8
//       ? (phoneNumberWithHyphens += phoneNumber[i] + "-")
//       : (phoneNumberWithHyphens += phoneNumber[i]);
//   }
//   return phoneNumberWithHyphens;
// }
export function addHyphensToPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )} - ${phoneNumber.slice(6, 18)}`;
}
