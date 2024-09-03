import { getCustomerProfile } from "@/app/api/lib/pt-pass/get-customer-profile";
import { responseError, responseSuccess } from "@/app/api/lib/response";

export async function POST(request: Request) {
  try {
    const accessToken = request.headers.get("Authorization") ?? "";

    const customerProfile = await getCustomerProfile(accessToken);

    return responseSuccess(customerProfile.data);
  } catch (error) {
    return responseError("CL9999", `error get customer profile ${error}`);
  }
}
