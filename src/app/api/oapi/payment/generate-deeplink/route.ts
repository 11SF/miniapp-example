import { transactionStorage } from "@/app/api/lib/mock-storage";
import { generateDeeplink } from "@/lib/backend/payment";
import { responseError, responseSuccess } from "@/lib/backend/response";
import { GenerateDeeplinkRequest as GenerateDeeplinkRequestLib } from "@/lib/backend/type/generate-deeplink.type";
import { LibError } from "@/lib/error/lib-error";
import { GenerateDeeplinkRequest, GenerateDeeplinkResponse } from "./type";

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
