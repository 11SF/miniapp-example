import { LibError } from "../error/lib-error";
import {
  getCustomerProfileConfigSchema,
  getCustomerProfileRequestSchema,
  GetCustomerProfileResponse
} from "../type/get-customer-profile.type";

export const getCustomerProfile = async (
  accessToken: string
): Promise<GetCustomerProfileResponse> => {
  const config = getCustomerProfileConfigSchema.safeParse({
    getCustomerProfileUrl: process.env.URL_GET_CUSTOMER_PROFILE,
  });
  if (!config.success) {
    throw new LibError(config.error.message, "LB400", config.error);
  }

  const requestData = getCustomerProfileRequestSchema.safeParse({
    accessToken,
  });
  if (!requestData.success) {
    throw new LibError(requestData.error.message, "LB400", requestData.error);
  }

  try {
    const rawResponse = await fetch(config.data.getCustomerProfileUrl, {
      method: "POST",
      headers: {
        Authorization: requestData.data.accessToken,
      },
    });

    if (rawResponse.status !== 200) {
      const res = (await rawResponse.json()) as GetCustomerProfileResponse;

      throw new LibError(res.message, res.code);
    }

    const customerProfile =
      (await rawResponse.json()) as GetCustomerProfileResponse;

    return customerProfile;
  } catch (error) {
    throw new LibError(`get customer profile error: ${error}`, "LB9999", error);
  }
};
