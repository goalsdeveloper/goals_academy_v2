import { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import SubHeading from "../components/SubHeading";
import Dialog from "./Category/Dialog";
import moment from "moment";

export default function Category({ auth, data }) {
    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        delete: false,
    });
    const {
        data: formData,
        setData: setFormData,
        post,
        put,
    } = useForm({
        id: "",
        name: "",
        slug: "",
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nama Kategori",
                size: 200,
            },
            {
                accessorKey: "is_visible",
                header: "Visibilitas",
                size: 200,
            },
            // {
            //     accessorFn: (row) => moment(row.updated_at).format('DD/MM/YYYY'),
            //     header: "Tangal Update",
            //     size: 200,
            // },
            {
                accessorKey: "id",
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

    const categories = data.data;

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

                <Dialog
                    {...{
                        showDialog,
                        setShowDialog,
                        formData,
                        setFormData,
                        post,
                        put,
                    }}
                />

                <GoalsDashboardTable
                    isHeadVisible
                    isPaginated
                    isSortable
                    columns={columns}
                    data={categories}
                />
            </div>
        </DashboardLayout>
    );
}
