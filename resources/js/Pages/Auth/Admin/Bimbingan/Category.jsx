import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

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

const data = [
    {
        id: 1,
        nama_kategori: "Dibimbing Tuntas Offline",
        parent: "Dibimbing Tuntas",
        Visibilitas: true,
        tanggal_update: "08/12/2024",
    },
];
