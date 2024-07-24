import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FiTrendingUp } from "react-icons/fi";
import { FaCartShopping, FaGlobe } from "react-icons/fa6";

export default function Overview ({ auth, total_order, total_checkout }) {
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const [totalOrder, setTotalOrder] = useState(total_order);
    const [totalCheckout, setTotalCheckout] = useState(total_checkout);

    return (
        <DashboardLayout title="Overview" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <div className="grid grid-cols-2 md:flex flex-wrap md:gap-[1vw]">
                <InfoCard
                    title="Total Order"
                    data={totalOrder}
                    percentage={5.6}
                    grow={12}
                    icon={<FaCartShopping className="text-[4vw] md:text-[1vw]" />}
                />
                <InfoCard
                    title="Checkout User"
                    data={totalCheckout}
                    percentage={5.6}
                    grow={12}
                    icon={<FaGlobe className="text-[4vw] md:text-[1vw]" />}
                />
            </div>
        </DashboardLayout>
    )
}

function InfoCard({ title, data, percentage, grow, icon }) {
    return (
        <Card className="flex justify-between w-full h-fit md:w-[12.5vw] md:h-[7.4vw]">
            <div className="h-full flex flex-col justify-between">
                <p className="font-sans text-[3.32vw] md:text-[.83vw]">{title}</p>
                <div>
                    <p className="font-poppins font-bold text-[5vw] md:text-[1.25vw]">
                        {data}
                    </p>
                    <div className="flex items-center gap-[1vw] md:gap-[.25vw] text-[2.5vw] md:text-[.625vw] text-green-500">
                        <FiTrendingUp className="text-[4vw] md:text-[1vw]" />
                        <span>{percentage}%</span>
                        <span className="text-light-grey">
                            {grow >= 0 ? "+" : "-"}
                            {grow} Today
                        </span>
                    </div>
                </div>
            </div>
            {icon && (
                <div className="w-[10.4vw] h-[10.4vw] md:w-[2.6vw] md:h-[2.6vw] rounded-[2.5vw] md:rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                    {icon}
                </div>
            )}
        </Card>
    );
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white border-1 md:border-0 md:shadow-bottom-right md:rounded-[.625vw] py-[5vw] px-[6.68vw] md:py-[1.25vw] md:px-[1.67vw] ${className}`}></div>
    )
}

function LoadingUI () {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img src={logo} alt="Goals Academy" className="w-[6vw] h-[6vw] animate-bounce" />
        </div>
    )
}
