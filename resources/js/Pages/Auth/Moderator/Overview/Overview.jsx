import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FiTrendingUp } from "react-icons/fi";
import { FaCartShopping, FaGlobe } from "react-icons/fa6";

export default function Overview ({ auth, total_order, total_checkout }) {
    const [isLoading, setIsLoading] = useState(false);

    const [totalOrder, setTotalOrder] = useState(total_order);
    const [totalCheckout, setTotalCheckout] = useState(total_checkout);

    return (
        <DashboardLayout title="Overview" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <div className="flex flex-wrap gap-[1vw]">
                <InfoCard
                    title="Total Order"
                    data={totalOrder}
                    percentage={5.6}
                    grow={12}
                    icon={<FaCartShopping className="text-[1vw]" />}
                />
                <InfoCard
                    title="Checkout User"
                    data={totalCheckout}
                    percentage={5.6}
                    grow={12}
                    icon={<FaGlobe className="text-[1vw]" />}
                />
            </div>
        </DashboardLayout>
    )
}

function InfoCard({ title, data, percentage, grow, icon }) {
    return (
        <Card className="flex justify-between w-[12.5vw] h-[7.4vw]">
            <div className="h-full flex flex-col justify-between">
                <p className="font-sans text-[.834vw]">{title}</p>
                <div>
                    <p className="font-poppins font-bold text-[1.25vw]">
                        {data}
                    </p>
                    <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                        <FiTrendingUp className="text-[1vw]" />
                        <span>{percentage}%</span>
                        <span className="text-light-grey">
                            {grow >= 0 ? "+" : "-"}
                            {grow} Today
                        </span>
                    </div>
                </div>
            </div>
            {icon && (
                <div className="w-[2.6vw] h-[2.6vw] rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                    {icon}
                </div>
            )}
        </Card>
    );
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
