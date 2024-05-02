import { useState, useMemo } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEye } from "react-icons/fi";
import moment from "moment";


export default function History({ auth, order_history }) {
    order_history = order_history.data
    console.log(order_history)
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
                accessorKey: "order.user.name",
                header: "Username Customer",
            },
            {
                accessorKey: "order.products.name",
                header: "Product",
            },
            {
                accessorKey: "order.created_at",
                header: "Tanggal Pembelian",
                Cell: ({ cell }) => {
                    return (
                        // <p>{cell.row.original.created_at}</p>
                        <p>{moment(cell.row.original.created_at).format('MMMM d, YYYY')}</p>
                    );
                },
            },
            {
                accessorKey: "order.course.time",
                header: "Waktu Pembelian",
                Cell: ({ cell }) => {
                    return (
                        <p>{moment(cell.row.original.created_at).format('HH:mm')}</p>
                    );
                },
            },
            {
                accessorFn: (row) => row.order.course?.place ?? 'Lokasi Belum Diset',
                // accessorKey: "order.course.place",
                header: "Lokasi",
            },
            {
                accessorFn: (row) => row.order.course?.duration ?? 'Durasi Belum Diset',
                // accessorKey: "order.course.duration",
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
                        data={order_history}
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
