import { useState } from "react";
import { useForm } from "@inertiajs/react";
import GoalsButton from "@/Components/GoalsButton";
import logo from "/resources/img/icon/goals-5.svg";
import DashboardLayout from "@/Layouts/DashboardLayout";
import moment from "moment/moment";
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
import { FaRegCalendar } from "react-icons/fa6";
import Datepicker from "react-tailwindcss-datepicker";
import "@/script/momentCustomLocale";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import { useEffect } from "react";

export default function Statistic({ auth, product_type }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        totalsByDate: {},
    });

    // Chart Configuration
    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend
    );

    const options = {
        plugins: {
            title: {
                display: true,
                text: null,
                align: "start",
                font: {
                    family: 'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    size: 12,
                    weight: "500",
                },
                padding: {
                    top: 6,
                    bottom: 18,
                },
            },
            legend: { display: false },
        },
        aspectRatio: 5.725,
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

    // User Growth
    const [userGrowthLabels, setUserGrowthLabels] = useState([]);
    const [userData, setUserData] = useState(
        userGrowthLabels.map((i) =>
            faker.datatype.number({ min: 50, max: 200 })
        )
    );

    const getDataUser = (startDate, endDate) => {
        setIsLoading(true);
        console.log(
            `/api/user_growth?startDate=${startDate ? startDate : ""}&endDate=${
                endDate ? endDate : ""
            }`
        );
        fetch(
            `/api/user_growth?startDate=${startDate ? startDate : ""}&endDate=${
                endDate ? endDate : ""
            }`
        )
            .then((response) => response.json())
            .then((response) => {
                setUserGrowthLabels(Object.keys(response.totalPerDay));
                setUserData(
                    Object.values(response.totalPerDay).map((data) => data)
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
            });
    };

    // Mount Data
    useEffect(() => {
        getDataUser("", "", "", "");
    }, []);

    // const [moderatorData, setModeratorData] = useState(
    //     userGrowthLabels.map((i) =>
    //         faker.datatype.number({ min: 50, max: 200 })
    //     )
    // );
    // const [tutorData, setTutorData] = useState(
    //     userGrowthLabels.map((i) =>
    //         faker.datatype.number({ min: 50, max: 200 })
    //     )
    // );

    const userGrowthData = {
        labels: userGrowthLabels,
        datasets: [
            {
                label: "User",
                data: userData,
                backgroundColor: "#5A6ACF",
            },
            // {
            //     label: "Moderator",
            //     data: moderatorData,
            //     backgroundColor: "#FF8854",
            // },
            // {
            //     label: "Tutor",
            //     data: tutorData,
            //     backgroundColor: "#F0F469",
            // },
        ],
    };

    const [userGrowthDateRange, setUserGrowthDateRange] = useState({
        startDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
    });

    const userGrowthDateRangeHandler = (range) => {
        const x = moment(range.startDate);
        const y = moment(range.endDate);
        const diff = x.diff(y, "days");
        if (diff >= -31) {
            setIsLoading(true);

            setUserGrowthDateRange(range);
            getDataUser(range.startDate, range.endDate);
        } else {
            alert("Range tanggal maksimum 1 bulan!");
        }
    };

    // Click & Views

    console.log(data.totalsByDate);
    const [barLabels, setBarLabels] = useState(Object.keys(data.totalsByDate));

    const [clickData, setClickData] = useState(
        Object.values(data.totalsByDate).map(
            ({ totalClicks, totalViews }) => totalClicks
        )
    );
    const [viewsData, setViewsData] = useState(
        Object.values(data.totalsByDate).map(
            ({ totalClicks, totalViews }) => totalViews
        )
    );

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

    // Sales Amount
    const [salesData, setSalesData] = useState(
        barLabels.map((i) => faker.datatype.number({ min: 50, max: 200 }))
    );

    const salesAmountData = {
        labels: barLabels,
        datasets: [
            {
                label: "Sales Amount",
                data: salesData,
                backgroundColor: "#5A6ACF",
            },
        ],
    };

    // Function to get Data
    const getData = (startDate, endDate, productType, productName) => {
        setIsLoading(true);
        console.log(
            `/api/views_sales?startDate=${startDate ? startDate : ""}&endDate=${
                endDate ? endDate : ""
            }&productType=${productType ? productType : ""}&productName=${
                productName ? productName : ""
            }`
        );
        fetch(
            `/api/views_sales?startDate=${startDate ? startDate : ""}&endDate=${
                endDate ? endDate : ""
            }&productType=${productType ? productType : ""}&productName=${
                productName ? productName : ""
            }`
        )
            .then((response) => response.json())
            .then((response) => {
                // setUserGrowthLabels(Object.keys(response.totalsByDate));
                setBarLabels(Object.keys(response.totalsByDate));
                setClickData(
                    Object.values(response.totalsByDate).map(
                        ({ totalClicks }) => totalClicks
                    )
                );
                setViewsData(
                    Object.values(response.totalsByDate).map(
                        ({ totalViews }) => totalViews
                    )
                );

                setSalesData(
                    Object.values(response.salesAmount).map((data) => data)
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsLoading(true);
            });
    };

    // Mount Data
    useEffect(() => {
        getData("", "", "", "");
    }, []);

    // Filter
    const { data: filterData, setData: setFilterData } = useForm({
        dateRange: {
            startDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
        },
        productType: "",
        productName: "",
    });

    const productTypes = product_type;

    const [products, setProducts] = useState([]);

    const [showForm, setShowForm] = useState({
        productType: false,
        productName: false,
    });

    const showFormHandler = (key, value) => {
        const tempShowForm = { ...showForm };
        Object.keys(tempShowForm).forEach((i) => {
            i == key ? (tempShowForm[i] = value) : (tempShowForm[i] = false);
        });
        setShowForm(tempShowForm);
    };

    const filterHandler = (range, type, product) => {
        const x = moment(range.startDate);
        const y = moment(range.endDate);
        const diff = x.diff(y, "days");
        if (diff >= -31) {
            let tempBarLabels = [];
            tempBarLabels.push(x.format("DD"));
            if (diff) {
                for (let i = 1; i <= -diff; i++) {
                    tempBarLabels.push(x.add(1, "day").format("DD"));
                }
            }

            if (product) {
                // What to do if user select a product
                setFilterData({
                    ...filterData,
                    dateRange: range,
                    productName: product.name,
                });
                getData(
                    range.startDate,
                    range.endDate,
                    filterData.productType.type,
                    product.name
                );
            } else {
                if (type?.type == "text" || type === undefined) {
                    // What to do if user select a date range
                    setFilterData({
                        ...filterData,
                        dateRange: range,
                    });
                    getData(range.startDate, range.endDate);
                } else {
                    // What to do if user select a product type
                    setFilterData({
                        dateRange: range,
                        productType: type,
                        productName: "",
                    });
                    setProducts(type.products);
                    getData(range.startDate, range.endDate, type.type);
                }
            }
        } else {
            alert("Range tanggal maksimum 1 bulan!");
        }
    };

    return (
        <DashboardLayout title="Statistic" role="admin" auth={auth}>
            <div className="relative">
                <div className="relative flex flex-col gap-[1.67vw]">
                    <UserGrowthChart
                        options={options}
                        data={userGrowthData}
                        dateRange={userGrowthDateRange}
                        dateRangeHandler={userGrowthDateRangeHandler}
                    />
                    <FilterTools
                        showForm={showForm}
                        showFormHandler={showFormHandler}
                        filterData={filterData}
                        filterHandler={filterHandler}
                        productTypes={productTypes}
                        products={products}
                    />
                    <ClickViewsChart options={options} data={clickViewsData} />
                    <SalesAmountChart
                        options={options}
                        data={salesAmountData}
                    />
                </div>
            </div>
            {isLoading && <LoadingUI />}
        </DashboardLayout>
    );
}

function UserGrowthChart({ options, data, dateRange, dateRangeHandler }) {
    return (
        <Card className="relative w-full h-[15.53vw]">
            <div className="absolute left-0 w-full flex justify-end font-sans font-medium text-[1vw] px-[1.67vw]">
                <DateRangePicker
                    value={dateRange}
                    onChange={dateRangeHandler}
                />
            </div>
            <Bar
                options={{
                    ...options,
                    plugins: {
                        ...options.plugins,
                        title: {
                            ...options.plugins.title,
                            text: "User Growth",
                        },
                    },
                }}
                data={data}
                className="cursor-pointer"
            />
        </Card>
    );
}

function FilterTools({
    showForm,
    showFormHandler,
    filterData,
    filterHandler,
    productTypes,
    products,
}) {
    return (
        <div className="flex justify-end gap-[.25vw] font-sans font-medium text-[1vw]">
            <DateRangePicker
                value={filterData.dateRange}
                onChange={filterHandler}
            />
            <GoalsSelectInput
                show={showForm.productType}
                setShow={(i) => showFormHandler("productType", i)}
                data={filterData.productType.type}
                placeholder="Tipe Produk"
                className="flex-row-reverse md:justify-end gap-[.5vw] text-[.7vw] md:px-[1vw] md:w-[8.35vw] md:h-[2.099vw] py-[0vw] rounded-[2vw] border-1"
                filledClassName=""
                emptyClassName=""
            >
                {productTypes.map((item, index) => (
                    <GoalsSelectInputItem
                        key={index}
                        className="text-[.83vw]"
                        onClick={() =>
                            filterHandler(filterData.dateRange, item)
                        }
                    >
                        {item.type}
                    </GoalsSelectInputItem>
                ))}
            </GoalsSelectInput>
            <GoalsSelectInput
                show={showForm.productName}
                setShow={(i) => showFormHandler("productName", i)}
                data={filterData.productName}
                placeholder="Produk"
                className="flex-row-reverse md:justify-end gap-[.5vw] text-[.7vw] md:px-[1vw] md:w-[16.25vw] md:h-[2.099vw] py-[0vw] rounded-[2vw] border-1"
                filledClassName=""
                emptyClassName=""
            >
                {products.map((item, index) => (
                    <GoalsSelectInputItem
                        key={index}
                        className="text-[.83vw]"
                        onClick={() =>
                            filterHandler(
                                filterData.dateRange,
                                filterData.productType,
                                item
                            )
                        }
                    >
                        {item.name}
                    </GoalsSelectInputItem>
                ))}
            </GoalsSelectInput>
        </div>
    );
}

function ClickViewsChart({ options, data }) {
    return (
        <Card className="relative w-full h-[15.53vw]">
            <Bar
                options={{
                    ...options,
                    plugins: {
                        ...options.plugins,
                        title: {
                            ...options.plugins.title,
                            text: "Click & Views",
                        },
                    },
                }}
                data={data}
                className="cursor-pointer"
            />
        </Card>
    );
}

function SalesAmountChart({ options, data }) {
    return (
        <Card className="relative w-full h-[15.53vw]">
            <Bar
                options={{
                    ...options,
                    plugins: {
                        ...options.plugins,
                        title: {
                            ...options.plugins.title,
                            text: "Sales Amount",
                        },
                    },
                }}
                data={data}
                className="cursor-pointer"
            />
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
                maxDate={moment().format("YYYY-MM-DD")}
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
