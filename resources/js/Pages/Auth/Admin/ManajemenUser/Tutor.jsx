import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import Dialog from "./Tutor/Dialog";
import toast, { Toaster } from "react-hot-toast";

export default function Tutor({ auth, data }) {
    console.log(data);
    // const data = [
    //     { id: 1, name: "Hafiz Rizky 1", username: "hafizbaik", email: "hafizbaik@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: true },
    //     { id: 2, name: "Hafiz Rizky 2", username: "hafizganteng", email: "hafizganteng@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: false },
    //     { id: 3, name: "Hafiz Rizky 3", username: "hafizcute", email: "hafizcute@gmail.com", phone_number: "085123456789", university: "Universitas Brawijaya", major: "Sistem Informasi", status: true },
    // ];

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
        router.visit(route("admin.bimbingan.tutor.index"), {
            only: ["data"],
            onSuccess: () => {
                if (method == "create") {
                    toast.success("Create Success!");
                } else if (method == "edit") {
                    toast.success("Edit Success!");
                } else {
                    toast.success("Delete Success!");
                }
            },
        });
    };

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
                accessorKey: "profile.phone_number",
                header: "Telepon",
                size: 100,
            },
            {
                accessorKey: "profile.university",
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
                            <Link
                                method="GET"
                                href={route(
                                    "admin.manajemen_user.tutor.edit",
                                    cell.row.original.id
                                )}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                method="GET"
                                href={route(
                                    "admin.manajemen_user.tutor.show",
                                    cell.row.original.id
                                )}
                            >
                                <FiEye className="text-[1.2vw] text-gray-400" />
                            </Link>
                        </li>
                        <li>
                            <GoalsCupertinoButton
                                className="text-[1vw]"
                                enabledClassName="bg-blue-600"
                                label=""
                                size="sm"
                                isEnabled={cell.row.original.status}
                                setIsEnabled={(i) => {
                                    // Update status tutor dengan menggunakan route
                                }}
                            />
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
            subtitle="Tutor"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Tutor">
                    <GoalsButton
                        className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                        onClick={() => {
                            setShowDialog({ create: true });
                            setFormData({
                                ...formData,
                                id: "",
                                name: "",
                                username: "",
                                email: "",
                                phone_number: "",
                                university: "",
                                major: "",
                            });
                        }}
                    >
                        <FiPlus className="text-[1vw]" />
                        Add Tutor
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
