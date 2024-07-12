import { useMemo } from "react";
import { createPortal } from "react-dom";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GoalsDataTable from "@/Components/elements/GoalsDataTable";
import moment from "moment";
import "@/script/momentCustomLocale";

const ShowSchedule = ({
    show,
    setShow,
    dataSchedule,
    dateRange,
    handleDateChange,
}) => {
    // const data = [
    //     {
    //         "2024-01-01": [
    //             {
    //                 time: "13:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //             {
    //                 time: "15:00",
    //                 duration: 90,
    //                 products: "Dibimbing Offline 90 Menit",
    //             },
    //         ],
    //         "2024-01-02": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //         "2024-01-03": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //         "2024-01-04": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //         "2024-01-05": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //         "2024-01-06": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //         "2024-01-07": [
    //             {
    //                 time: "08:00",
    //                 duration: 60,
    //                 products: "Dibimbing Online 60 Menit",
    //             },
    //         ],
    //     },
    // ];

    const columns = useMemo(
        () =>
            Object.keys(dataSchedule[0]).map((i) => ({
                accessorKey: i,
                header: moment(i).format("dddd, DD MMMM"),
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <div>
                            {cell.getValue().map((item, index) => {
                                if (index.length == 0) {
                                    return;
                                } else {
                                    const startTime = moment(
                                        item.time,
                                        "HH:mm"
                                    );
                                    const endTime = moment(
                                        item.time,
                                        "HH:mm"
                                    ).add(item.products.duration, "m");
                                    return (
                                        <div className="text-center font-semibold px-[1vw] py-[1.2vw] space-y-[.5vw]">
                                            <span>
                                                {startTime.format("HH:mm")} -{" "}
                                                {endTime.format("HH:mm")}
                                            </span>
                                            <p className="text-blue-500">
                                                {item.products.name}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                },
            })),
        [dataSchedule, dateRange]
    );

    const options = {
        enableTopToolbar: false,
        enableColumnActions: false,
        enableSorting: false,
        muiTableBodyCellProps: {
            sx: {
                padding: 0,
            },
        },
    };

    return (
        <div>
            {createPortal(
                <GoalsPopup {...{ show, setShow }} className="min-w-[80vw] max-h-[85vh] overflow-auto scrollbar-hidden">
                    <div className="space-y-[1.67vw] w-full">
                        <h2 className="text-[1.25vw] text-center">
                            Tutor Schedule
                        </h2>
                        <div>
                            <div className="w-full bg-dark-indigo text-white flex justify-between items-center p-[1vw] rounded-t-[.5vw]">
                                <button
                                    onClick={() => {
                                        const start_date = moment(
                                            dateRange.start_date
                                        )
                                            .subtract(6, "days")
                                            .format("YYYY-MM-DD");
                                        const end_date = moment(
                                            dateRange.end_date
                                        )
                                            .subtract(6, "days")
                                            .format("YYYY-MM-DD");
                                        handleDateChange(start_date, end_date);
                                    }}
                                >
                                    <FiChevronLeft className="text-[1.5vw]" />
                                </button>
                                <p>
                                    {moment(dateRange.start_date).format(
                                        "D MMMM YYYY"
                                    )}{" "}
                                    -{" "}
                                    {moment(dateRange.end_date).format(
                                        "D MMMM YYYY"
                                    )}
                                </p>
                                <button
                                    onClick={() => {
                                        const start_date = moment(
                                            dateRange.start_date
                                        )
                                            .add(6, "days")
                                            .format("YYYY-MM-DD");
                                        const end_date = moment(
                                            dateRange.end_date
                                        )
                                            .add(6, "days")
                                            .format("YYYY-MM-DD");
                                        handleDateChange(start_date, end_date);
                                    }}
                                >
                                    <FiChevronRight className="text-[1.5vw]" />
                                </button>
                            </div>
                            <GoalsDataTable
                                data={dataSchedule}
                                columns={columns}
                                options={options}
                            />
                        </div>
                    </div>
                </GoalsPopup>,
                document.body
            )}
        </div>
    );
};

export default ShowSchedule;
