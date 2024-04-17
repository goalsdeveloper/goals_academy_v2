import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/react";
import { useMemo } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import SubHeading from "../components/SubHeading";
import Dialog from "./AddOn/Dialog";
import { useState } from "react";
import GoalsButton from "@/Components/elements/GoalsButton";

export default function AddOn({ auth, data }) {
    const addons = data.data;
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
        price: "",
    });

    console.log(addons);

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nama",
                size: 200,
            },
            {
                accessorKey: "slug",
                header: "Slug",
                size: 200,
            },
            {
                accessorKey: "price",
                header: "Harga",
                size: 200,
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({ edit: true });
                                    setFormData({
                                        id: cell.row.original.id,
                                        name: cell.row.original.name,
                                        slug: cell.row.original.slug,
                                        price: cell.row.original.price,
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/addon/${cell.row.original.id}`}
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
            subtitle="Add-On"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Add-On">
                    <GoalsButton
                        size="sm"
                        onClick={() => {
                            setShowDialog({ create: true });
                            setFormData({
                                id: "",
                                name: "",
                                slug: "",
                                price: "",
                            });
                        }}
                        className="flex items-center gap-[.8vw]"
                    >
                        <FiPlus className="text-[1vw]" />
                        Add-On
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
                    }}
                />

                <GoalsDashboardTable
                    isHeadVisible
                    isPaginated
                    isSortable
                    columns={columns}
                    data={addons}
                />
            </div>
        </DashboardLayout>
    );
}
