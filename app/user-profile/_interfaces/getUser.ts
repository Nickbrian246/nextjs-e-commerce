import { AddressDb, GroupOfDeliveryAddresses } from "@/services/address";
import { User } from "./user";
export interface UserInfo {
  user: User;
  addresses: AddressDb[];
}
