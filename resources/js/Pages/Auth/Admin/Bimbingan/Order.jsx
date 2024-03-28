import DashboardLayout from "@/Layouts/DashboardLayout";
import { SubHeading } from "./Product";
import { Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { useMemo } from "react";

export default function Order({ auth }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "order_id", //access nested data with dot notation
                header: "Id Pesanan",

                Cell: ({ cell }) => {
                    return (
                        <img
                            src={cell.row.original.gambar}
                            alt="thumbnail-product"
                            className="w-[3.6vw] h-[2.6vw] rounded-[.3vw]"
                        />
                    );
                },
            },
            {
                accessorKey: "name",
                header: "Nama Pembeli",
            },
            {
                accessorKey: "product",
                header: "Produk",
            },
            {
                accessorKey: "payment_method",
                header: "Pembayaran",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                accessorKey: "order_date",
                header: "Tanggal Pesanan",
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Order"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Order" />

                <GoalsDashboardTable
                    isHeadVisible
                    isPaginated
                    isSortable
                    columns={columns}
                    data={data}
                />
            </div>
        </DashboardLayout>
    );
}

const data = [
    {
        id: 1,
        order_id: "12345",
        name: "John Doe",
        product: "Product A",
        payment_method: "Credit Card",
        status: "Pending",
        order_date: "2022-01-01",
    },
];
