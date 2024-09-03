export interface ExternalGetCustomerProfileRequest {}

export interface ExternalGetCustomerProfileResponse {
  code: string;
  message: string;
  data?: {
    cid?: string;
    fullNameEn?: {
      engFirstName?: string;
      engLastName?: string;
      engMiddleName?: string;
    };
    fullNameTh?: {
      thaiFirstName?: string;
      thaiLastName?: string;
      thaiMiddleName?: string;
    };
    title?: string;
  };
}

export interface WorkProfile {
  occupationCode: string;
  occupationValue: string;
  occupationGroup: string;
  occupationGroupValue: string;
  subOccupationGroup: string;
  subOccupationGroupValue: string;
  salary: string;
  salaryValue: string;
}

export interface CitizenCardInfo {
  cid: string;
  thaiTitle: string;
  thaiFirstName: string;
  thaiMiddleName: string;
  thaiLastName: string;
  engFirstName: string;
  engMiddleName: string;
  engLastName: string;
  gender: string;
  birthDate: string;
}

export interface LegalAddress {
  address: string;
  subDistrict: string;
  subDistrictCode: string;
  district: string;
  districtCode: string;
  stateProv: string;
  stateProvCode: string;
  postalCode: string;
  country: string;
  phoneNo: string;
}

export interface MailingAddress {
  address: string;
  subDistrict: string;
  subDistrictCode: string;
  district: string;
  districtCode: string;
  stateProv: string;
  stateProvCode: string;
  postalCode: string;
  country: string;
  phoneNo: string;
}

export interface OfficeAddress {
  officeName: string;
  address: string;
  subDistrict: string;
  subDistrictCode: string;
  district: string;
  districtCode: string;
  stateProv: string;
  stateProvCode: string;
  postalCode: string;
  country: string;
  phoneNo: string;
  phoneExt: string;
}
