import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function getUserAddress(token: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const address = await axios.get(
      `${BASE_URL}/delivery-addresses/get-all-delivery-addresses`,
      config
    );
    return address.data;
  } catch (error) {
    throw error;
  }
}
