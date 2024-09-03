import { responseError, responseSuccess } from "@/app/api/lib/response";
import { GenerateDeeplinkRequest, GenerateDeeplinkResponse } from "./type";
import {
  ExternalGenerateDeeplinkConfig,
  ExternalGenerateDeeplinkResponse,
  ExternalGenerateDeeplinkRequest,
} from "./type.external";
import { transactionStorage } from "@/app/api/lib/mock-storage";

export async function POST(request: Request) {
  console.log("starting to generate deeplink");

  const req = (await request.json()) as GenerateDeeplinkRequest;
  const partnerTxnRef = Date.now().toString();

  const generateDeeplinkConfig = ExternalGenerateDeeplinkConfig.safeParse({
    generateDeeplinkUrl: process.env.PAYMENT_DEEPLINK_URL,
    accessToken: request.headers.get("Authorization"),
    miniappUUID: process.env.MINIAPP_UUID,
  });

  if (!generateDeeplinkConfig.success) {
    return responseError("CL401", generateDeeplinkConfig.error);
  }

  //Example transaction info, you can ad
  const generateDeeplinkRequest = ExternalGenerateDeeplinkRequest.safeParse({
    partnerTxnCreatedDt: new Date().toISOString(),
    paymentInfo: {
      partnerTxnRef: partnerTxnRef,
      compCode: process.env.COMP_CODE,
      amount: req.amount,
      ref1value: partnerTxnRef,
    },
    additionalInfo: {
      additionalInfo8: "BACK_TO_MINIAPP",
    },
    partnerInfo: {
      deeplink: `${generateDeeplinkConfig.data.generateDeeplinkUrl}?partnerTxnRef=${partnerTxnRef}&miniAppUUID=${generateDeeplinkConfig.data?.miniappUUID}&destination=miniapp`,
    },
  });

  if (!generateDeeplinkRequest.success) {
    return responseError("CL401", generateDeeplinkRequest.error);
  }

  try {
    const rawResponse = await fetch(
      generateDeeplinkConfig.data.generateDeeplinkUrl,
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "oapi-client-id": process.env.TWO_LEGGED_CLIENT_ID ?? "",
          "oapi-partner-id": "f6cac73f-3d82-4f3a-a74f-ebf5804c0683",
          Authorization: generateDeeplinkConfig.data.accessToken,
        },
        body: JSON.stringify(generateDeeplinkRequest.data),
      }
    );

    if (rawResponse.status !== 200) {
      try {
        const res =
          (await rawResponse.json()) as ExternalGenerateDeeplinkResponse;
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

    const generateDeeplinkResponse =
      (await rawResponse.json()) as ExternalGenerateDeeplinkResponse;

    console.log("generate deeplink response", generateDeeplinkResponse);

    transactionStorage.set(
      partnerTxnRef,
      generateDeeplinkResponse.txnRefId ?? "-"
    );

    const response: GenerateDeeplinkResponse = {
      txnRefId: generateDeeplinkResponse.txnRefId ?? "-",
    };

    console.log("generate deeplink successfully");
    return responseSuccess(response);
  } catch (err) {
    return responseError("CL9999", `generate deeplink with error:${err}`);
  }
}
