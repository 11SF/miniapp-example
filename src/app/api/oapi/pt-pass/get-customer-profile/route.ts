import { getCustomerProfile } from "@/lib/backend/pt-pass";
import { responseError, responseSuccess } from "@/lib/backend/response";

export async function POST(request: Request) {
  try {
    const accessToken = request.headers.get("Authorization") ?? "";

    const customerProfile = await getCustomerProfile(accessToken);

    return responseSuccess(customerProfile.data);
  } catch (error) {
    return responseError("CL9999", `error get customer profile ${error}`);
  }
}
