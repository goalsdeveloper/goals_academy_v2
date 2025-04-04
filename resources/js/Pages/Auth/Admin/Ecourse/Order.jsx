import DashboardLayout from "@/Layouts/DashboardLayout";
import SubHeading from "../components/SubHeading";
import { Link, router } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { useMemo } from "react";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useState } from "react";
import { getPaginationPages } from "@/script/utils";
import { useEffect } from "react";

export default function Order({ auth, orders }) {
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
        router.visit(
            route("admin.ecourse.order.index", { search: search }),
            {
                only: ["orders"],
            }
        );
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "order_code", //access nested data with dot notation
                header: "Id Pesanan",
            },
            {
                accessorKey: "user.name",
                header: "Nama Pembeli",
            },
            {
                accessorKey: "user.email",
                header: "Email",
                Cell: ({ cell }) => {
                    return (
                        <a
                            href={`mailto:${cell.row.original.user.email}`}
                            className="text-blue-500"
                        >
                            {cell.row.original.user.email}
                        </a>
                    );
                }
            },
            {
                accessorKey: "user.profile.phone_number",
                header: "Telepon",
                Cell: ({ cell }) => {
                    return (
                        <a
                            href={`https://wa.me/62${cell.row.original.user.profile.phone_number.slice(1)}`}
                            target="_blank"
                            className="text-blue-500"
                        >
                            {cell.row.original.user.profile.phone_number}
                        </a>
                    );
                }
            },
            {
                accessorKey: "products.name",
                header: "Produk",
            },
            {
                accessorKey: "payment_method.name",
                header: "Pembayaran",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                // accessorKey: "form_result.admin",
                header: "Estimasi Admin",
                Cell: ({ cell }) => cell.row.original.form_result.purchase_method.is_price ? cell.row.original.form_result.purchase_method.admin_fee + '%' : 'Rp. ' + cell.row.original.form_result.purchase_method.admin_fee,
            },
            {
                accessorKey: "form_result.discount",
                header: "Diskon",
                Cell: ({ cell }) => {
                    if (cell.row.original.form_result.discount == null) {
                        return "Rp.0";
                    } else {
                        return "Rp." +
                        currency.format(cell.row.original.form_result.discount);
                    }
                }
            },
            {
                // accessorKey: "form_result.discount",
                header: "Estimasi Earnings",
                Cell: ({ cell }) => cell.row.original.unit_price - cell.row.original.form_result.admin,
            },
            {
                // accessorKey: "form_result.discount",
                header: "Harga Total",
                Cell: ({ cell }) => cell.row.original.unit_price,
            },
            {
                accessorKey: "updated_at",
                header: "Tanggal Pesanan",
                Cell: ({ cell }) => formatDate(cell.row.original.created_at),
            },
        ],
        []
    );
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;
    };

    return (
        <DashboardLayout
            title="E-Course"
            subtitle="Order"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Order" />

                <GoalsDashboardTable
                    isHeadVisible
                    isSortable
                    columns={columns}
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
        </DashboardLayout>
    );
}
