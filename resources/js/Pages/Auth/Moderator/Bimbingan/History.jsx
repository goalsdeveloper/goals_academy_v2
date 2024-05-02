import { useState, useMemo } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEye } from "react-icons/fi";
import {
    BottomPaginationTable,
    DropdownDetailPanel,
    getTableStyling,
} from "./Progress";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

export default function History({ auth, data: orderHistory }) {
    const [isLoading, setIsLoading] = useState(false);
    const { data, from, to, total, pages, per_page, current_page } =
        orderHistory.order_history;

    const columns = useMemo(
        () => [
            {
                accessorKey: "user.name",
                header: "Username",
                Cell: ({ renderedCellValue }) => {
                    return (
                        <p className="text-[.8vw] font-medium">
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
                enableSorting: false,
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;

                    if (course?.is_tutor == null || course?.child.length > 1)
                        return;
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
                enableSorting: false,
                Cell: ({ cell }) => {
                    const course = cell.row.original.course;
                    if (course?.is_user == null || course?.child.length > 1) {
                        return;
                    } else
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
            //TODO need checking for multiple session only done when all session finished
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

    const table = useMaterialReactTable({
        columns,
        data: data,
        ...getTableStyling(),
        renderRowActions: ({ row }) => {
            const { course } = row.original;

            if (course?.child.length > 1)
                return (
                    <div className="text-nowrap">
                        <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                    </div>
                );
            return (
                <div className="flex items-center gap-[.8vw]">
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

            return <DropdownDetailPanel row={row} isActionDisabled/>;
        },
    });

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="History"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <h2 className="font-medium">History</h2>
                <div className="text-[.8vw] bg-white border min-w-full rounded-[.8vw] p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </DashboardLayout>
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
