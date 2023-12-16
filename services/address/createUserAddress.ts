import axios from "axios";
import { GroupOfDeliveryAddresses } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function createUserAddress(
  userAddress: GroupOfDeliveryAddresses,
  token: string
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const createUserAddress = await axios.post(
      `${BASE_URL}/delivery-addresses/create-delivery-address`,
      userAddress,
      config
    );

    return createUserAddress.data;
  } catch (error) {
    throw error;
  }
}
