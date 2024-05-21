import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getPaginationPages, updateSearchParams } from "@/script/utils";
import { Link, router } from "@inertiajs/react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";
import { getTableStyling } from "./Progress";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import DateTimeComp from "./components/DateTimeComp";
import SubHeading from "../../Admin/components/SubHeading";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";

export default function History({ auth, order_history: res }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        res;
    const [pages, setPages] = useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    const [keyword, setKeyword] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const columns = useMemo(
        () => [
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
                Cell: ({ cell }) => {
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
                accessorFn: (row) =>
                    row.course?.place.place ?? "Lokasi Belum Diset",
                header: "Lokasi",
            },
            {
                accessorFn: (row) =>
                    row.course?.duration_per_meet ?? "Durasi Belum Diset",
                header: "Durasi",
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

            if (course?.child?.length > 1)
                return (
                    <div className="text-nowrap">
                        <span>&emsp;&emsp;&emsp;</span>
                    </div>
                );
            return (
                <div className="flex items-center gap-[.8vw]">
                    <Link
                        href={route("moderator.bimbingan.history.show", {
                            history: course.id,
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
                        keyword,
                    }}
                />
            );
        },
        renderDetailPanel: ({ row }) => {
            const { child } = row.original.course;

            if (child?.length < 1) return;

            return <HistoryDetailPanel row={row} />;
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
            <div className="space-y-[1.6vw] ">
                <SubHeading title="History" />
                <div className="text-[.8vw] bg-white border min-w-full rounded-[.8vw] p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                    <GoalsTextInput
                        placeholder="🔍 Search"
                        className="max-w-[10.4vw] max-h-[2.4vw]"
                        data={keyword}
                        setData={(e) => setKeyword(e)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                updateSearchParams("search", keyword)
                            }
                        }}
                    />

                    <MaterialReactTable table={table} />
                </div>
            </div>
        </DashboardLayout>
    );
}

function HistoryDetailPanel({ row }) {
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
            <Table>
                <TableBody>
                    {course.child.map((item, index) => {
                        console.log(item);
                        const cellData = {
                            session: {
                                label: (
                                    <p className="font-bold font-work-sans">
                                        Sesi&nbsp;
                                    </p>
                                ),
                                value: (
                                    <p className="font-semibold">
                                        {item.session}
                                    </p>
                                ),
                            },
                            products: {
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
                            location: {
                                value: (
                                    <p className="">
                                        {item.location ?? "Lokasi Belum Diset"}
                                    </p>
                                ),
                            },
                            duration: {
                                value: (
                                    <p className="">
                                        {item.duration_per_meet ??
                                            "Durasi Belum Diset"}
                                    </p>
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
                                    ([key, { label, value }]) => (
                                        <TableCell
                                            key={key}
                                            sx={{
                                                flex: 1,
                                                display: "flex",
                                                height: "3.2vw",
                                                width: "auto",
                                            }}
                                        >
                                            <div className="flex items-center gap-[.8vw] w-full">
                                                <span className="flex items-center w-full">
                                                    {label}
                                                    {value}
                                                </span>
                                            </div>
                                        </TableCell>
                                    )
                                )}
                                <td className="w-[7.22%] flex justify-center h-[3.2vw] border-b border-neutral-20">
                                    <div className="flex items-center p-[.6vw] gap-[.8vw] w-full">
                                        <Link
                                            href={route(
                                                "moderator.bimbingan.history.show",
                                                { history: item.id }
                                            )}
                                        >
                                            <FiEye className="text-[1.2vw] text-neutral-60" />
                                        </Link>
                                    </div>
                                </td>
                                <td className="w-[5.85%] flex justify-center h-[3.2vw] border-b border-neutral-20"></td>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}
