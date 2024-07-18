import { useState, useMemo } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FiChevronLeft, FiChevronRight, FiEdit2, FiEye } from "react-icons/fi";
import GoalsDataTable from "@/Components/elements/GoalsDataTable";
import moment from "moment";
import { createPortal } from "react-dom";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import logo from "/resources/img/icon/goals-5.svg";
import GoalsBadge from "@/Components/elements/GoalsBadge";
import { getStatusClass } from "../../User/RiwayatTransaksi/components/TransactionStatusBadge";
import { upperCaseFirstLetter } from "@/script/utils";
import { Link } from "@inertiajs/react";

export default function Schedule({ auth, data }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState([]);
    const [dateRange, setDateRange] = useState({
        start_date: Object.keys(data[0])[1],
        end_date: Object.keys(data[0])[7],
    });
    const [dataSchedule, setDataSchedule] = useState(data);
    const updateData = (param) => {
        let start_date, end_date;
        if (param == "forward") {
            start_date = moment(dateRange.start_date)
                .add(7, "d")
                .format("YYYY-MM-DD");
            end_date = moment(dateRange.end_date)
                .add(7, "d")
                .format("YYYY-MM-DD");
        } else {
            start_date = moment(dateRange.start_date)
                .subtract(7, "d")
                .format("YYYY-MM-DD");
            end_date = moment(dateRange.end_date)
                .subtract(7, "d")
                .format("YYYY-MM-DD");
        }
        setIsLoading(true);
        fetch(
            `/api/tutor_schedule?start_date=${start_date}&end_date=${end_date}`
        )
            .then((res) => res.json())
            .then((res) => {
                setDataSchedule(res.data);
                setDateRange({ ...{ start_date, end_date } });
                setIsLoading(false);
            });
    };

    const columns = useMemo(
        () =>
            [
                {
                    accessorKey: "time",
                    header: "",
                    size: 50,
                    Header: ({ column }) => (
                        <div className="bg-skin">{column.columnDef.header}</div>
                    ),
                    Cell: ({ cell }) => (
                        <div className="text-center font-semibold">
                            {moment(cell.getValue(), "HH:mm").format("HH.mm")}
                        </div>
                    ),
                },
            ].concat(
                Object.keys(dataSchedule[0])
                    .filter((i) => i != "time")
                    .map((i) => ({
                        accessorKey: i,
                        header: moment(i).format("ddd, DD MMMM"),
                        size: 50,
                        Cell: ({ cell }) => {
                            const value = cell.getValue();
                            return (
                                <button
                                    className="w-full flex items-center justify-center gap-[1vw] py-[1.5vw] px-[1.2vw]"
                                    onClick={() => {
                                        if (value.length >= 1) {
                                            console.log(value)
                                            setDataDetail(value);
                                            setShowDetail(true);
                                        }
                                    }}
                                >
                                    <span>{value[0]?.course?.tutor?.name}</span>
                                    {value.length > 1 && (
                                        <span className="flex items-center justify-center bg-skin rounded-full w-[2vw] h-[2vw]">
                                            {value.length}
                                        </span>
                                    )}
                                </button>
                            );
                        },
                    }))
            ),
        [dataSchedule]
    );

    const options = {
        enableTopToolbar: false,
        enableColumnActions: false,
        enableSorting: false,
        muiTableHeadCellProps: {
            sx: {
                fontFamily: "Poppins",
                fontWeight: 600,
                backgroundColor: "#F8F8FC",
                padding: 0,
                ">.Mui-TableHeadCell-Content": {
                    justifyContent: "center",
                },
            },
        },
        muiTableBodyCellProps: {
            sx: {
                padding: 0,
                // '&:hover': {
                //     backgroundColor: 'lightgray'
                // }
            },
        },
    };

    return (
        <DashboardLayout
            title="Tutor"
            subtitle="Schedule"
            role="moderator"
            auth={auth}
        >
            {isLoading && <LoadingUI />}
            <p className="font-medium text-[1.2vw] mb-[1.2vw]">Schedule</p>
            <div className="bg-white rounded-[.625vw] px-[1.67vw] py-[1.25vw]">
                <div className="w-full bg-dark-indigo text-white flex justify-between items-center p-[1vw] rounded-t-[.5vw]">
                    <button>
                        <FiChevronLeft
                            className="text-[1.5vw]"
                            onClick={() => updateData("backward")}
                        />
                    </button>
                    <p>
                        {moment(dateRange.start_date).format("DD MMMM YYYY")} -{" "}
                        {moment(dateRange.end_date).format("DD MMMM YYYY")}
                    </p>
                    <button>
                        <FiChevronRight
                            className="text-[1.5vw]"
                            onClick={() => updateData("forward")}
                        />
                    </button>
                </div>
                <GoalsDataTable
                    data={dataSchedule}
                    columns={columns}
                    options={options}
                />
            </div>
            <CellDetail
                show={showDetail}
                setShow={setShowDetail}
                data={dataDetail}
            />
        </DashboardLayout>
    );
}

function CellDetail({ show, setShow, data }) {
    const columns = useMemo(
        () =>
            [
                {
                    accessorKey: "course.order.order_code",
                    header: "Order Code",
                    size: 50,
                },
                {
                    accessorKey: "course.user.name",
                    header: "Customer Name",
                    size: 50,
                },
                {
                    accessorKey: "course.tutor.username",
                    header: "Username",
                    size: 50,
                },
                {
                    accessorKey: "course.tutor.name",
                    header: "Name",
                    size: 50,
                },
                {
                    accessorKey: "course.products.name",
                    header: "Product",
                    size: 200,
                },
                {
                    accessorKey: "course.session",
                    header: "Session",
                    size: 50,
                },
                {
                    accessorFn: (row) => moment(`${row.course?.date} ${row.course?.time}`).format("dddd, DD MMMM YYYY HH:mm"),
                    header: "Date & Time",
                    size: 200,
                },
                {
                    accessorKey: "course.ongoing",
                    header: "Status",
                    size: 50,
                    Cell: ({ cell }) => {
                        const status = upperCaseFirstLetter(cell.getValue());
                        return (
                            <GoalsBadge
                                title={status}
                                className={`${getStatusClass(status)} font-semibold`}
                            />
                        )
                    }
                },
                {
                    accessorKey: "course.id",
                    header: "Actions",
                    size: 50,
                    Cell: ({ cell }) => {
                        return (
                            <div className="flex items-center gap-[.8vw]">
                                {cell.row.original.course.ongoing != "selesai" && (
                                    <Link
                                        href={route("moderator.bimbingan.progress.edit", {
                                            progress: cell.getValue(),
                                        })}
                                    >
                                        <FiEdit2 className="text-[1.2vw] text-secondary" />
                                    </Link>
                                )}
                                <Link
                                    href={route("moderator.bimbingan.progress.show", {
                                        progress: cell.getValue(),
                                    })}
                                >
                                    <FiEye className="text-[1.2vw] text-neutral-60" />
                                </Link>
                            </div>
                        );
                    }
                }
            ]
        , [data]
    );

    const options = {
        // enableTopToolbar: false,
        // enableSorting: false,
        enableColumnActions: false,
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        muiTableHeadCellProps: {
            sx: {
                fontFamily: "Poppins",
                fontWeight: 600,
                backgroundColor: "#F8F8FC",
                // padding: 0,
                ">.Mui-TableHeadCell-Content": {
                    alignItems: "center",
                },
            },
        },
        // muiTableBodyCellProps: {
        //     sx: {
        //         textAlign: "center",
        //     },
        // },
    };

    return (
        <div>
            {createPortal(
                <GoalsPopup {...{ show, setShow }} className="!w-[90vw] min-h-[85vh]">
                    <GoalsDataTable
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </GoalsPopup>,
                document.body
            )}
        </div>
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
