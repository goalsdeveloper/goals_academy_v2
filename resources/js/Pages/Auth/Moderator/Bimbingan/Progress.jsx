import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import TransactionStatusBadge, {
    statusClassMap,
} from "../../User/RiwayatTransaksi/components/TransactionStatusBadge";
import GoalsBadge from "@/Components/elements/GoalsBadge";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { upperCaseFirstLetter } from "@/script/utils";

export default function Progress({ auth, data: recentOrder }) {
    const data = recentOrder.recent_order.data;

    const columns = useMemo(
        () => [
            // Cell: ({ renderedCellValue, row }) => (
            //     <Box
            //       sx={{
            //         display: 'flex',
            //         alignItems: 'center',
            //         gap: '1rem',
            //       }}
            //     >
            //       <img
            //         alt="avatar"
            //         height={30}
            //         src={row.original.avatar}
            //         loading="lazy"
            //         style={{ borderRadius: '50%' }}
            //       />
            //       {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            //       <span>{renderedCellValue}</span>
            //     </Box>
            //   ),
            {
                accessorKey: "user.name",
                header: "Username",
                Cell: ({ renderedCellValue }) => {
                    return (
                        <p className="text-[.8vw] font-semibold">
                            {renderedCellValue}
                        </p>
                    );
                },
            },
            {
                accessorKey: "products.category.name",
                header: "Product",
                Cell: ({ renderedCellValue }) => {
                    return (
                        <p className="text-[.8vw] font-semibold">
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

                    if (course?.date == null && course?.time == null)
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
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;

                    if (course?.is_tutor == null) return;
                    return (
                        <span className="w-full justify-center items-center">
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
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;

                    if (course?.is_user == null) return;
                    return (
                        <span className="w-full justify-center items-center">
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
                    if (cell.row.original.course?.ongoing == null) return;

                    const status = upperCaseFirstLetter(
                        cell.row.original.course?.ongoing
                    );

                    return (
                        <div>
                            <GoalsBadge
                                title={status}
                                className={`${statusClassMap[status]} font-semibold`}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    // const expandCol = useMemo(() => [
    //     {
    //         accessorKey: "course.child",
    //         header: "Detail",
    //         Cell: ({ cell }) => <strong>{cell.row.original.course.child[0]}</strong>
    //     }
    // ],[])

    const table = useMaterialReactTable({
        columns,
        data: data,
        enableColumnActions: false,
        enableTopToolbar: false,
        // enableRowActions: true,
        // positionActionsColumn: "last",
        positionExpandColumn: "last",
        paginateExpandedRows: false,
        enableExpanding: true,

        // getSubRows: (originalRow) => {
        //     if (
        //         originalRow.course &&
        //         originalRow.course.child &&
        //         originalRow.course.child.length > 0
        //     ) {
        //         return originalRow.course.child.map((item) => item);
        //     }
        // },
        muiTablePaperProps: {
            sx: {
                boxShadow: "none",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                flex: 1,
            },
        },

        muiTableProps: {
            sx: {
                bgcolor: "#F3F6FF",
                padding: "0",
            },
        },
        renderDetailPanel: ({ row }) => {
            const { course } = row.original;

            if (course && course.child && course.child.length > 0) {
                const firstSession = {
                    id: course.id,
                    date: course.date,
                    time: course.time,
                    ongoing: course.ongoing,
                    is_tutor: course.is_tutor,
                    is_user: course.is_user,
                    order_id: course.order_id,
                    session: course.session,
                };

                const isPushed = course.child.find((x) => x.id == course.id);

                !isPushed && course.child.unshift(firstSession);

                return (
                    <Table className="w-full grid bg-[#F3F6FF]">
                        <TableBody>
                            {course.child.map((item, index) => {
                                const status = upperCaseFirstLetter(
                                    item.ongoing
                                );
                                const cellData = {
                                    session: {
                                        label: (
                                            <p className="font-semibold">
                                                Sesi
                                            </p>
                                        ),
                                        value: (
                                            <p className="font-semibold">
                                                {item.session}
                                            </p>
                                        ),
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
                                        value: (
                                            <StatusIcon
                                                isTrue={item.is_tutor}
                                            />
                                        ),
                                    },
                                    is_user: {
                                        value: (
                                            <StatusIcon isTrue={item.is_user} />
                                        ),
                                    },
                                    ongoing: {
                                        value: (
                                            <GoalsBadge
                                                title={status}
                                                className={`${statusClassMap[status]} font-semibold`}
                                            />
                                        ),
                                    },
                                };

                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            marginLeft: "-1.2%",
                                            width: "102%",
                                            marginTop: "-1%",
                                            height: "110%"
                                        }}
                                    >
                                        {Object.entries(cellData).map(
                                            ([key, { label, value }]) => (
                                                <TableCell
                                                    key={key}
                                                    sx={{
                                                        flex: 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {label}&nbsp;{value}
                                                </TableCell>
                                            )
                                        )}
                                        <td className="w-[64px]"></td>
                                    </TableRow>
                                    // <GoalsDashboardTable data={data} columns={expandCol} />
                                );
                            })}
                        </TableBody>
                    </Table>
                );
            }
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

            {/* <ViewPopup show={isShow} setShow={() => setIsShow(!isShow)} /> */}
            <div className="space-y-[1.6vw]">
                <h2 className="font-medium">Progress</h2>
                <div className="text-[.8vw] bg-white border min-w-full rounded-[.8vw] p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </DashboardLayout>
    );
}

const StatusIcon = ({ isTrue }) => {
    return (
        <span className="w-full justify-center items-center">
            {isTrue ? (
                <i className="fa-regular fa-circle-check text-success-50 text-[1.2vw] flex-shrink-0"></i>
            ) : (
                <i className="fa-regular fa-circle-xmark text-danger-40 text-[1.2vw] flex-shrink-0"></i>
            )}
        </span>
    );
};

const DateTimeComp = ({ date, time }) => {
    if (date == null && time == null) return "-";
    return (
        <div className="flex w-full items-center justify-between gap-2">
            <p>{new Date(date).toLocaleDateString("id-ID")}</p>
            {/* {time} */}
            <p>{time ?? "-"}</p>
        </div>
    );
};

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
