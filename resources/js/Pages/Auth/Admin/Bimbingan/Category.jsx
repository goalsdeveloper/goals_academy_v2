import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function Category({ auth }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "nama_kategori",
                header: "Nama Kategori",
                size: 200,
            },
            {
                accessorKey: "parent",
                header: "Parent",
                size: 200,
            },
            {
                accessorKey: "visibility",
                header: "Visibilitas",
                size: 200,
            },
            {
                accessorKey: "date",
                header: "Tangal Update",
                size: 200,
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <Link href="/admin/bimbingan/category/edit">
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/category/${cell.getValue()}`}
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );

    const data = [
        {
            id: 1,
            nama_kategori: "Dibimbing Tuntas Offline",
            parent: "Dibimbing Tuntas",
            Visibilitas: true,
            tanggal_update: "08/12/2024",
        },
    ];

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Category"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Kategori">
                    <Link
                        isLink
                        href="/admin/bimbingan/category/add"
                        className="flex items-center gap-[.5vw] bg-secondary hover:bg-primary text-white py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                    >
                        <FiPlus className="text-[1vw]" />
                        Tambah Kategori
                    </Link>
                </SubHeading>

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

export const SubHeading = ({ title, children }) => {
    return (
        <div className="flex w-full justify-between items-center">
            <span className="text-[1.2vw] font-medium">{title}</span>
            {children}
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
