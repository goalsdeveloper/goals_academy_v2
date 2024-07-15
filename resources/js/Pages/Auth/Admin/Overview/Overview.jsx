import { useState, useMemo } from "react";
import GoalsButton from "@/Components/GoalsButton";
import logo from "/resources/img/icon/goals-5.svg";
import DashboardLayout from "@/Layouts/DashboardLayout";
import moment from "moment/moment";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { FaRegCalendar, FaCartShopping, FaGlobe } from "react-icons/fa6";
import { FiTrendingUp, FiLoader } from "react-icons/fi";
import { IoRocketSharp } from "react-icons/io5";
import Datepicker from "react-tailwindcss-datepicker";
import "@/script/momentCustomLocale";
import { router } from "@inertiajs/react";

export default function Overview({
    auth,
    total_earning,
    total_order,
    total_checkout,
    list_orders,
    top_selling,
    totalsByDate,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const currency = Intl.NumberFormat("id-ID");

    const [totalEarning, setTotalEarning] = useState(total_earning);
    const [totalVisitor, setTotalVisitor] = useState(312);
    const [totalOrder, setTotalOrder] = useState(total_order);
    const [totalCheckout, setTotalCheckout] = useState(total_checkout);

    // Click & Views
    const [barLabels, setBarLabels] = useState(
        Object.keys(totalsByDate).map((i) => i.split("-")[2])
    );

    const [clickData, setClickData] = useState(
        Object.values(totalsByDate).map(
            ({ totalClicks, totalViews }) => totalClicks
        )
    );
    const [viewsData, setViewsData] = useState(
        Object.values(totalsByDate).map(
            ({ totalClicks, totalViews }) => totalViews
        )
    );

    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend
    );

    const barOptions = {
        plugins: {
            title: {
                display: false,
                text: "Total Views & Click",
                position: "top",
            },
            legend: {
                align: "end",
                reverse: true,
                boxWidth: 20,
                boxHeight: 20,
            },
        },
        aspectRatio: 3.58,
        responsive: true,
        borderRadius: 1000,
        barThickness: 4,
        scales: {
            x: {
                beginAtZero: true,
                stacked: true,
                ticks: {
                    color: "#A6A6A6",
                    maxRotation: 0,
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: true,
                    color: (context) => {
                        if (context.index === 0) {
                            return "";
                        } else {
                            return "";
                        }
                    },
                },
            },
            y: {
                beginAtZero: true,
                stacked: true,
                ticks: {
                    display: false,
                },
                grid: {
                    drawBorder: false,
                    drawTicks: false,
                    color: (context) => {
                        if (context.index === 0) {
                            return "";
                        } else {
                            return "rgba(160, 160, 160, 0.2)";
                        }
                    },
                },
                border: {
                    dash: [6, 4],
                },
            },
        },
    };

    const clickViewsData = {
        labels: barLabels,
        datasets: [
            {
                label: "Clicks",
                data: clickData,
                backgroundColor: "#5A6ACF",
            },
            {
                label: "Views",
                data: viewsData,
                backgroundColor: "#FF8854",
            },
        ],
    };

    // Top Selling
    const [topSellingData, setTopSellingData] = useState(
        top_selling.sort((x, y) => (x.order_count > y.order_count ? -1 : 1))
    );

    // Recent Payment
    const [recentPaymentData, setRecentPaymentData] = useState(
        list_orders.slice(0, 5)
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: "order_code", //simple recommended way to define a column
                header: "ID Pesanan",
                grow: false,
            },
            {
                accessorKey: "user.name", //simple recommended way to define a column
                header: "Name",
            },
            {
                accessorKey: "products.name",
                header: "Product",
            },
            {
                accessorFn: (row) =>
                    moment(row.created_at).format("DD/MM/YYYY"),
                id: "date",
                header: "Date",
            },
        ],
        []
    );

    const tableOptions = useMaterialReactTable({
        columns,
        data: recentPaymentData, //must be memorized or stable (useState, useMemo, defined outside of this component, etc.)
        enableTopToolbar: false,
        enableBottomToolbar: false,
        enableColumnActions: false,
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: ".625vw",
                border: "none",
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontFamily:
                    'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: ".83vw",
                fontWeight: "medium",
                color: "#404040",
                backgroundColor: "#F8F8FC",
                border: "none",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontFamily:
                    'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: ".83vw",
                fontWeight: "medium",
                color: "#404040",
                padding: ".5vw 1.2vw",
                border: "none",
            },
        },
        muiTableContainerProps: {
            className: "scrollbar-hidden",
        },
    });

    // Data's Date Range
    const [dateRange, setDateRange] = useState({
        startDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
    });

    const dateRangeHandler = (range) => {
        router.get(route("admin.overview.index"), {
            startDate: range.startDate,
            endDate: range.endDate,
        });
    };

    return (
        <DashboardLayout title="Overview" role="admin" auth={auth}>
            <div className="relative">
                {isLoading && <LoadingUI />}
                <div className="flex justify-end mb-[2vw]">
                    <DateRangePicker
                        value={dateRange}
                        onChange={dateRangeHandler}
                    />
                </div>
                <div className="relative flex flex-col gap-[.73vw]">
                    <div className="flex justify-between">
                        <ClickViewsChart
                            options={barOptions}
                            data={clickViewsData}
                        />
                        <div className="w-[25.1vw] grid grid-cols-2 gap-[.94vw] text-[.83vw]">
                            <InfoCard
                                title="Earning (IDR)"
                                data={currency.format(totalEarning)}
                                percentage={5.6}
                                grow={12}
                            />
                            <InfoCard
                                title="Visitor"
                                data={totalVisitor}
                                percentage={5.6}
                                grow={12}
                                icon={<IoRocketSharp className="text-[1vw]" />}
                            />
                            <InfoCard
                                title="Total Order"
                                data={totalCheckout}
                                percentage={5.6}
                                grow={12}
                                icon={<FaCartShopping className="text-[1vw]" />}
                            />
                            <InfoCard
                                title="Checkout User"
                                data={totalOrder}
                                percentage={5.6}
                                grow={12}
                                icon={<FaGlobe className="text-[1vw]" />}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between text-[.83vw]">
                        <RecentPaymentTable options={tableOptions} />
                        <TopSellingInfo data={topSellingData} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function ClickViewsChart({ options, data }) {
    return (
        <Card className="relative w-[50vw] h-[15.53vw]">
            <h4 className="absolute font-sans font-medium text-[1vw] mt-[.3vw]">
                Total Views & Clicks
            </h4>
            <Bar options={options} data={data} className="cursor-pointer" />
        </Card>
    );
}

function RecentPaymentTable({ options }) {
    return (
        <Card className="w-[52.4vw] space-y-[1.5vw]">
            <div className="flex items-center justify-between">
                <h4 className="font-sans font-medium text-[1vw]">
                    Recent Payment
                </h4>
                <div>
                    <FiLoader className="text-[1.25vw]" />
                </div>
            </div>
            <MaterialReactTable table={options} />
        </Card>
    );
}

function TopSellingInfo({ data }) {
    return (
        <Card className="w-[23vw] space-y-[1.5vw]">
            <div className="flex items-center justify-between">
                <h4 className="font-sans font-medium text-[1vw]">
                    Top Selling
                </h4>
            </div>
            <div className="grid gap-[1.5vw]">
                {data.map(({ name, order_count }, index) => {
                    const highestCount = Math.max(
                        ...data.map((i) => i.order_count)
                    );
                    return (
                        <div key={index} className="space-y-[.5vw]">
                            <div className="flex items-center justify-between">
                                <span>{name}</span>
                                <span>{order_count}</span>
                            </div>
                            <div className="w-full h-[.6vw] bg-green-100 rounded-full overflow-hidden">
                                <div
                                    style={{
                                        width:
                                            (order_count / highestCount) * 100 +
                                            "%",
                                    }}
                                    className="h-full bg-green-500 animate-slideRight duration-300"
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function InfoCard({ title, data, percentage, grow, icon }) {
    return (
        <Card className="flex justify-between">
            <div className="h-full flex flex-col justify-between">
                <p className="font-sans">{title}</p>
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

function DateRangePicker({ value, onChange }) {
    return (
        <GoalsButton
            variant="default"
            className="relative w-[8.35vw] h-[2.1vw] md:px-[.1vw] md:py-[0vw] flex justify-center items-center gap-[.4vw] md:text-[.7vw] border-1 rounded-[.4vw]"
            activeClassName=""
        >
            <Datepicker
                value={value}
                onChange={onChange}
                showShortcuts={true}
                primaryColor="indigo"
                inputClassName="w-full bg-transparent border-transparent text-transparent placeholder:text-transparent focus:ring-0 focus:border-0 rounded-[.4vw] text-[.83vw] p-[.5vw] leading-tight cursor-pointer"
                containerClassName="absolute"
                toggleClassName="hidden"
                popoverDirection="down"
            />
            <FaRegCalendar className="text-[1vw]" /> Select Date
        </GoalsButton>
    );
}

function Card({ className, ...props }) {
    return (
        <div
            {...props}
            className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}
        ></div>
    );
}

function LoadingUI() {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img
                src={logo}
                alt="Goals Academy"
                className="w-[6vw] h-[6vw] animate-bounce"
            />
        </div>
    );
}
