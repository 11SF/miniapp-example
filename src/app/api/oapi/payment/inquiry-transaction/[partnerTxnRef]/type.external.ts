import { z } from "zod";

export const ExternalInquiryTransactionConfig = z.object({
  inquiryTransactionUrl: z
    .string({
      message:
        "PAYMENT_INQUIRY_TRANSACTION_URL is not defined in environment variable",
    })
    .url({ message: "PAYMENT_INQUIRY_TRANSACTION_URL is not a valid URL" }),
  accessToken: z.string().startsWith("Bearer "),
});

export interface ExternalInquiryTransactionResponse {
  status?: Status;
  code?: string;
  message?: string;
}

interface Status {
  code: string;
  description: string;
}
