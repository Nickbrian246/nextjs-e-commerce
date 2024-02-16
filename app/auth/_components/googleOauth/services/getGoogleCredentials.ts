import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NESTAPI_BASE_URL;
export async function getGoogleCredentials() {
  try {
    const req = await axios.get(`${BASE_URL}/auth/google/login`);
    return req.data;
  } catch (error) {
    console.log(error);
  }
}
