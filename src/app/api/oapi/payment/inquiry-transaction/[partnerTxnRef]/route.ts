import { transactionStorage } from "@/app/api/lib/mock-storage";
import { responseError, responseSuccess } from "@/app/api/lib/response";
import {
  ExternalInquiryTransactionConfig,
  ExternalInquiryTransactionResponse,
} from "./type.external";

export async function POST(
  request: Request,
  { params }: { params: { partnerTxnRef: string } }
) {
  console.log("starting to inquiry transaction");

  const partnerTxnRef = params.partnerTxnRef;

  const externalInquiryTransactionConfig =
    ExternalInquiryTransactionConfig.safeParse({
      inquiryTransactionUrl: process.env.PAYMENT_INQUIRY_TRANSACTION_URL,
      accessToken: request.headers.get("Authorization"),
    });

  if (!externalInquiryTransactionConfig.success) {
    return responseError("CL401", externalInquiryTransactionConfig.error);
  }

  const txnRefId = transactionStorage.get(partnerTxnRef);
  if (!txnRefId) {
    return responseError("CL404", "transaction not found");
  }

  try {
    const rawResponse = await fetch(
      `${externalInquiryTransactionConfig.data.inquiryTransactionUrl}/${txnRefId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: externalInquiryTransactionConfig.data.accessToken,
        },
      }
    );

    if (rawResponse.status !== 200) {
      try {
        const res =
          (await rawResponse.json()) as ExternalInquiryTransactionResponse;
        return responseError(
          res.status?.code ?? res.code ?? "CL9999",
          res.status?.description ??
            res.message ??
            `fail to generate deeplink: ${rawResponse.status} ${JSON.stringify(
              res
            )}`
        );
      } catch (err) {
        return responseError(
          "CL9999",
          `fail to generate deeplink: ${rawResponse.status} ${err}`
        );
      }
    }

    const inquiryTransactionResponse = await rawResponse.json();

    return responseSuccess(inquiryTransactionResponse);
  } catch (error) {
    return responseError("CL9999", `error inquiry transaction ${error}`);
  }
}
