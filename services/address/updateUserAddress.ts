import axios from "axios";
import { GroupOfDeliveryAddresses } from "./interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function updateUserAddress(
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

    const createUserAddress = await axios.put(
      `${BASE_URL}/delivery-addresses/update-delivery-addresses`,
      userAddress,
      config
    );
    return createUserAddress.data;
  } catch (error) {
    throw error;
  }
}
