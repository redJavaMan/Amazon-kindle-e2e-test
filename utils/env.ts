import dotenv from "dotenv";
dotenv.config({
  path: `./.env.${process.env.NODE_ENV?.toLowerCase() || "us"}`,
  debug: true,
  override: true,
});
export class ENV {
  public static BASE_URL = process.env.BASE_URL;
  public static CITY= process.env.CITY;
  public static STATE = process.env.STATE;
  public static COUNTRY = process.env.COUNTRY;
  public static POSTAL_CODE = process.env.POSTAL_CODE;
  public static LOCAL = process.env.ENV?.toLowerCase() || "us";
}
