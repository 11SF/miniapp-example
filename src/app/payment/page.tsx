"use client";

import { inquiryTransaction } from "@/lib/frontend";
import { InquiryTransactionResponseData } from "@/types/payment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment() {
  const [data, setData] = useState<InquiryTransactionResponseData | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const partnerTxnRef = searchParams.get("partnerTxnRef") ?? "";
      const result = await inquiryTransaction(partnerTxnRef);
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p>Payment Status</p>
      <p>txnRefId: {data.txnRefId}</p>
      <p>txnStatus: {data.txnStatus}</p>
    </div>
  );
}
