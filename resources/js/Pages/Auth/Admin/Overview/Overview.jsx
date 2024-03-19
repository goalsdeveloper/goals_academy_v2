import { useState, useMemo } from "react";
import GoalsButton from "@/Components/GoalsButton";
import DashboardLayout from "@/Layouts/DashboardLayout";
import moment from "moment/moment";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { FaRegCalendar, FaCartShopping, FaGlobe } from "react-icons/fa6";
import { FiTrendingUp, FiLoader } from "react-icons/fi";
import { IoRocketSharp } from "react-icons/io5";
import "@/script/momentCustomLocale";
import Datepicker from "react-tailwindcss-datepicker";

export default function Overview ({ auth }) {
    // Data's Date Range
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });

    const dateRangePickerHandler = (range) => {
        console.log("range:", range);
        setDateRange(range);
    }


    // Click & Views
    const barLabels = ['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', ];

    const [clickData, setClickData] = useState(barLabels.map(i => faker.datatype.number({ min: 50, max: 200 })))
    const [viewsData, setViewsData] = useState(barLabels.map(i => faker.datatype.number({ min: 50, max: 200 })))

    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend,
    );

    const barOptions = {
        plugins: {
            title: {
                display: false,
                text: 'Total Views & Click',
                position: 'top'
            },
            legend: {
                align: 'end',
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
                    color: '#A6A6A6',
                    maxRotation: 0,
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: true,
                    color: context => {
                        if (context.index === 0) {
                            return '';
                        } else {
                            return '';
                        }
                    }
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
                        console.log(context);
                        if (context.index === 0) {
                            return '';
                        } else {
                            return 'rgba(160, 160, 160, 0.2)';
                        }
                    }
                },
                border: {
                    dash: [6,4],
                },
            },
        },
    };

    const clickViewsData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Clicks',
                data: clickData,
                backgroundColor: '#5A6ACF',
            },
            {
                label: 'Views',
                data: viewsData,
                backgroundColor: '#FF8854',
            },
        ],
    };

    // Top Selling
    const topSellingData = [
        {
            name: "Dibimbing Sekali Online 30 Menit",
            amount: 50,
        },
        {
            name: "Dibimbing Sekali Offline 45 Menit",
            amount: 41,
        },
        {
            name: "Desk Review",
            amount: 24
        },
        {
            name: "Dibimbing Tuntas",
            amount: 2,
        },
    ];

    // Recent Payment
    const [recentPaymentData, setRecentPaymentData] = useState([
        {
            id: 'GA12345678',
            name: 'John Doe',
            product: 'Dibimbing Sekali Online 30 Menit',
            date: '2024-03-18',
        },
        {
            id: 'GA12345678',
            name: 'John Doe',
            product: 'Dibimbing Sekali Online 30 Menit',
            date: '2024-03-18',
        },
        {
            id: 'GA12345678',
            name: 'John Doe',
            product: 'Dibimbing Sekali Online 30 Menit',
            date: '2024-03-18',
        },
        {
            id: 'GA12345678',
            name: 'John Doe',
            product: 'Dibimbing Sekali Online 30 Menit',
            date: '2024-03-18',
        },
        {
            id: 'GA12345678',
            name: 'John Doe',
            product: 'Dibimbing Sekali Online 30 Menit',
            date: '2024-03-18',
        },
    ]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id", //simple recommended way to define a column
                header: "ID Pesanan",
                size: 50,
                grow: false,
            },
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                size: 150,
            },
            {
                accessorKey: "product",
                header: "Product",
                size: 250,
            },
            {
                accessorFn: (row) => moment(row.date).format('DD/MM/YYYY'),
                id: "date",
                header: "Date",
                size: 50,
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: recentPaymentData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableTopToolbar: false,
        enableBottomToolbar: false,
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '.625vw',
                border: 'none',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: '.83vw',
                fontWeight: 'medium',
                color: '#404040',
                backgroundColor: '#F8F8FC',
                border: 'none',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: '.83vw',
                fontWeight: 'medium',
                color: '#404040',
                padding: '.5vw 1.2vw',
                border: 'none',
            },
        },
    });

    return (
        <DashboardLayout title="Overview" role="admin" auth={auth}>
            <Datepicker
                value={dateRange}
                onChange={dateRangePickerHandler}
                showShortcuts={true}
            />
            <div className="flex justify-end mb-[2vw]">
                <GoalsButton variant="default" className="relative w-[8.35vw] h-[2.1vw] md:px-[.1vw] md:py-[0vw] flex justify-center items-center gap-[.4vw] md:text-[.7vw] border-1 rounded-[.4vw]" activeClassName="">
                    <FaRegCalendar className="text-[1vw]" /> Select Date
                </GoalsButton>
            </div>
            <div className="flex flex-col gap-[.73vw]">
                <div className="flex justify-between">
                    {/* h-[15.53vw] */}
                    <Card className="relative w-[50vw] h-[15.53vw]">
                        <h4 className="absolute font-sans font-medium text-[1vw] mt-[.3vw]">Total Views & Clicks</h4>
                        <Bar options={barOptions} data={clickViewsData} className="cursor-pointer" />
                    </Card>
                    <div className="w-[25.1vw] grid grid-cols-2 gap-[.94vw] text-[.83vw]">
                        <Card className="flex justify-between">
                            <div className="h-full flex flex-col justify-between">
                                <p className="font-sans">Earnings (IDR)</p>
                                <div>
                                    <p className="font-poppins font-bold text-[1.25vw]">123</p>
                                    <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                        <FiTrendingUp className="text-[1vw]" />
                                        <span>5,6%</span>
                                        <span className="text-light-grey">+12 Today</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card className="flex justify-between">
                            <div className="h-full flex flex-col justify-between">
                                <p className="font-sans">Visitor</p>
                                <div>
                                    <p className="font-poppins font-bold text-[1.25vw]">123</p>
                                    <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                        <FiTrendingUp className="text-[1vw]" />
                                        <span>5,6%</span>
                                        <span className="text-light-grey">+12 Today</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[2.6vw] h-[2.6vw] rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                                <IoRocketSharp className="text-[1vw]" />
                            </div>
                        </Card>
                        <Card className="flex justify-between">
                            <div className="h-full flex flex-col justify-between">
                                <p className="font-sans">Total Order</p>
                                <div>
                                    <p className="font-poppins font-bold text-[1.25vw]">123</p>
                                    <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                        <FiTrendingUp className="text-[1vw]" />
                                        <span>5,6%</span>
                                        <span className="text-light-grey">+12 Today</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[2.6vw] h-[2.6vw] rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                                <FaCartShopping className="text-[1vw]" />
                            </div>
                        </Card>
                        <Card className="flex justify-between">
                            <div className="h-full flex flex-col justify-between">
                                <p className="font-sans">Checkout User</p>
                                <div>
                                    <p className="font-poppins font-bold text-[1.25vw]">123</p>
                                    <div className="flex items-center gap-[.25vw] text-[.625vw] text-green-500">
                                        <FiTrendingUp className="text-[1vw]" />
                                        <span>5,6%</span>
                                        <span className="text-light-grey">+12 Today</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[2.6vw] h-[2.6vw] rounded-[.625vw] flex items-center justify-center bg-dark-indigo text-white">
                                <FaGlobe className="text-[1vw]" />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex justify-between text-[.83vw]">
                    <Card className="w-[52.4vw] space-y-[1.5vw]">
                        <div className="flex items-center justify-between">
                            <h4 className="font-sans font-medium text-[1vw]">Recent Payment</h4>
                            <div><FiLoader className="text-[1.25vw]" /></div>
                        </div>
                        <MaterialReactTable table={table} />
                    </Card>
                    <Card className="w-[23vw] space-y-[1.5vw]">
                        <div className="flex items-center justify-between">
                            <h4 className="font-sans font-medium text-[1vw]">Top Selling</h4>
                        </div>
                        <div className="grid gap-[1.5vw]">
                            {topSellingData.map(({name, amount}, index) => {
                                const highestAmount = Math.max(...topSellingData.map(i => i.amount));
                                return (
                                    <div key={index} className="space-y-[.5vw]">
                                        <div className="flex items-center justify-between">
                                            <span>{name}</span>
                                            <span>{amount}</span>
                                        </div>
                                        <div className="w-full h-[.6vw] bg-green-100 rounded-full overflow-hidden">
                                            <div style={{ width: amount/highestAmount*100+'%' }} className="h-full bg-green-500 animate-slideRight duration-300"></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
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
