import { getCustomerProfile } from "@/lib/backend/pt-pass";
import { responseError, responseSuccess } from "@/app/api/response";
import { LibError } from "@/lib/error/lib-error";

export async function POST(request: Request) {
  try {
    const accessToken = request.headers.get("Authorization") ?? "";

    //Example of how to use the functions from the lib/backend/index.ts
    const customerProfile = await getCustomerProfile(accessToken);

    return responseSuccess(customerProfile.data);
  } catch (error) {
    if (error instanceof LibError) {
      return responseError(error.code, error.message);
    }
    return responseError("CL9999", `error get customer profile ${error}`);
  }
}
