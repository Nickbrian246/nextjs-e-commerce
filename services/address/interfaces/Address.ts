export interface AddressDb {
  deliveryAddressId: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  colony: string;
  email: string;
  zipCode: string;
  state: string;
  neighborReference: string;
}

export interface GroupOfDeliveryAddresses {
  deliveryAddresses: AddressDb[];
}
