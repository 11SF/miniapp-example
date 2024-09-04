import axios from "axios";
import { LibError } from "../../error/lib-error";
import {
  ExchangeTokenResponse,
  ExchangeTokenResponseData,
  GetCustomerProfileResponse,
  GetCustomerProfileResponseData,
} from "./type/pt-pass.type";

import {
  GenerateDeeplinkRequest,
  GenerateDeeplinkResponse,
  GenerateDeeplinkResponseData,
} from "./type/payment.type";

export const httpExchangeToken = async (
  authorizationCode: string
): Promise<ExchangeTokenResponseData> => {
  try {
    const result = await axios.post<ExchangeTokenResponse>(
      "/api/pt-pass/exchange-token",
      {
        code: authorizationCode,
      }
    );

    if (result.data.code !== "0000" || !result.data.data) {
      throw new LibError(result.data.message, result.data.code);
    }

    return result.data.data;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`exchange token error: ${error}`, "CL9999", error);
  }
};

export const httpGetCustomerProfile = async (
  accessToken: string
): Promise<GetCustomerProfileResponseData> => {
  try {
    const result = await axios.post<GetCustomerProfileResponse>(
      "/api/pt-pass/get-customer-profile",
      {},
      {
        headers: {
          Authorization: `Bearer a${accessToken}`,
        },
      }
    );

    if (result.data.code !== "0000" || !result.data.data) {
      throw new LibError(result.data.message, result.data.code);
    }

    return result.data.data;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`get customer profile error: ${error}`, "CL9999", error);
  }
};

export const httpGenerateDeeplink = async (
  req: GenerateDeeplinkRequest
): Promise<GenerateDeeplinkResponseData> => {
  try {
    const result = await axios.post<GenerateDeeplinkResponse>(
      "/api/payment/generate-deeplink",
      req
    );

    if (result.data.code !== "0000" || !result.data.data) {
      throw new LibError(result.data.message, result.data.code);
    }

    return result.data.data;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`generate deeplink error: ${error}`, "LB9999", error);
  }
};
