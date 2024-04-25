import DashboardLayout from "@/Layouts/DashboardLayout";
import SubHeading from "../components/SubHeading";
import { Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { useMemo } from "react";

export default function Order({ auth, orders }) {
    orders = orders.data
    console.log(orders)
    const columns = useMemo(
        () => [
            {
                accessorKey: "order_code", //access nested data with dot notation
                header: "Id Pesanan",

                // Cell: ({ cell }) => {
                //     return (
                //         <img
                //             src={cell.row.original.gambar}
                //             alt="thumbnail-product"
                //             className="w-[3.6vw] h-[2.6vw] rounded-[.3vw]"
                //         />
                //     );
                // },
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
                    data={orders}
                />
            </div>
        </DashboardLayout>
    );
}
