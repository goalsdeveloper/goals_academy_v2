import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function History ({ auth }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <DashboardLayout title="Bimbingan" subtitle="History" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <div>History</div>
        </DashboardLayout>
    )
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}></div>
    )
}

function LoadingUI () {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img src={logo} alt="Goals Academy" className="w-[6vw] h-[6vw] animate-bounce" />
        </div>
    )
}
