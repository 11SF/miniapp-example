import { commonAPIResponse } from "./common";

export interface ExchangeTokenRequest {
  code: string;
}

export interface ExchangeTokenResponse extends commonAPIResponse {
  data?: {
    access_token: string;
  };
}
