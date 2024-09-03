import { responseError, responseSuccess } from "@/app/api/lib/response";
import { GetCustomerProfileResponse } from "./type";
import {
  ExternalGetCustomerProfileRequest,
  ExternalGetCustomerProfileResponse,
} from "./type.external";

export async function POST(request: Request) {
  console.log("starting to get customer profile");
  try {
    const getCustomerProfileRequest =
      ExternalGetCustomerProfileRequest.safeParse({
        accessToken: request.headers.get("Authorization"),
        getCustomerProfileUrl: process.env.GET_CUSTOMER_PROFILE_URL,
      });

    if (!getCustomerProfileRequest.success) {
      return responseError("CL401", getCustomerProfileRequest.error);
    }

    const rawResponse = await fetch(
      getCustomerProfileRequest.data.getCustomerProfileUrl,
      {
        method: "POST",
        headers: {
          Authorization: getCustomerProfileRequest.data.accessToken,
        },
      }
    );

    console.info(
      "call api get customer profile done with response status " +
        rawResponse.status
    );

    if (rawResponse.status !== 200) {
      const res =
        (await rawResponse.json()) as ExternalGetCustomerProfileResponse;

      return responseError(res.code, res.message);
    }

    const customerProfile =
      (await rawResponse.json()) as ExternalGetCustomerProfileResponse;

    const response: GetCustomerProfileResponse = {
      ...customerProfile.data,
    };

    console.log("get customer profile successfully");
    return responseSuccess(response);
  } catch (error) {
    console.log("get customer profile error " + error);
    return responseError("CL9999", `error get customer profile ${error}`);
  }
}
