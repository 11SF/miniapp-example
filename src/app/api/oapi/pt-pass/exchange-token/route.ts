import { LibError } from "@/app/api/lib/error/lib-error";
import { exchangeToken } from "@/app/api/lib/pt-pass";
import { responseError, responseSuccess } from "@/app/api/lib/response";
import { ExchangeTokenRequest, ExchangeTokenResponse } from "./type";

export async function POST(request: Request) {
  try {
    const reqBody = (await request.json()) as ExchangeTokenRequest;

    const exchangeTokenResponse = await exchangeToken({
      code: reqBody.code,
    });

    const response: ExchangeTokenResponse = {
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
