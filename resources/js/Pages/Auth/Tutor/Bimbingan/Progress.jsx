import { useMemo } from "react";
import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../../Admin/components/SubHeading";
import { FiEye, FiEdit2, FiThumbsUp } from "react-icons/fi";
import moment from "moment";
import { getPaginationPages } from "@/script/utils";
import { useEffect } from "react";
import { useState } from "react";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";

export default function Progress({ auth, bimbingan }) {
    // const [isLoading, setIsLoading] = useState(false);
    const { data, total, from, to, current_page, per_page, last_page, links } =
        bimbingan;
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("tutor.bimbingan.progress.index", { search: search }),
            {
                only: ["bimbingan"],
            }
        );
    };

    const approveCallback = () => {
        router.visit(route("tutor.bimbingan.progress.index"), {
            only: ["bimbingan"],
        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "user.username",
                header: "Username",
                size: 150,
            },
            {
                accessorKey: "topic.topic",
                header: "Topik",
                size: 100,
            },
            {
                accessorFn: (row) => moment(row.date + " " + row.time),
                header: "Tanggal & Waktu Bimbingan",
                size: 170,
                Cell: ({ cell }) => {
                    return (
                        <div className="flex justify-between">
                            <span>{cell.getValue().format("DD/MM/YYYY")}</span>
                            <span>{cell.getValue().format("HH:mm")}</span>
                        </div>
                    );
                },
            },
            {
                accessorFn: (row) => moment(row.date + " " + row.time),
                header: "Status",
                size: 150,
                Cell: ({ cell }) => {
                    if (moment().diff(cell.getValue(), "s") > 0) {
                        return !cell.row.original.is_moderator ? (
                            <div className="text-[.9vw] text-center">
                                <span className="bg-green-100 text-green-500 rounded">
                                    Menunggu Konfirmasi
                                </span>
                            </div>
                        ) : (
                            <div className="text-[.9vw] text-center">
                                <span className="bg-yellow-100 text-yellow-500 py-[.2vw] px-[1vw] rounded">
                                    On Progress
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div className="text-[.9vw] text-center text-blue-500">
                                Upcoming
                            </div>
                        );
                    }
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
                                <Link
                                    method="PATCH"
                                    href={route(
                                        "tutor.bimbingan.tutor.tutorApprove",
                                        cell.row.original.id
                                    )}
                                    onSuccess={approveCallback}
                                    disabled={
                                        cell.row.original.is_tutor ||
                                        moment().diff(
                                            cell.row.original.date,
                                            "s"
                                        ) < 0 ||
                                        cell.row.original.date == null
                                    }
                                    as="button"
                                >
                                    <FiThumbsUp
                                        className={
                                            "text-[1.2vw] " +
                                            (cell.row.original.is_tutor
                                                ? "text-success"
                                                : "text-secondary")
                                        }
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    method="GET"
                                    href={route(
                                        "tutor.bimbingan.progress.edit",
                                        cell.row.original.id
                                    )}
                                >
                                    <FiEdit2 className="text-[1.2vw] text-secondary" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    method="GET"
                                    href={route(
                                        "tutor.bimbingan.progress.show",
                                        cell.row.original.id
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
            subtitle="Progress"
            role="tutor"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <SubHeading title="Progress" />
            <br />
            <div className="text-[.8vw]">
                <GoalsDashboardTable
                    columns={columns}
                    data={data}
                    isHeadVisible
                    isSortable
                    isPaginated
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={(i) => {
                        onSearchCallback(i);
                    }}
                />
                <div>
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
