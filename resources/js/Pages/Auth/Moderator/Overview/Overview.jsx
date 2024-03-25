import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FiTrendingUp } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa6";

export default function Overview ({ auth }) {
    const [isLoading, setIsLoading] = useState(false);

    const [totalEarning, setTotalEarning] = useState(23516400);
    const [totalOnProgress, setTotalOnProgress] = useState(312);

    const currency = Intl.NumberFormat('id-ID');

    return (
        <DashboardLayout title="Overview" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <div className="flex flex-wrap gap-[1vw]">
                <Card className="w-[12.5vw] h-[7.4vw] flex justify-between">
                    <div className="h-full flex flex-col justify-between">
                        <p className="font-sans text-[.834vw]">Earning (IDR)</p>
                        <div>
                            <p className="font-poppins font-bold text-[1.25vw]">{currency.format(totalEarning)}</p>
                            <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                <FiTrendingUp className="text-[1vw]" />
                                <span>5.6%</span>
                                <span className="text-light-grey">+12 Today</span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="w-[12.5vw] h-[7.4vw] flex justify-between">
                    <div className="h-full flex flex-col justify-between">
                        <p className="font-sans text-[.834vw]">On Progress</p>
                        <div>
                            <p className="font-poppins font-bold text-[1.25vw]">{totalOnProgress}</p>
                            <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                <FiTrendingUp className="text-[1vw]" />
                                <span>5.6%</span>
                                <span className="text-light-grey">+12 Today</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-[2.6vw] h-[2.6vw] rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                        <FaGlobe className="text-[1vw]" />
                    </div>
                </Card>
            </div>
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
