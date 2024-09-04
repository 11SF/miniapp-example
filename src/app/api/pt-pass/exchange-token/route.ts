import { exchangeToken } from "@/lib/backend";
import { responseError, responseSuccess } from "@/app/api/response";
import { LibError } from "@/lib/error/lib-error";
import {
  ExchangeTokenRequest,
  ExchangeTokenResponseData,
} from "@/types/pt-pass";

export async function POST(request: Request) {
  try {
    const reqBody = (await request.json()) as ExchangeTokenRequest;

    //Example of how to use the functions from the lib/backend/index.ts
    const exchangeTokenResponse = await exchangeToken({
      code: reqBody.code,
    });

    const response: ExchangeTokenResponseData = {
      accessToken: exchangeTokenResponse.access_token,
      refreshToken: exchangeTokenResponse.refresh_token,
    };
    return responseSuccess(response);
  } catch (error) {
    if (error instanceof LibError) {
      return responseError(error.code, error.message);
    }

    return responseError("CL9999", `exchange token error ${error}`);
  }
}
