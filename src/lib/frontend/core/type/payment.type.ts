import { commonAPIResponse } from "./common";

export interface GenerateDeeplinkRequest {
  amount: number;
}

export interface GenerateDeeplinkResponse extends commonAPIResponse {
  data?: GenerateDeeplinkResponseData;
}

export interface GenerateDeeplinkResponseData {
  txnRefId: string;
}
