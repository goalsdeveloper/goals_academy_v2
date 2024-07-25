import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo } from "react";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiEye } from "react-icons/fi";
import { Link, router } from "@inertiajs/react";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import View from "./RecentOrder/View";
import moment from "moment";
import SubHeading from "../../Admin/components/SubHeading";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";

export default function RecentOrder({ auth, orders }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        orders;
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(route("moderator.bimbingan.order.index", { search: search }), {
            only: ["orders"],
        });
    };

    const [isShow, setIsShow] = useState(false);
    const [detailOrder, setDetailOrder] = useState({});

    const columns = useMemo(
        () => [
            {
                accessorKey: "order_code",
                header: "Order Code",
            },
            {
                accessorKey: "user.username",
                header: "Username",
            },
            {
                accessorKey: "products.name",
                header: "Product",
            },
            {
                accessorFn: (row) =>
                    moment(row.created_at).format("MMMM D, YYYY"),
                header: "Tanggal Pembelian",
            },
            {
                accessorFn: (row) => moment(row.created_at).format("HH:mm"),
                header: "Waktu Pembelian",
            },
            {
                accessorKey: "course.place.place",
                header: "Lokasi",
                Cell: ({ cell }) => (
                    <span className="text-[.8vw] px-[.8vw] py-[.3vw] font-bold text-danger-40 bg-danger-50 rounded-[.3vw] text-nowrap">
                        {cell.row.original.course?.place?.place ??
                            "Lokasi Belum Diset"}
                        {/* <FiCheckCircle className="text-success-50 text-[1.2vw]" /> */}
                    </span>
                ),
            },
            {
                accessorKey: "completeness_percentage",
                header: "Kelengkapan",

                Cell: ({ cell }) => (
                    <span className="text-[.8vw] px-[.8vw] py-[.3vw] font-bold text-danger-40 bg-danger-50 rounded-[.3vw]">
                        {cell.row.original.completeness_percentage}
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
                                        "moderator.bimbingan.order.edit",
                                        { order: cell.row.original.order_code }
                                    )}
                                >
                                    <FiEdit2 className="text-[1.2vw] text-secondary" />
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setIsShow(!isShow);
                                        setDetailOrder(cell.row.original);
                                    }}
                                >
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
            subtitle="Recent Order"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}

            <ViewPopup
                show={isShow}
                setShow={() => setIsShow(!isShow)}
                detailOrder={detailOrder}
            />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Recent Order" />
                <div className="text-[.8vw]">
                    <GoalsDashboardTable
                        columns={columns}
                        isHeadVisible
                        isSortable
                        isPaginated={false}
                        data={orders.data}
                        keyword={keyword}
                        setKeyword={setKeyword}
                        onSearch={(i) => {
                            onSearchCallback(i);
                        }}
                    />
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

const ViewPopup = ({ show, setShow, detailOrder }) => {
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => {
                    setShow(false);
                }}
            />
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed inset-0 mx-auto flex gap-[2vw] w-[76vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50  md:mt-[8vh]`}
            >
                <View {...{ detailOrder }} />
            </div>
        </>
    );
};
