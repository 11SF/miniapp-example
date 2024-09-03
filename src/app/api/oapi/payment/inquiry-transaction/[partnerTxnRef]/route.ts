import { LibError } from "@/app/api/lib/error/lib-error";
import { transactionStorage } from "@/app/api/lib/mock-storage";
import { inquiryTransaction } from "@/app/api/lib/payment";
import { responseError, responseSuccess } from "@/app/api/lib/response";

export async function POST(
  request: Request,
  { params }: { params: { partnerTxnRef: string } }
) {
  const partnerTxnRef = params.partnerTxnRef;

  const txnRefId = transactionStorage.get(partnerTxnRef);
  if (!txnRefId) {
    return responseError("CL404", "transaction not found");
  }

  try {
    const inquiryTransactionResponse = await inquiryTransaction(txnRefId);

    return responseSuccess(inquiryTransactionResponse);
  } catch (error) {
    if (error instanceof LibError) {
      return responseError(error.code, error.message);
    }
    return responseError("CL9999", `error inquiry transaction ${error}`);
  }
}
