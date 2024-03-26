import GoalsAdminTable from "@/Components/elements/GoalsAdminTable";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useMemo } from "react";
import { productTableData as data } from "./Product/data";
import {
    FiCheckCircle,
    FiEdit2,
    FiEye,
    FiTrash2,
    FiPlus,
} from "react-icons/fi";
import { Link } from "@inertiajs/react";

export default function Product({ auth }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "gambar", //access nested data with dot notation
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
                accessorKey: "nama",
                header: "Nama",
            },
            {
                accessorKey: "visibilitas", //normal accessorKey
                header: "Visibilitas",

                Cell: ({ cell }) => (
                    <span>
                        <FiCheckCircle className="text-success-50 text-[1.2vw]" />
                    </span>
                ),
            },
            {
                accessorKey: "harga",
                header: "Harga",
            },
            {
                accessorKey: "action",
                header: "Action",

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <Link href="/admin/product/edit">
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/product/delete">
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/product/view">
                                <FiEye className="text-[1.2vw] text-neutral-60" />
                            </Link>
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
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading />
                {/* <GoalsAdminTable /> */}
                <GoalsDashboardTable
                    columns={columns}
                    data={data}
                    isDraggable
                    isSplitByCategory
                />
            </div>
        </DashboardLayout>
    );
    ``;
}

const SubHeading = () => {
    return (
        <div className="flex w-full justify-between items-center">
            <span className="text-[1.2vw] font-medium">Produk</span>
            <Link
                isLink
                href="/admin/bimbingan/product/add"
                className="flex items-center gap-[.5vw] bg-secondary hover:bg-primary text-white py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
            >
                <FiPlus className="text-[1vw]" />
                Tambah Produk
            </Link>
        </div>
    );
};

export const Breadcrumb = ({ level = 2 }) => {
    const pathArray = location.pathname.split("/");
    const pathArrayBr = pathArray.slice(-level);
    const sisaArr = pathArray.slice(0, pathArray.length - level);

    return (
        <div className="flex items-center font-medium text-neutral-50">
            {pathArrayBr.map((path, index) => {
                return (
                    <React.Fragment key={index}>
                        {index < pathArrayBr.length - 1 ? (
                            <Link
                                key={index}
                                className="flex items-center text-[1.25vw]"
                                href={sisaArr.join("/") + "/" + pathArrayBr[0]}
                            >
                                {path.charAt(0).toUpperCase() + path.slice(1)}
                                {index < pathArrayBr.length - 1 && (
                                    <span>
                                        <FiChevronRight />
                                    </span>
                                )}
                            </Link>
                        ) : (
                            <span className="flex items-center text-[1.25vw] text-black">
                                {path.charAt(0).toUpperCase() + path.slice(1)}
                                {index < pathArrayBr.length - 1 && (
                                    <FiChevronRight />
                                )}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
