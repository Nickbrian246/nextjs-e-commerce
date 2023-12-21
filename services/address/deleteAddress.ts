import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;

export async function deleteUserAddress(addressId: string, token: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const address = await axios.delete(
      `${BASE_URL}/delivery-addresses/delete-delivery-address?addressId=${addressId}`,
      config
    );
    return address.status;
  } catch (error) {
    throw error;
  }
}
