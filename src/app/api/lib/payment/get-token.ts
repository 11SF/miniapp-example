import { LibError } from "../error/lib-error";
import { getTokenConfigSchema, GetTokenResponse } from "../type/get-token.type";

export const getToken = async (): Promise<GetTokenResponse> => {
  const config = getTokenConfigSchema.safeParse({
    getTokenUrl: process.env.URL_PAYMENT_GET_TOKEN,
    clientId: process.env.TWO_LEGGED_CLIENT_ID,
    clientSecret: process.env.TWO_LEGGED_SECRET_KEY,
  });

  if (!config.success) {
    throw new LibError(config.error.message, "LB400", config.error);
  }

  const form = new URLSearchParams();
  form.append("client_id", config.data.clientId);
  form.append("client_secret", config.data.clientSecret);

  try {
    const rawResponse = await fetch(config.data.getTokenUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    if (rawResponse.status !== 200) {
      try {
        const res = await rawResponse.json();

        throw new LibError(
          res.message ||
            `fail to get token: ${rawResponse.status} ${JSON.stringify(res)}`,
          res.code ?? "LB9999"
        );
      } catch (err) {
        throw new LibError(
          `fail to get token: ${rawResponse.status} ${err}`,
          "LB9999",
          err
        );
      }
    }

    const getTokenResponse = (await rawResponse.json()) as GetTokenResponse;
    return getTokenResponse;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`get token error: ${error}`, "LB9999", error);
  }
};
