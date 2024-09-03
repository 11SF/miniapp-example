import { responseError, responseSuccess } from "@/app/api/lib/response";
import { randomUUID } from "crypto";
import {
  ExternalExchangeTokenRequest,
  ExternalExchangeTokenResponse,
} from "./type.external";
import { ExchangeTokenRequest, ExchangeTokenResponse } from "./type";

export async function POST(request: Request) {
  console.info("starting to exchange token");
  try {
    const reqBody = (await request.json()) as ExchangeTokenRequest;

    const exchangeTokenRequest = ExternalExchangeTokenRequest.safeParse({
      ...reqBody,
      authenticationRedirectUrl: process.env.AUTHENTICATION_REDIRECT_URL,
      authenticationScope: process.env.AUTHENTICATION_SCOPE,
      threeLeggedClientId: process.env.THREE_LEGGED_CLIENT_ID,
      threeLeggedSecret: process.env.THREE_LEGGED_SECRET_KEY,
      exchangeTokenUrl: process.env.EXCHANGE_TOKEN_URL,
    });

    if (!exchangeTokenRequest.success) {
      return responseError("CL401", exchangeTokenRequest.error);
    }

    const exchangeTokenRequestForm = new URLSearchParams();

    exchangeTokenRequestForm.append("code", exchangeTokenRequest.data.code);
    exchangeTokenRequestForm.append("grant_type", "authorization_code");
    exchangeTokenRequestForm.append(
      "redirect_uri",
      exchangeTokenRequest.data.authenticationRedirectUrl
    );
    exchangeTokenRequestForm.append(
      "client_id",
      exchangeTokenRequest.data.threeLeggedClientId
    );
    exchangeTokenRequestForm.append(
      "client_secret",
      exchangeTokenRequest.data.threeLeggedSecret
    );
    exchangeTokenRequestForm.append("state", randomUUID().toString());
    exchangeTokenRequestForm.append(
      "scope",
      exchangeTokenRequest.data.authenticationScope
    );

    const rawResponse = await fetch(`${process.env.EXCHANGE_TOKEN_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: exchangeTokenRequestForm,
    });

    console.info(
      "call api exchange token done with response status " + rawResponse.status
    );

    if (rawResponse.status !== 200) {
      const res = await rawResponse.json();

      return responseError(
        res.error,
        res.error_description ||
          `fail to exchange token: ${rawResponse.status} ${JSON.stringify(res)}`
      );
    }

    const exchangeTokenResponse =
      (await rawResponse.json()) as ExternalExchangeTokenResponse;

    const response: ExchangeTokenResponse = {
      accessToken: exchangeTokenResponse.access_token,
      refreshToken: exchangeTokenResponse.refresh_token,
    };

    console.info("exchange token success");
    return responseSuccess(response);
  } catch (error) {
    return responseError("CL9999", `exchange token error ${error}`);
  }
}
