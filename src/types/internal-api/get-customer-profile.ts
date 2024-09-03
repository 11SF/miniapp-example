import { commonAPIResponse } from "./common";

export interface GetCustomerProfileRequest {
  access_token: string;
}

export interface GetCustomerProfileResponse extends commonAPIResponse {
  data?: {
    cid: string;
    fullNameEn: {
      engFirstName: string;
      engLastName: string;
      engMiddleName: string;
    };
    fullNameTh: {
      thaiFirstName: string;
      thaiLastName: string;
      thaiMiddleName: string;
    };
    title: string;
  };
}
