import { transactionStorage } from "@/app/api/lib/mock-storage";
import { responseError, responseSuccess } from "@/app/api/lib/response";
import { GenerateDeeplinkRequest, GenerateDeeplinkResponse } from "./type";
import { generateDeeplink } from "@/app/api/lib/payment";
import { GenerateDeeplinkRequest as GenerateDeeplinkRequestLib } from "@/app/api/lib/type/generate-deeplink.type";
import { LibError } from "@/app/api/lib/error/lib-error";

export async function POST(request: Request) {
  const req = (await request.json()) as GenerateDeeplinkRequest;
  const partnerTxnRef = Date.now().toString();

  try {
    const txn: GenerateDeeplinkRequestLib = {
      txnSessionValidUntil: new Date().toISOString(),
      paymentInfo: {
        partnerTxnRef: partnerTxnRef,
        amount: req.amount,
        ref1value: partnerTxnRef,
      },
    };

    const generateDeeplinkResponse = await generateDeeplink(txn);

    transactionStorage.set(
      partnerTxnRef,
      generateDeeplinkResponse.txnRefId ?? "-"
    );

    const response: GenerateDeeplinkResponse = {
      txnRefId: generateDeeplinkResponse.txnRefId ?? "-",
    };

    return responseSuccess(response);
  } catch (error) {
    if (error instanceof LibError) {
      return responseError(error.code, error.message);
    }
    return responseError("CL9999", `generate deeplink with error:${error}`);
  }
}
