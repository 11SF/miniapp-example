import { z } from "zod";

export const ExternalGetCustomerProfileRequest = z.object({
  accessToken: z.string({ message: "missing access token" }),
  getCustomerProfileUrl: z
    .string({
      message:
        "GET_CUSTOMER_PROFILE_URL is not defined in environment variable",
    })
    .url({ message: "GET_CUSTOMER_PROFILE_URL is not a valid URL" }),
});

export interface ExternalGetCustomerProfileResponse {
  code: string;
  message: string;
  data?: ExternalGetCustomerProfileResponseData;
}

export interface ExternalGetCustomerProfileResponseData {
  birthDate?: string;
  cid?: string;
  email?: string;
  fullNameEn?: FullNameEn;
  fullNameTh?: FullNameTh;
  gender?: string;
  legalAddress?: LegalAddress;
  mailingAddress?: MailingAddress;
  mobileNo?: string;
  officeAddress?: OfficeAddress;
  title?: string;
  workProfile?: WorkProfile;
}

export interface FullNameEn {
  engFirstName: string;
  engLastName: string;
  engMiddleName: string;
}

export interface FullNameTh {
  thaiFirstName: string;
  thaiLastName: string;
  thaiMiddleName: string;
}

export interface LegalAddress {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
}

export interface MailingAddress {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
}

export interface OfficeAddress {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  officeName: string;
  phoneExt: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
}

export interface WorkProfile {
  occupationCode: string;
  occupationGroup: string;
  occupationGroupValue: string;
  occupationValue: string;
  salary: string;
  salaryValue: string;
  subOccupationGroup: string;
  subOccupationGroupValue: string;
}
