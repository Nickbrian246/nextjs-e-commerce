import { AddressDb, GroupOfDeliveryAddresses } from "@/services/address";
import { User } from "./user";
import { AssociatedUser } from ".";
export type SessionMethod = "own" | "google" | "facebook";
export interface UserInfo {
  user: User;
  addresses: AddressDb[];
  sessionMethod: SessionMethod;
}
