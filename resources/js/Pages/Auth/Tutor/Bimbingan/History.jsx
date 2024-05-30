import { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { useMediaQuery } from "react-responsive";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../../Admin/components/SubHeading";
import { FiEye } from "react-icons/fi";
import moment from "moment";

export default function History ({ auth, history }) {
    // const [isLoading, setIsLoading] = useState(false);
    history = history.data;

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const columns = useMemo(
        () => [
            {
                accessorKey: "user.username",
                header: "Username",
                size: 150,
            },
            {
                accessorFn: (row) => row?.topic?.topic ?? "No Topic",
                header: "Topik",
                size: 100,
            },
            {
                accessorFn: (row) => moment(row.date+' '+row.time, 'DD/MM/YYYY HH:mm'),
                header: "Tanggal & Waktu Bimbingan",
                size: isMobile ? 250 : 170,
                Cell: ({ cell }) => {
                    return (
                        <div className="flex justify-between">
                            <span>{cell.row.original.date ?? ""}</span>
                            <span>{cell.row.original.time ?? ""}</span>
                        </div>
                    )
                }
            },
            {
                accessorFn: (row) => row?.place?.place ?? "No Place",
                header: "Lokasi",
                size: 100,
            },
            {
                accessorKey: "id",
                header: "Action",
                size: 10,
                Cell: ({ cell }) => {
                    return (
                        <ul className="flex gap-[3.2vw] md:gap-[.8vw] w-fit">
                            <li>
                                <Link method="GET" href={route('tutor.bimbingan.history.show', cell.getValue())}>
                                    <FiEye className="text-[4.8vw] md:text-[1.2vw] text-neutral-60" />
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
        <DashboardLayout title="Bimbingan" subtitle="History" role="tutor" auth={auth}>
            {/* {isLoading && <LoadingUI />} */}
            {!isMobile && <><SubHeading title="History" /><br /></>}
            <div className="text-[.8vw]">
                <GoalsDashboardTable
                    columns={columns}
                    data={history}
                    isHeadVisible
                    isSortable
                    isPaginated
                />
            </div>
        </DashboardLayout>
    )
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}></div>
    )
}

function LoadingUI () {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img src={logo} alt="Goals Academy" className="w-[6vw] h-[6vw] animate-bounce" />
        </div>
    )
}
