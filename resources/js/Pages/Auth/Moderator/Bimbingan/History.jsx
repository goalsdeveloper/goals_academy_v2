import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getPaginationPages } from "@/script/utils";
import { Link } from "@inertiajs/react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";
import {
    BottomPaginationTable,
    getTableStyling
} from "./Progress";

export default function History({ auth, order_history: res }) {
    const [isLoading, setIsLoading] = useState(false);
    const { data, total, from, to, current_page, per_page, last_page, links } =
        res;
    const [pages, setPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState(
        new URLSearchParams(document.location.search).get("search") ?? ""
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "user.username",
                header: "Username Customer",
            },
            {
                accessorKey: "products.name",
                header: "Product",
            },
            {
                accessorKey: "created_at",
                header: "Tanggal Pembelian",
                Cell: ({ cell }) => {
                    return (
                        // <p>{cell.row.original.created_at}</p>
                        <p>
                            {moment(cell.row.original.created_at).format(
                                "MMMM D, YYYY"
                            )}
                        </p>
                    );
                },
            },
            {
                accessorKey: "course.time",
                header: "Waktu Pembelian",
                Cell: ({ cell }) => {
                    return (
                        <p>
                            {moment(cell.row.original.created_at).format(
                                "HH:mm"
                            )}
                        </p>
                    );
                },
            },
            {
                accessorFn: (row) =>
                    row.course.place?.place ?? "Lokasi Belum Diset",
                // accessorKey: "order.course.place",
                header: "Lokasi",
            },
            {
                accessorFn: (row) =>
                    row.course?.duration ?? "Durasi Belum Diset",
                // accessorKey: "order.course.duration",
                header: "Durasi",
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

            if (course?.child?.length > 1)
                return (
                    <div className="text-nowrap">
                        <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
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
                        searchQuery,
                    }}
                />
            );
        },
        renderDetailPanel: ({ row }) => {
            const { child } = row.original.course;

            if (child?.length < 1) return;

            return <div>s</div>;
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
                    <GoalsTextInput
                        placeholder="🔍 Search"
                        className="max-w-[10.4vw] max-h-[2.4vw]"
                        data={searchQuery}
                        setData={(e) => setSearchQuery(e)}
                    />

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
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-50">
            <img
                src={logo}
                alt="Goals Academy"
                className="w-[6vw] h-[6vw] animate-bounce"
            />
        </div>
    );
}
