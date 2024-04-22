import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import Dialog from "./User/Dialog";
import toast, { Toaster } from "react-hot-toast";

export default function User({ auth }) {
    const data = [
        { id: 1, name: "Hafiz Rizky 1", username: "hafizbaik", email: "hafizbaik@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: true },
        { id: 2, name: "Hafiz Rizky 2", username: "hafizganteng", email: "hafizganteng@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: false },
        { id: 3, name: "Hafiz Rizky 3", username: "hafizcute", email: "hafizcute@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: true },
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
        username: "",
        email: "",
        phone_number: "",
        university: "",
        major: "",
    });

    const callback = (method) => {
        router.visit(route('admin.bimbingan.user.index'), {
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
                header: "Nama",
                size: 100,
            },
            {
                accessorKey: "username",
                header: "Username",
                size: 100,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 100,
            },
            {
                accessorKey: "phone_number",
                header: "Telepon",
                size: 100,
            },
            {
                accessorKey: "university",
                header: "Universitas",
                size: 100,
            },
            {
                accessorKey: "id",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button>
                                <FiEye
                                    className="text-[1.2vw] text-gray-400"
                                    onClick={() => {
                                        setShowDialog({ ...showDialog, show: true });
                                        setFormData({
                                            ...formData,
                                            id: cell.row.original.id,
                                            name: cell.row.original.name,
                                            username: cell.row.original.username,
                                            email: cell.row.original.email,
                                            phone_number: cell.row.original.phone_number,
                                            university: cell.row.original.university,
                                            major: cell.row.original.major,
                                        });
                                    }}
                                />
                            </button>
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Manajemen User"
            subtitle="User"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="User"></SubHeading>

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
