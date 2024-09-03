import { LibError } from "../error/lib-error";
import {
  inquiryTransactionConfigSchema,
  inquiryTransactionRequestSchema,
  InquiryTransactionResponse,
} from "../type/inquiry-transaction.type";
import { getToken } from "./get-token";

export const inquiryTransaction = async (txnRefId: string) => {
  try {
    const token = await getToken();

    const config = inquiryTransactionConfigSchema.safeParse({
      inquiryTransactionUrl: process.env.URL_PAYMENT_INQUIRY_TRANSACTION_URL,
      accessToken: token.data?.access_token,
    });

    if (!config.success) {
      throw new LibError(config.error.message, "LB400", config.error);
    }

    const requestData = inquiryTransactionRequestSchema.safeParse({
      txnRefId,
    });
    if (!requestData.success) {
      throw new LibError(requestData.error.message, "LB400", requestData.error);
    }

    const rawResponse = await fetch(
      `${config.data.inquiryTransactionUrl}/${requestData.data?.txnRefId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: config.data.accessToken,
        },
      }
    );

    if (rawResponse.status !== 200) {
      try {
        const res = (await rawResponse.json()) as InquiryTransactionResponse;

        throw new LibError(
          res.status?.description ??
            res.message ??
            `fail to inquiry transaction: ${
              rawResponse.status
            } ${JSON.stringify(res)}`,
          res.status?.code ?? res.code ?? "LB9999"
        );
      } catch (err) {
        throw new LibError(
          `fail to inquiry transaction: ${rawResponse.status} ${err}`,
          "LB9999",
          err
        );
      }
    }

    const inquiryTransactionResponse =
      (await rawResponse.json()) as InquiryTransactionResponse;

    return inquiryTransactionResponse;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`inquiry transaction error: ${error}`, "LB9999", error);
  }
};
