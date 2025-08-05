import { useMemo, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiPlus, FiEye } from "react-icons/fi";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import moment from "moment";
import Dialog from "./PromoCode/Dialog";
import toast, { Toaster } from "react-hot-toast";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";

export default function PromoCode({ auth, promo_code }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        promo_code;

    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("admin.bimbingan.promo-code.index", { search: search }),
            {
                preserveScroll: true,
                only: ["promo_code"],
            }
        );
    };
    const currency = Intl.NumberFormat("id-ID");

    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        delete: false,
        show: false,
    });

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
    } = useForm({
        id: "",
        promo_code: "",
        description: "",
        is_price_title: "",
        is_price: "0",
        value: 0,
        date_start: "",
        date_end: "",
    });

    const callback = (method) => {
        router.visit(route("admin.bimbingan.promo-code.index"), {
            only: ["promo_code"],
            onSuccess: () => {
                if (method == "create") {
                    toast.success("Create Success!");
                } else if (method == "edit") {
                    toast.success("Edit Success!");
                } else {
                    toast.success("Delete Success!");
                }
            },
        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "promo_code",
                header: "Kode Promo",
                size: 50,
            },
            // {
            //     accessorKey: "is_visible",
            //     header: "Visibilitas",
            //     size: 50,
            //     Cell: ({ cell }) => (
            //         <GoalsCupertinoButton
            //             className="text-[1vw] gap-[.4vw] cursor-pointer"
            //             label=""
            //             size="lg"
            //             isEnabled={cell.row.original.is_visible}
            //             setIsEnabled={() => {
            //                 router.put(
            //                     route(
            //                         "admin.bimbingan.promoCode.updateVisible",
            //                         { promoCode: cell.row.original.id }
            //                     ),
            //                     { is_visible: !cell.row.original.is_visible },
            //                     {
            //                         onSuccess: () => callback("edit"),
            //                     }
            //                 );
            //             }}
            //         />
            //     ),
            // },
            {
                accessorFn: (row) => {
                    if (Number(row.is_price)) {
                        return `IDR ${currency.format(row.value)}`;
                    }
                    return `${row.value}%`;
                },
                header: "Value",
                size: 100,
            },
            {
                accessorFn: (row) => {
                    return (
                        moment(row.date_start).format("DD/MM/YYYY") +
                        " - " +
                        moment(row.date_end).format("DD/MM/YYYY")
                    );
                },
                header: "Waktu Promo",
                size: 150,
            },
            {
                accessorFn: (row) =>
                    moment(row.created_at).format("DD/MM/YYYY"),
                header: "Tangal Dibuat",
                size: 100,
            },
            {
                accessorKey: "id",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button>
                                <FiEdit2
                                    className="text-[1.2vw] text-secondary"
                                    onClick={() => {
                                        setShowDialog({
                                            ...showDialog,
                                            edit: true,
                                        });
                                        setFormData({
                                            ...formData,
                                            id: cell.row.original.id,
                                            promo_code:
                                                cell.row.original.promo_code,
                                            description:
                                                cell.row.original.description,
                                            value: cell.row.original.value,
                                            is_price: cell.row.original.is_price,
                                            date_start:
                                                cell.row.original.date_start,
                                            date_end:
                                                cell.row.original.date_end,
                                        });
                                    }}
                                />
                            </button>
                        </li>
                        <li>
                            <button>
                                <FiEye
                                    className="text-[1.2vw] text-gray-400"
                                    onClick={() => {
                                        setShowDialog({
                                            ...showDialog,
                                            show: true,
                                        });
                                        setFormData({
                                            ...formData,
                                            id: cell.row.original.id,
                                            promo_code:
                                                cell.row.original.promo_code,
                                            description:
                                                cell.row.original.description,
                                            value: cell.row.original.value,
                                            is_price: cell.row.original.is_price,
                                            date_start:
                                                cell.row.original.date_start,
                                            date_end:
                                                cell.row.original.date_end,
                                        });
                                    }}
                                />
                            </button>
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Kode Promo"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Kode Promo">
                    <GoalsButton
                        className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                        onClick={() => {
                            setShowDialog({ ...showDialog, create: true });
                            setFormData({
                                ...formData,
                                id: "",
                                promo_code: "",
                                description: "",
                                is_price: 0,
                                value: 0,
                                date_start: "",
                                date_end: "",
                            });
                        }}
                    >
                        <FiPlus className="text-[1vw]" />
                        Tambah Kode Promo
                    </GoalsButton>
                </SubHeading>

                <Dialog
                    {...{
                        showDialog,
                        setShowDialog,
                        formData,
                        setFormData,
                        post,
                        put,
                        callback,
                    }}
                />

                <GoalsDashboardTable
                    columns={columns}
                    data={data}
                    isHeadVisible
                    isSortable
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
