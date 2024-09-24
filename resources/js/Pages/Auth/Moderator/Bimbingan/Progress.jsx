import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    getPaginationPages,
    updateSearchParams,
    upperCaseFirstLetter,
} from "@/script/utils";
import { Link, router, useForm } from "@inertiajs/react";
import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FiEdit2, FiEye, FiThumbsUp } from "react-icons/fi";
import { getStatusClass } from "../../User/RiwayatTransaksi/components/TransactionStatusBadge";
import SubHeading from "../../Admin/components/SubHeading";
import { useEffect } from "react";
import DateTimeComp from "./components/DateTimeComp";
import SelectInput from "@mui/material/Select/SelectInput";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useRef } from "react";
import moment from "moment";

export default function Progress({ auth, data: recentOrder }) {
    const timeoutRef = useRef(null);
    const { data, total, from, to, current_page, per_page, last_page, links } =
        recentOrder.recent_order;
    const searchParams = new URLSearchParams(window.location.search);
    const [keyword, setKeyword] = useState(searchParams.get("search") ?? "");

    const [isShow, setIsShow] = useState({
        duration: false,
        confirmation: false,
    });
    const [pages, setPages] = useState([]);
    const {
        data: payloadData,
        setData: setPayloadData,
        put,
    } = useForm({
        duration_per_meet: "",
        id: "",
    });

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const columns = useMemo(
        () => [
            // {
            //     accessorKey: "order_code",
            //     header: "Order Code",
            //     Cell: ({ renderedCellValue }) => {
            //         return (
            //             <p className="text-[.8vw] font-medium">
            //                 {renderedCellValue}
            //             </p>
            //         );
            //     },
            // },
            {
                accessorKey: "user.username",
                header: "Username Cust",
                Cell: ({ renderedCellValue }) => {
                    return (
                        <p className="text-[.8vw] font-medium">
                            {renderedCellValue}
                        </p>
                    );
                },
            },
            {
                accessorKey: "products.name",
                header: "Product",
                Cell: ({ renderedCellValue }) => {
                    return (
                        <p className="text-[.8vw] font-medium">
                            {renderedCellValue}
                        </p>
                    );
                },
            },
            {
                accessorKey: "date",
                header: "Tanggal & Waktu Bimbingan",
                Cell: ({ renderedCellValue, cell }) => {
                    const course = cell.row.original.course;

                    if ((course?.date == null && course?.time == null) || course.child.length > 0)
                        return "-";
                    return (
                        <div className="flex items-center justify-between text-[.8vw]">
                            <p>
                                {new Date(course.date).toLocaleDateString(
                                    "id-ID"
                                )}
                            </p>
                            {/* {course.time} */}
                            <p>{course.time ?? "-"}</p>
                        </div>
                    );
                },
            },
            {
                accessorKey: "is_tutor",
                header: "Tutor Confirm",
                enableSorting: false,
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;

                    if (course?.is_tutor == null || course?.child.length > 0)
                        return;
                    return (
                        <span className="items-center justify-center w-full">
                            {course.is_tutor == true ? (
                                <i className="fa-regular fa-circle-check text-success-50 text-[1.2vw]"></i>
                            ) : (
                                <i className="fa-regular fa-circle-xmark text-danger-40 text-[1.2vw]"></i>
                            )}
                        </span>
                    );
                },
            },
            {
                accessorKey: "is_user",
                header: "User Confirm",
                enableSorting: false,
                Cell: ({ cell }) => {
                    const course = cell.row.original?.course;
                    if (course?.is_user == null || course?.child.length > 0) {
                        return;
                    } else
                        return (
                            <span className="items-center justify-center w-full">
                                {course.is_user == true ? (
                                    <i className="fa-regular fa-circle-check text-success-50 text-[1.2vw]"></i>
                                ) : (
                                    <i className="fa-regular fa-circle-xmark text-danger-40 text-[1.2vw]"></i>
                                )}
                            </span>
                        );
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;
                    if (course?.ongoing == null) return;

                    // const status = upperCaseFirstLetter(course?.ongoing);

                    const status =
                        course?.child.find(
                            (x) => x.ongoing == "berjalan"
                        ) == null || course?.child.length < 1
                            ? upperCaseFirstLetter(
                                  course?.ongoing
                              )
                            : "Berjalan";

                    return (
                        <div className="pl-1">
                            <GoalsBadge
                                title={status}
                                className={`${getStatusClass(status)} font-semibold`}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: data,
        ...getTableStyling(),
        manualPagination: true,
        rowCount: per_page,
        renderRowActions: ({ row }) => {
            const { course } = row.original;
            const courseTime = moment(course.date + " " + course.time);
            const isPassed = moment().diff(courseTime, "s") > 0;

            if (course.child.length > 0) {
                // if (course.ongoing == "selesai") {
                //     return (
                //         <div className="text-nowrap">
                //             <button
                //                 onClick={() => {
                //                     if (course.ongoing == "selesai") {
                //                         setIsShow({ ...isShow, duration: true });
                //                         setPayloadData({ ...payloadData, id: course.id });
                //                     }
                //                 }}
                //             >
                //                 <FiThumbsUp className="text-[1.2vw] cursor-pointer text-secondary" />
                //             </button>
                //             &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                //         </div>
                //     );
                // } else {
                    return <div className="text-nowrap">
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </div>
                // }
            }

            return (
                <div className="flex items-center gap-[.8vw]">
                    <button
                        onClick={() => {
                            if (!course.is_moderator && (courseTime.isValid() && isPassed)) {
                                setIsShow({ ...isShow, duration: true });
                                setPayloadData({ ...payloadData, id: course.id });
                            }
                        }}
                    >
                        <FiThumbsUp className={"text-[1.2vw] " + (course.is_moderator ? `cursor-default text-success-50` : (courseTime.isValid() && isPassed ? `cursor-pointer text-secondary` : `cursor-default text-neutral-60`))} />
                    </button>
                    {courseTime.isValid() ? (
                        <Link
                            href={route("moderator.bimbingan.progress.edit", { progress: course.id })}
                        >
                            <FiEdit2 className={`text-[1.2vw] ${courseTime.isValid() ? 'text-secondary' : 'text-neutral-60'}`} />
                        </Link>
                    ) : (
                        <span>
                            <FiEdit2 className={`text-[1.2vw] ${courseTime.isValid() ? 'text-secondary' : 'text-neutral-60'}`} />
                        </span>
                    )}
                    <Link
                        href={route("moderator.bimbingan.progress.show", {
                            progress: course.id,
                        })}
                    >
                        <FiEye className="text-[1.2vw] text-neutral-60" />
                    </Link>
                </div>
            );
        },
        renderBottomToolbar: () => {
            return (
                <BottomPaginationTable
                    {...{
                        keyword,
                        from,
                        to,
                        total,
                        pages,
                        per_page,
                        current_page,
                    }}
                />
            );
        },
        renderDetailPanel: ({ row }) => {
            if (row.original.course?.child.length < 1) return;

            return (
                <DropdownDetailPanel
                    row={row}
                    isShow={isShow}
                    setIsShow={setIsShow}
                    setPayloadData={setPayloadData}
                    payloadData={payloadData}
                />
            );
        },
    });

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            {createPortal(
                <>
                    <DurationDialog
                        payloadData={payloadData}
                        setPayloadData={setPayloadData}
                        show={isShow.duration}
                        setShow={setIsShow}
                    />
                    <ConfirmationDialog
                        show={isShow.confirmation}
                        setShow={() =>
                            setIsShow({ ...isShow, confirmation: false })
                        }
                        payloadData={payloadData}
                        confirmHandler={() => {
                            router.put(
                                route(
                                    "moderator.bimbingan.progress.confirmBimbingan",
                                    { progress: payloadData.id }
                                ), {duration_per_meet : payloadData.duration_per_meet}
                            );
                            setPayloadData({ duration_per_meet: "", id: "" });
                        }}
                    />
                </>,
                document.body
            )}
            <div className="space-y-[1.6vw]">
                <SubHeading title="Progress" />
                <div className="text-[.8vw] bg-white border min-w-full rounded-[.8vw] p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                    <GoalsTextInput
                        placeholder="🔍 Search"
                        className="max-w-[10.4vw] max-h-[2.4vw]"
                        data={keyword}
                        setData={(e) => {
                            if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                            }
                            setKeyword(e);
                            timeoutRef.current = setTimeout(() => {
                                updateSearchParams("search", keyword);
                            }, 1000);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                updateSearchParams("search", keyword);
                            }
                        }}
                    />

                    <MaterialReactTable table={table} />
                </div>
            </div>
        </DashboardLayout>
    );
}

const StatusIcon = ({ isTrue }) => {
    return (
        <span className="items-center justify-center w-full">
            {isTrue ? (
                <i className="fa-regular fa-circle-check text-success-50 text-[1.2vw] flex-shrink-0"></i>
            ) : (
                <i className="fa-regular fa-circle-xmark text-danger-40 text-[1.2vw] flex-shrink-0"></i>
            )}
        </span>
    );
};

const DurationDialog = ({ show, setShow, payloadData, setPayloadData }) => {
    return (
        <div
            className={`${
                show ? "" : "opacity-0 pointer-events-none"
            } z-50 fixed w-full h-full top-0 overflow-auto bg-dark focus:bg-red-400 bg-opacity-50 transition-all duration-300`}
            onClick={() => setShow({ duration: false })}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    show
                        ? "md:top-0 bottom-0 scale-100"
                        : "md:top-full -bottom-full scale-0"
                } inset-0 mx-auto grid text-center gap-[1.6vw] w-[23vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.6vw] z-50 my-[8vh] `}
            >
                <h3>Durasi Bimbingan</h3>
                <p>
                    Harap masukkan durasi yang berjalan pada <br /> saat proses
                    bimbingan
                </p>

                <div className="flex gap-[1vw]">
                    <GoalsTextInput
                        placeholder="Masukkan durasi dalam menit"
                        grow
                        type="number"
                        data={payloadData.duration_per_meet}
                        setData={(e) => {
                            setPayloadData({
                                ...payloadData,
                                duration_per_meet: e,
                            });
                        }}
                    />
                    <GoalsButton
                        size="sm"
                        variant="success"
                        onClick={() => {
                            (e) => e.stopPropagation();
                            setShow({ duration: false, confirmation: true });
                        }}
                    >
                        Simpan
                    </GoalsButton>
                </div>
            </div>
        </div>
    );
};

const ConfirmationDialog = ({ show, setShow, payloadData, confirmHandler }) => {
    return (
        <div
            className={`${
                show ? "" : "opacity-0 pointer-events-none"
            } z-50 fixed w-full h-full top-0 overflow-auto bg-dark focus:bg-red-400 bg-opacity-50 transition-all duration-300`}
            onClick={() => setShow()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    show
                        ? "md:top-0 bottom-0 scale-100"
                        : "md:top-full -bottom-full scale-0"
                } inset-0 mx-auto grid text-center gap-[1.6vw] w-[23vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.6vw] z-50 my-[8vh] `}
            >
                <h3>Konfirmasi Bimbingan</h3>
                <p>
                    Apakah anda yakin untuk menyelesaikan <br /> dan
                    mengonfirmasi bimbingan?
                </p>

                <div className="flex gap-[1vw] w-full">
                    <GoalsButton
                        size="sm"
                        variant="info-bordered"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow();
                        }}
                        className="w-full"
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="info"
                        disabled={payloadData.duration_per_meet == ""}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow();
                            confirmHandler();
                        }}
                        className="w-full"
                    >
                        Konfirmasi
                    </GoalsButton>
                </div>
            </div>
        </div>
    );
};

export const DropdownDetailPanel = ({
    row,
    isShow,
    setIsShow,
    isActionDisabled = false,
    payloadData,
    setPayloadData,
}) => {
    const { course } = row.original;

    if (course && course.child && course.child.length > 0) {
        const firstSession = {
            id: course.id,
            date: course.date,
            time: course.time,
            ongoing: course.ongoing,
            is_tutor: course.is_tutor,
            is_moderator: course.is_moderator,
            is_user: course.is_user,
            order_id: course.order_id,
            session: course.session,
        };

        const isPushed = course.child.find((x) => x.id == course.id);

        !isPushed && course.child.unshift(firstSession);

        return (
            <Table>
                <TableBody>
                    {course.child.map((item, index) => {
                        const courseTime = moment(item.date + " " + item.time);
                        const isPassed = moment().diff(courseTime, "s") > 0;
                        const status = upperCaseFirstLetter(item.ongoing);
                        // const status = (item.is_moderator && item.is_tutor) ? "Selesai" : "Berjalan";
                        const cellData = {
                            session: {
                                label: (
                                    <p className="font-bold font-work-sans">
                                        Sesi
                                    </p>
                                ),
                                value: (
                                    <p className="font-semibold">
                                        {item.session}
                                    </p>
                                ),
                                note: "s",
                            },
                            sessions: {
                                value: "",
                            },
                            dateTime: {
                                value: (
                                    <DateTimeComp
                                        date={item.date}
                                        time={item.time}
                                    />
                                ),
                            },
                            is_tutor: {
                                value: <StatusIcon isTrue={item.is_tutor} />,
                            },
                            is_user: {
                                value: <StatusIcon isTrue={item.is_user} />,
                            },
                            ongoing: {
                                value: (
                                    <GoalsBadge
                                        title={status}
                                        className={`${getStatusClass(status)} font-semibold`}
                                    />
                                ),
                            },
                        };

                        return (
                            <TableRow
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {Object.entries(cellData).map(
                                    ([key, { label, value, note }]) => (
                                        <TableCell
                                            key={key}
                                            sx={{
                                                flex: 1,
                                                display: "flex",
                                                height: "3.2vw",
                                            }}
                                        >
                                            <div className="flex items-center gap-[.8vw] w-full">
                                                <span className="flex items-center w-full">
                                                    {label}&nbsp;{value}
                                                </span>

                                                {note && (
                                                    <span className="font-medium text-info-40 text-nowrap">
                                                        Need Action
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    )
                                )}
                                <td className="w-[9.8%] flex justify-center h-[3.2vw] border-b border-neutral-20">
                                    <div className="flex items-center justify-center gap-[.8vw] w-full">
                                        {isActionDisabled == false && (
                                            <>
                                                <button
                                                    disabled={status == "Selesai"}
                                                    onClick={() => {
                                                        if(!item.is_moderator && (courseTime.isValid() && isPassed)) {
                                                            setIsShow({...isShow, duration: true,});
                                                            setPayloadData({...payloadData, id: item.id,});
                                                        }
                                                    }}
                                                >
                                                    <FiThumbsUp className={"text-[1.2vw] " + (item.is_moderator ? `cursor-default text-success-50` : (courseTime.isValid() && isPassed ? `cursor-pointer text-secondary` : `cursor-default text-neutral-60`))} />
                                                </button>
                                                {courseTime.isValid() ? (
                                                    <Link
                                                        href={route(
                                                            "moderator.bimbingan.progress.edit",
                                                            { progress: item.id } 
                                                        )}
                                                    >
                                                        <FiEdit2 className={`text-[1.2vw] ${courseTime.isValid() ? 'text-secondary' : 'text-neutral-60'}`} />
                                                    </Link>
                                                ) : (
                                                    <span>
                                                        <FiEdit2 className={`text-[1.2vw] ${courseTime.isValid() ? 'text-secondary' : 'text-neutral-60'}`} />
                                                    </span>

                                                )}
                                            </>
                                        )}

                                        <Link
                                            href={route(
                                                "moderator.bimbingan.progress.show",
                                                { progress: item.id }
                                            )}
                                        >
                                            <FiEye className="text-[1.2vw] text-neutral-60" />
                                        </Link>
                                    </div>
                                </td>
                                <td className="w-[4.8%] flex justify-center h-[3.2vw] border-b border-neutral-20"></td>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
};

export const getTableStyling = () => {
    return {
        enableColumnActions: false,
        enableTopToolbar: false,
        enableRowActions: true,
        positionActionsColumn: "last",
        positionExpandColumn: "last",
        paginateExpandedRows: false,
        enableExpanding: true,
        muiTablePaperProps: {
            sx: {
                boxShadow: "none",
                borderRadius: ".4vw",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                flex: 1,
                color: "black",
                fontFamily: "inherit",
                height: "full",
                paddingTop: ".6vw",
                paddingBottom: ".6vw",
                borderColor: "#D9D9D9",
            },
        },
        muiDetailPanelProps: {
            sx: {
                padding: "0",
            },
        },

        muiTableHeadRowProps: {
            sx: {
                background: "#F8F8FC",
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontSize: ".8vw",
                fontWeight: "regular",
                gap: "1.6vw",
                fontFamily: "inherit",
                color: "black",
            },
        },
        muiTableProps: {
            sx: {
                bgcolor: "#F3F6FF",
                padding: "0",
            },
        },
    };
};
