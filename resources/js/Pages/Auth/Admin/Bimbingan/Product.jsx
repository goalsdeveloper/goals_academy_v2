import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import { useMemo } from "react";
import {
    FiCheckCircle,
    FiEdit2,
    FiEye,
    FiPlus,
    FiTrash2
} from "react-icons/fi";
import SubHeading from "../components/Subheading";

export default function Product({ auth, bimbingan_tuntas }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "product_image",
                header: "Gambar",

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
                header: "Nama",
            },
            {
                accessorKey: "is_visible",
                header: "Visibilitas",

                Cell: ({ cell }) => (
                    <span>
                        <FiCheckCircle className="text-success-50 text-[1.2vw]" />
                    </span>
                ),
            },
            {
                accessorKey: "price",
                header: "Harga",
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
                                        "admin.bimbingan.product.edit",
                                        { product: cell.row.original }
                                    )}
                                >
                                    <FiEdit2 className="text-[1.2vw] text-secondary" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    method="DELETE"
                                    href={route(
                                        "admin.bimbingan.product.destroy",
                                        { product: cell.row.original }
                                    )}
                                >
                                    <FiTrash2 className="text-[1.2vw] text-danger-40" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    method="GET"
                                    href={route(
                                        "admin.bimbingan.product.show",
                                        { product: cell.row.original }
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
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Produk">
                    <GoalsButton
                        isLink
                        method="GET"
                        size="sm"
                        href={route("admin.bimbingan.product.create")}
                        className="flex items-center gap-[.5vw]"
                    >
                        <FiPlus className="text-[1vw]" />
                        Tambah Produk
                    </GoalsButton>
                </SubHeading>
                {/* <GoalsAdminTable /> */}
                <GoalsDashboardTable
                    columns={columns}
                    data={bimbingan_tuntas}
                    isDraggable
                />
            </div>
        </DashboardLayout>
    );
}
