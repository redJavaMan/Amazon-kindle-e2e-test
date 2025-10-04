import { ENV } from "./env";

export interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  card: {
    number: string;
    expiry: string;
  };
}

export class UserGenerator {
  public static generateUser(): UserData {
    const timestamp = new Date().getTime();
    const countryCode = ENV.LOCAL.toLowerCase();
    return {
      name:   "Mohammed Lukmanudhin",
      email: `xyzabbc+${countryCode.toLowerCase()}${timestamp}@gmail.com`,
      password: "abc123",
      phone: "9876543210",
      card: {
        number: "1234 5678 9012 3456",
        expiry: "01/2029",
      }
    };
  }
}
