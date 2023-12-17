import axios from "axios";
import { AddressDb } from ".";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getOneUserAddress(
  userAddressId: string,
  token: string
): Promise<AddressDb> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const getOneUserAddress = await axios.get(
      `${BASE_URL}/delivery-addresses/get-one-delivery-address?addressId=${userAddressId}`,
      config
    );

    return getOneUserAddress.data;
  } catch (error) {
    throw error;
  }
}
