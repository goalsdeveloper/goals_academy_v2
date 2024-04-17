import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import Dialog from "./Topic/Dialog";
import toast, { Toaster } from "react-hot-toast";

export default function Topic({ auth }) {
    const data = [
        { id: 1, name: "Topic 1", slug: "topic-1" },
        { id: 2, name: "Topic 2", slug: "topic-2" },
    ];

    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        delete: false,
        show: false,
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
        description: "N/A",
    });

    const callback = (method) => {
        router.visit(route('admin.bimbingan.topic.index'), {
            only: ['data'],
            onSuccess: () => {
                if (method == 'create') {
                    toast.success('Create Success!');
                } else if (method == 'edit') {
                    toast.success('Edit Success!');
                } else {
                    toast.success('Delete Success!');
                }
            }
        });
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Topik",
                size: 200,
            },
            {
                accessorKey: "slug",
                header: "Slug",
                size: 200,
            },
            {
                accessorKey: "id",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({ ...showDialog, edit: true });
                                    setFormData({
                                        ...formData,
                                        id: cell.row.original.id,
                                        name: cell.row.original.name,
                                        slug: cell.row.original.slug,
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/topic/${cell.getValue()}`}
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
            subtitle="Topic"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Topik">
                    <GoalsButton
                        className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                        onClick={() => {
                            setShowDialog({ create: true });
                            setFormData({
                                ...formData,
                                id: "",
                                name: "",
                                slug: "",
                            });
                        }}
                    >
                        <FiPlus className="text-[1vw]" />
                        Add Topic
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
                        callback,
                    }}
                />

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
