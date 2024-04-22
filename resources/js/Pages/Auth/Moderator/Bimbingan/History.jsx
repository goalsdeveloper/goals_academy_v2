import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo } from "react";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEye } from "react-icons/fi";

export default function History({ auth }) {
    const [isLoading, setIsLoading] = useState(false);

    const data = [
        {
            id: 1,
            username: "Hafiz",
            product: "Dibimbing Sekali",
            date: "08/12/2024",
            time: "23:59",
            lokasi: "Offline - Nakoa",
            durasi: "1 Jam",
        },
    ];

    const columns = useMemo(
        () => [
            {
                accessorKey: "username",
                header: "Username Customer",
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
                accessorKey: "durasi",
                header: "Durasi",
            },
            {
                header: "Action",

                Cell: ({ cell }) => {
                    return (
                        <ul className="flex gap-[.8vw] w-fit">
                            <li>
                                <button onClick={() => setIsShow(!isShow)}>
                                    <FiEye className="text-[1.2vw] text-neutral-60" />
                                </button>
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
            subtitle="History"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <h2 className="font-medium">History</h2>
                <div className="text-[.8vw]">
                    <GoalsDashboardTable
                        columns={columns}
                        data={data}
                        isHeadVisible
                        isSortable
                        isPaginated
                    />
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
