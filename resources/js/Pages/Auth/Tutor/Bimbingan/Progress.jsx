import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../../Admin/components/SubHeading";
import { FiEye, FiEdit2 } from "react-icons/fi";
import moment from "moment";

export default function Progress ({ auth }) {
    // const [isLoading, setIsLoading] = useState(false);

    const data = [
        {
            id: 1,
            username: "Hafiz",
            topic: "Perancangan Bab 1-3",
            date: "08/12/2024",
            time: "20:59",
            location: "Offline - Nakoa",
        },
        {
            id: 2,
            username: "Hafiz",
            topic: "Perancangan Bab 4",
            date: "10/12/2024",
            time: "21:59",
            location: "Offline - Nakoa",
        },
        {
            id: 3,
            username: "Hafiz",
            topic: "Perancangan Bab 5",
            date: "16/12/2024",
            time: "18:59",
            location: "Offline - Nakoa",
        },
        {
            id: 4,
            username: "Afan",
            topic: "Perancangan Bab 5",
            date: "24/04/2024",
            time: "18:00",
            location: "Offline - Nakoa",
        },
    ];

    const columns = useMemo(
        () => [
            {
                accessorKey: "username",
                header: "Username",
                size: 150,
            },
            {
                accessorKey: "topic",
                header: "Topik",
                size: 100,
            },
            {
                accessorFn: (row) => moment(row.date+' '+row.time, 'DD/MM/YYYY HH:mm'),
                header: "Tanggal & Waktu Bimbingan",
                size: 170,
                Cell: ({ cell }) => {
                    return (
                        <div className="flex justify-between">
                            <span>{cell.row.original.date}</span>
                            <span>{cell.row.original.time}</span>
                        </div>
                    )
                }
            },
            {
                accessorFn: (row) => moment(row.date+' '+row.time, 'DD/MM/YYYY HH:mm'),
                header: "Status",
                size: 100,
                Cell: ({ cell }) => {
                    return moment().diff(cell.getValue(), 's') > 0 ?
                        <div className="text-[.9vw] text-center"><span className="bg-yellow-100 text-yellow-500 py-[.2vw] px-[1vw] rounded">On Progress</span></div> :
                        <div className="text-[.9vw] text-center text-blue-500">Upcoming</div>
                },
            },
            {
                accessorKey: "id",
                header: "Action",
                size: 10,
                Cell: ({ cell }) => {
                    return (
                            <ul className="flex gap-[.8vw] w-fit">
                                <li>
                                <Link method="GET" href={route('tutor.bimbingan.progress.edit', 112)} >
                                    <FiEdit2 className="text-[1.2vw] text-secondary" />
                                </Link>
                            </li>
                            <li>
                                <Link method="GET" href={route('tutor.bimbingan.progress.show', 112)}>
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
        <DashboardLayout title="Bimbingan" subtitle="Progress" role="tutor" auth={auth}>
            {/* {isLoading && <LoadingUI />} */}
            <SubHeading title="Progress" /><br />
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
