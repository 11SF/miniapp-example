import { z } from "zod";

export const ExternalExchangeTokenRequest = z.object({
  code: z.string({ message: "code is required" }),
  authenticationRedirectUrl: z
    .string({
      message:
        "AUTHENTICATION_REDIRECT_URL is not defined in environment variable",
    })
    .url({ message: "AUTHENTICATION_REDIRECT_URL is not a valid URL" }),
  authenticationScope: z.string({
    message: "AUTHENTICATION_SCOPE is not defined in environment variable",
  }),
  threeLeggedClientId: z.string({
    message: "THREE_LEGGED_CLIENT_ID is not defined in environment variable",
  }),
  threeLeggedSecret: z.string({
    message: "THREE_LEGGED_SECRET_KEY is not defined in environment variable",
  }),
  exchangeTokenUrl: z
    .string({
      message: "EXCHANGE_TOKEN_URL is not defined in environment variable",
    })
    .url({ message: "EXCHANGE_TOKEN_URL is not a valid URL" }),
});

export interface ExternalExchangeTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
