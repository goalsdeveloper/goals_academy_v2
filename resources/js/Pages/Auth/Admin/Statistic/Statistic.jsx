import GoalsButton from "@/Components/elements/GoalsButton";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FaRegCalendar } from "react-icons/fa6";

export default function Statistic ({ auth }) {
    return (
        <DashboardLayout title="Statistic" role="admin" auth={auth}>
            <div className="flex justify-end mb-[2vw]">
                <GoalsButton variant="default" className="relative md:px-[1.25vw] md:py-[.625vw] flex items-center gap-[.5vw] md:text-[.73vw]">
                    <FaRegCalendar className="text-[1vw]" /> Select Date
                </GoalsButton>
            </div>
            <div className="flex flex-col gap-[.73vw]">
                <div className="flex justify-between">
                    <Card className="w-[50vw] h-[15.53vw]"></Card>
                    <div className="w-[25.1vw] grid grid-cols-2 gap-[.94vw]">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Card className="w-[52.4vw] h-[20.16vw]"></Card>
                    <Card className="w-[23vw]"></Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}></div>
    )
}
