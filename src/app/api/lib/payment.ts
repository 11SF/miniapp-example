import { LibError } from "./error/lib-error";
import {
  generateDeeplinkConfigSchema,
  GenerateDeeplinkRequest,
  GenerateDeeplinkResponse,
} from "./type/generate-deeplink.type";
import { paymentTransactionSchema } from "./type/payment.type";

import {
  inquiryTransactionConfigSchema,
  inquiryTransactionRequestSchema,
  InquiryTransactionResponse,
} from "./type/inquiry-transaction.type";

import { getTokenConfigSchema, GetTokenResponse } from "./type/get-token.type";

export const generateDeeplink = async (
  req: GenerateDeeplinkRequest
): Promise<GenerateDeeplinkResponse> => {
  try {
    const token = await getToken();

    const config = generateDeeplinkConfigSchema.safeParse({
      generateDeeplinkUrl: process.env.URL_PAYMENT_DEEPLINK,
      accessToken: token.data?.access_token,
      miniappUUID: process.env.MINIAPP_UUID,
      deeplinkUrl: process.env.PAYMENT_TXN_CONFIG_DEEPLINK_URL,
      compCode: process.env.PAYMENT_TXN_CONFIG_COMP_CODE,
    });
    if (!config.success) {
      throw new LibError(config.error.message, "LB400", config.error);
    }

    const txn = paymentTransactionSchema.safeParse({
      partnerTxnCreatedDt: req.partnerTxnCreatedDt ?? new Date().toISOString(),
      txnSessionValidUntil: req.txnSessionValidUntil,
      paymentInfo: {
        billerId: req.paymentInfo?.billerId,
        compCode: req.paymentInfo?.compCode ?? config.data.compCode,
        paymentMethod: req.paymentInfo?.paymentMethod,
        partnerTxnRef: req.paymentInfo?.partnerTxnRef,
        amount: req.paymentInfo?.amount,
        ref1value: req.paymentInfo?.ref1value,
        ref2value: req.paymentInfo?.ref2value,
        ref3value: req.paymentInfo?.ref3value,
        ref4value: req.paymentInfo?.ref4value,
      },
      additionalInfo: {
        additionalInfo1: req.additionalInfo?.additionalInfo1,
        additionalInfo2: req.additionalInfo?.additionalInfo2,
        additionalInfo3: req.additionalInfo?.additionalInfo3,
        additionalInfo4: req.additionalInfo?.additionalInfo4,
        additionalInfo5: req.additionalInfo?.additionalInfo5,
        additionalInfo6: req.additionalInfo?.additionalInfo6,
        additionalInfo7: req.additionalInfo?.additionalInfo7,
        additionalInfo8: req.additionalInfo?.additionalInfo8,
        subMerchantName: req.additionalInfo?.subMerchantName,
      },
      partnerInfo: {
        deeplink:
          req.partnerInfo?.deeplink ??
          `${config.data.deeplinkUrl}?partnerTxnRef=${req.paymentInfo?.partnerTxnRef}&miniappUUID=${config.data.miniappUUID}&destination=miniapp`,
      },
    });
    if (!txn.success) {
      throw new LibError(txn.error.message, "LB400", txn.error);
    }

    console.log("generate deeplink request", txn.data);

    const rawResponse = await fetch(config.data.generateDeeplinkUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "oapi-client-id": process.env.TWO_LEGGED_CLIENT_ID ?? "", //mock
        "oapi-partner-id": "f6cac73f-3d82-4f3a-a74f-ebf5804c0683", //mock
        Authorization: config.data.accessToken,
      },
      body: JSON.stringify(txn.data),
    });

    if (rawResponse.status !== 200) {
      try {
        const res = (await rawResponse.json()) as GenerateDeeplinkResponse;

        throw new LibError(
          res.status?.description ??
            res.message ??
            `fail to generate deeplink: ${rawResponse.status} ${JSON.stringify(
              res
            )}`,
          res.status?.code ?? res.code ?? "LB9999"
        );
      } catch (err) {
        throw new LibError(
          `fail to generate deeplink: ${rawResponse.status} ${err}`,
          "LB9999",
          err
        );
      }
    }

    const generateDeeplinkResponse =
      (await rawResponse.json()) as GenerateDeeplinkResponse;

    return generateDeeplinkResponse;
  } catch (error) {
    if (error instanceof LibError) {
      throw error;
    }
    throw new LibError(`generate deeplink error: ${error}`, "LB9999", error);
  }
};

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

const getToken = async (): Promise<GetTokenResponse> => {
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
