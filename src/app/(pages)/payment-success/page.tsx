"use client";

import { SIMPLE_STYLED_BUTTON_CLASS } from "@/const/style";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    
    const redirect = (e: any) => {
        router.push("/")
    }

    return <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>Payment success!</h1>
        <button className={SIMPLE_STYLED_BUTTON_CLASS} onClick={(e) => redirect(e)}>Redirect</button>
    </div>
}

export default Page;