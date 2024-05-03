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
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { FaRegCalendar, FaGlobe } from "react-icons/fa6";
import { FiTrendingUp, FiLoader } from "react-icons/fi";
import Datepicker from "react-tailwindcss-datepicker";
import "@/script/momentCustomLocale";
import { router } from "@inertiajs/react";
import userIcon from "/resources/img/icon/user.png";

export default function Overview({
    auth, product_types, total_bimbingan, history
}) {
    console.log(total_bimbingan)
    console.log(history)
    const user = auth.user;
    const currency = Intl.NumberFormat("id-ID");
    const [isLoading, setIsLoading] = useState(false);

    const [monthlyEarning, setMonthlyEarning] = useState(123);
    const [onProgressCourse, setonProgressCourse] = useState(123);
    const [totalEarning, setTotalEarning] = useState(1112750000);

    // Product Type
    const [productTypeLabels, setProductTypeLabels] = useState(['Dibimbing Online', 'Dibimbing Offline', 'Desk Review']);

    const [productTypeData, setProductTypeData] = useState(productTypeLabels.map((i) => faker.datatype.number({ min: 50, max: 200 })));

    ChartJS.register(
        Title,
        ArcElement,
        Tooltip,
        Legend
    );

    const productTypeOptions = {
        plugins: {
            title: {
                display: true,
                text: "Category Product",
                position: "top",
                align: "start",
                color: "black",
                font: {
                    weight: 500
                },
            },
            legend: {
                labels: {
                    font: {
                        size: 10
                    },
                    boxWidth: 20,
                    boxHeight: 20,
                    useBorderRadius: true,
                    borderRadius: 5,
                },
                align: "center",
                reverse: true,
                position: "left"
            },
        },
        cutout: '60%',
        aspectRatio: 1.394,
        responsive: true,
    };

    const productTypeDataset = {
        labels: product_types.map((item) => item.name),
        datasets: [
            {
                data: product_types.map((item) => item.jumlah),
                backgroundColor: [
                    '#FF8854',
                    '#5A6ACF',
                    '#263238',
                ],
                hoverOffset: 5
            }
        ],
    };

    // Total Bimbingan
    const [totalBimbinganData, setTotalBimbinganData] = useState(
        total_bimbingan.sort((x, y) => (x.order_count > y.order_count ? -1 : 1))
    );

    // History
    const [historyData, setHistoryData] = useState(history);

    const historyColumns = useMemo(
        () => [
            {
                accessorKey: "user.name", //simple recommended way to define a column
                header: "Customer",
            },
            {
                accessorKey: "order.products.name",
                header: "Product Name",
            },
            {
                accessorFn: (row) =>
                    moment(row.created_at).format("DD/MM/YYYY"),
                id: "date",
                header: "Tanggal",
            },
        ],
        []
    );

    const historyTableOptions = useMaterialReactTable({
        columns: historyColumns,
        data: historyData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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

    // Earning
    const [earningData, setEarningData] = useState(
        [
            {
                date: '2024-02-01',
                total: 1200000
            },
            {
                date: '2024-03-01',
                total: 870000
            },
            {
                date: '2024-01-01',
                total: 1000000
            },
        ]
    );

    const earningColumns = useMemo(
        () => [
            {
                accessorFn: (row) =>
                    moment(row.date).format("DD/MM/YYYY"),
                id: "date",
                header: "Date",
                size: 50,
            },
            {
                accessorFn: (row) =>
                    moment(row.date).format("MMMM"),
                id: "month",
                header: "Month",
                size: 50,
            },
            {
                accessorKey: "total",
                header: "Total",
                size: 150,
                Cell: ({ cell }) => <span className="text-green-500">+ Rp {currency.format(cell.getValue())},00</span>
            },
        ],
        []
    );

    const earningTableOptions = useMaterialReactTable({
        columns: earningColumns,
        data: earningData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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

    return (
        <DashboardLayout title="Overview" role="tutor" auth={auth}>
            <div className="relative">
                {isLoading && <LoadingUI />}
                {/* <div className="flex justify-end mb-[2vw]">
                    <DateRangePicker
                        value={dateRange}
                        onChange={dateRangeHandler}
                    />
                </div> */}
                <div className="relative flex flex-col gap-[.73vw]">
                    <div className="flex justify-between">
                        <ProductTypeChart
                            options={productTypeOptions}
                            data={productTypeDataset}
                        />
                        <div className="w-[12.25vw] grid grid-rows-2 gap-[.94vw] text-[.83vw]">
                            <InfoCard
                                title="Monthly Earning (IDR)"
                                data={currency.format(monthlyEarning)}
                                percentage={5.6}
                                grow={12}
                            />
                            <InfoCard
                                title="On Progress"
                                data={onProgressCourse}
                                percentage={5.6}
                                grow={12}
                                icon={<FaGlobe className="text-[1vw]" />}
                            />
                        </div>
                        <EarningTable options={earningTableOptions} />
                        <Card className="relative w-[12.5vw] h-[15.53vw] text-[.73vw] font-poppins py-[0vw] px-[0vw] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[5.21vw] bg-[#5A6ACF]"></div>
                            <div className="flex justify-center py-[1vw]">
                                <img
                                    className="relative bg-white w-[16vw] h-[16vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread z-50 p-[.2vw]"
                                    src={user.profile.profile_image ? user.profile.profile_image : userIcon}
                                    alt="User"
                                />
                            </div>
                            <div className="text-center">
                                <p className="">Welcome, {user.name} 👋</p>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                            <div className="absolute max-w-full bottom-[1vw] px-[1.25vw]">
                                <p className="font-medium">Total Earning</p>
                                <p className="font-bold text-[1.25vw]">Rp {currency.format(totalEarning)}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="flex justify-between text-[.83vw]">
                        <HistoryTable options={historyTableOptions} />
                        <TotalBimbinganInfo data={totalBimbinganData} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function ProductTypeChart({ options, data }) {
    return (
        <Card className="relative w-[21.2vw] h-[15.53vw]">
            <Doughnut options={options} data={data} className="cursor-pointer" />
        </Card>
    );
}

function EarningTable({ options }) {
    return (
        <Card className="w-[28vw] h-[15.53vw] space-y-[1.5vw]">
            <div className="flex items-center justify-between">
                <h4 className="font-sans font-medium text-[1vw]">
                    Earning
                </h4>
                <div>
                    <FiLoader className="text-[1.25vw]" />
                </div>
            </div>
            <MaterialReactTable table={options} />
        </Card>
    );
}

function HistoryTable({ options }) {
    return (
        <Card className="w-[52.4vw] space-y-[1.5vw]">
            <div className="flex items-center justify-between">
                <h4 className="font-sans font-medium text-[1vw]">
                    History
                </h4>
                <div>
                    <FiLoader className="text-[1.25vw]" />
                </div>
            </div>
            <MaterialReactTable table={options} />
        </Card>
    );
}

function TotalBimbinganInfo({ data }) {
    return (
        <Card className="w-[23vw] space-y-[1.5vw]">
            <div className="flex items-center justify-between">
                <h4 className="font-sans font-medium text-[1vw]">
                    Total Bimbingan
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
                <p className="font-sans font-medium">{title}</p>
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
