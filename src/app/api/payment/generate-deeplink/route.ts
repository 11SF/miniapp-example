import { transactionStorage } from "@/app/api/mock-storage";
import { responseError, responseSuccess } from "@/lib/backend/response";
import { GenerateDeeplinkRequest as GenerateDeeplinkRequestLib } from "@/lib/backend/type/generate-deeplink.type";
import { LibError } from "@/lib/error/lib-error";
import { GenerateDeeplinkRequest, GenerateDeeplinkResponseData } from "./type";
import { generateDeeplink } from "@/lib/backend";

export async function POST(request: Request) {
  const req = (await request.json()) as GenerateDeeplinkRequest;
  const partnerTxnRef = Date.now().toString();

  try {
    /*
      Example of how to use the functions from the lib/backend/index.ts
      you can override all fields of the transaction request object
    */
    const txn: GenerateDeeplinkRequestLib = {
      paymentInfo: {
        partnerTxnRef: partnerTxnRef,
        amount: req.amount,
        ref1value: partnerTxnRef,
      },
    };

    const generateDeeplinkResponse = await generateDeeplink(txn);

    /*
      Example to handle the response.
      You should save the txnRefId and partnerTxnRef to your storage for inquiry transaction status.
      In this example, we uses the mock storage to save the transaction.
    */
    transactionStorage.set(
      partnerTxnRef,
      generateDeeplinkResponse.txnRefId ?? "-"
    );

    const response: GenerateDeeplinkResponseData = {
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
