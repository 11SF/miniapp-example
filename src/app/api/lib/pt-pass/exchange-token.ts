import { randomUUID } from "crypto";
import { LibError } from "../error/lib-error";
import {
  exchangeTokenConfigSchema,
  ExchangeTokenRequest,
  exchangeTokenRequestSchema,
  ExchangeTokenResponse,
} from "../type/exchange-token.type";

export const exchangeToken = async (
  req: ExchangeTokenRequest
): Promise<ExchangeTokenResponse> => {
  const config = exchangeTokenConfigSchema.safeParse({
    authenticationRedirectUrl: process.env.AUTHENTICATION_REDIRECT_URL,
    authenticationScope: process.env.AUTHENTICATION_SCOPE,
    threeLeggedClientId: process.env.THREE_LEGGED_CLIENT_ID,
    threeLeggedSecret: process.env.THREE_LEGGED_SECRET_KEY,
    exchangeTokenServiceUrl: process.env.URL_EXCHANGE_TOKEN,
  });
  if (!config.success) {
    throw new LibError(config.error.message, "LB400", config.error);
  }

  const requestData = exchangeTokenRequestSchema.safeParse(req);
  if (!requestData.success) {
    throw new LibError(requestData.error.message, "LB400", requestData.error);
  }

  const form = new URLSearchParams();
  form.append("code", requestData.data.code);
  form.append("grant_type", "authorization_code");
  form.append("redirect_uri", config.data.authenticationRedirectUrl);
  form.append("client_id", config.data.threeLeggedClientId);
  form.append("client_secret", config.data.threeLeggedSecret);
  form.append("state", randomUUID().toString());
  form.append("scope", config.data.authenticationScope);

  try {
    const rawResponse = await fetch(`${process.env.URL_EXCHANGE_TOKEN}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    if (rawResponse.status !== 200) {
      const res = await rawResponse.json();

      throw new LibError(
        res.error_description ||
          `fail to exchange token: ${rawResponse.status} ${JSON.stringify(
            res
          )}`,
        res.error
      );
    }

    const exchangeTokenResponse =
      (await rawResponse.json()) as ExchangeTokenResponse;

    return exchangeTokenResponse;
  } catch (error) {
    throw new LibError(`exchange token error: ${error}`, "LB9999", error);
  }
};
