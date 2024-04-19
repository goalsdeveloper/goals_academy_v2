import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo } from "react";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiEye } from "react-icons/fi";
import { Link } from "@inertiajs/react";

export default function RecentOrder({ auth, recent_order }) {
    // const [isLoading, setIsLoading] = useState(false);

    // console.log(recent_order);

    const data = [
        {
            id: 1,
            username: "Hafiz",
            product: "Dibimbing Sekali",
            date: "08/12/2024",
            time: "23:59",
            lokasi: "Offline - Nakoa",
            kelengkapan: "50%",
        },
    ];

    const columns = useMemo(
        () => [
            {
                accessorKey: "username",
                header: "Username",
            },
            {
                accessorKey: "product",
                header: "Product",
            },
            {
                accessorKey: "date",
                header: "Tanggal Pembelian",
            },
            {
                accessorKey: "time",
                header: "Waktu Pembelian",
            },
            {
                accessorKey: "lokasi",
                header: "Lokasi",
            },
            {
                accessorKey: "kelengkapan",
                header: "Kelengkapan",

                Cell: ({ cell }) => (
                    <span className="text-[.8vw] px-[.8vw] py-[.3vw] font-bold text-danger-40 bg-danger-50 rounded-[.3vw]">
                        {cell.row.original.kelengkapan}
                        {/* <FiCheckCircle className="text-success-50 text-[1.2vw]" /> */}
                    </span>
                ),
            },
            {
                header: "Action",

                Cell: ({ cell }) => {
                    return (
                        <ul className="flex gap-[.8vw] w-fit">
                            <li>
                                <Link
                                    method="GET"
                                    href={route(
                                        "admin.bimbingan.product.edit",
                                        { product: cell.row.original }
                                    )}
                                >
                                    <FiEdit2 className="text-[1.2vw] text-secondary" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    method="GET"
                                    href={route(
                                        "admin.bimbingan.product.show",
                                        { product: cell.row.original }
                                    )}
                                >
                                    <FiEye className="text-[1.2vw] text-neutral-60" />
                                </Link>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Recent Order"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}

            <h2>Recent Order</h2>
            <div className="text-[.8vw]">
                <GoalsDashboardTable
                    columns={columns}
                    data={data}
                    isHeadVisible
                    isSortable
                    isPaginated
                />
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
