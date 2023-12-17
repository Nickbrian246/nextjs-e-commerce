import visa from "@/assets/Visa.png";
import mastercard from "@/assets/Mastercard.png";
import americanExpress from "@/assets/American-express.png";
export function checkBankCardSystem(cardDigits: string) {
  if (/^4/.test(cardDigits)) {
    return visa;
  } else if (/^5[1-5]/.test(cardDigits)) {
    return mastercard;
  } else if (/^3[47]/.test(cardDigits)) {
    return americanExpress;
  } else {
    return "Tipo de tarjeta no identificado";
  }
}
