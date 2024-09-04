import {
  httpExchangeToken,
  httpGenerateDeeplink,
  httpGetCustomerProfile,
} from "./core/http";
import { initAuth, openPwP } from "./core/js-bridge";
import { ExchangeTokenResponseData } from "./core/type/pt-pass.type";

export const initAuthAndExchangeToken = async (
  callback?: (result: ExchangeTokenResponseData) => void,
  callbackError?: (errorCode: string, errorDescription: string) => void
) => {
  initAuth(
    process.env.NEXT_PUBLIC_THREE_LEGGED_CLIENT_ID ?? "",
    process.env.NEXT_PUBLIC_AUTHENTICATION_SCOPE ?? "",
    async (authorizationCode) => {
      try {
        const result = await httpExchangeToken(authorizationCode);
        if (callback) {
          callback(result);
        }
      } catch (error) {
        console.error(error);
      }
    },
    (errorCode, errorDescription) => {
      if (callbackError) {
        callbackError(errorCode, errorDescription);
      }
    }
  );
};

export const getCustomerProfileWithAccessToken = async (accessToken: string) => {
  try {

    const result = await httpGetCustomerProfile(accessToken);
    return result
  } catch (error) {
    console.error(error);
  }
};

export const generateDeeplinkAndOpenPwP = async (
  callbackError: (errorCode: string, errorDescription: string) => void
) => {
  try {
    const result = await httpGenerateDeeplink({
      amount: 1.5,
    });

    openPwP(result.txnRefId, callbackError);
  } catch (error) {
    console.error(error);
  }
};
