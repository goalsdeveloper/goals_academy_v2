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
    console.log(orders);

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(route("admin.bimbingan.order.index", { search: search }), {
            only: ["orders"],
        });
    };

    // const approveCallback = () => {
    //     router.visit(route("admin.bimbingan.product.index"), {
    //         only: ["orders"],
    //     });
    // };
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
                Cell: ({ cell }) =>
                    cell.row.original.form_result.purchase_method.is_price
                        ? "Rp. " +
                          cell.row.original.form_result.purchase_method
                              .admin_fee
                        : cell.row.original.form_result.purchase_method
                              .admin_fee + "%",
            },
            {
                accessorKey: "form_result.discount",
                header: "Diskon",
            },
            {
                // accessorKey: "form_result.discount",
                header: "Estimasi Earnings",
                Cell: ({ cell }) =>
                    cell.row.original.unit_price -
                    cell.row.original.form_result.admin,
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
            title="Jasa Riset"
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