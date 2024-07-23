import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import Dialog from "./Moderator/Dialog";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";

export default function Moderator({ auth, moderators }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        moderators;
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("admin.manajemen_user.moderator.index", { search: search }),
            {
                only: ["moderators"],
            }
        );
    };
    // const data = [
    //     {
    //         id: 1,
    //         name: "Hafiz Rizky 1",
    //         username: "hafizbaik",
    //         email: "hafizbaik@gmail.com",
    //         phone_number: "085123456789",
    //         university: "Universitas Brawijaya",
    //         major: "Sistem Informasi",
    //     },
    //     {
    //         id: 2,
    //         name: "Hafiz Rizky 2",
    //         username: "hafizganteng",
    //         email: "hafizganteng@gmail.com",
    //         phone_number: "085123456789",
    //         university: "Universitas Brawijaya",
    //         major: "Sistem Informasi",
    //     },
    //     {
    //         id: 3,
    //         name: "Hafiz Rizky 3",
    //         username: "hafizcute",
    //         email: "hafizcute@gmail.com",
    //         phone_number: "085123456789",
    //         university: "Universitas Brawijaya",
    //         major: "Sistem Informasi",
    //     },
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
        router.visit(route("admin.manajemen_user.moderator.index"), {
            only: ["moderators"],
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

    const updateActive = (data) => {
        // Update status tutor dengan menggunakan route
        const is_active = !data.profile.is_active;
        router.put(
            route("admin.manajemen_user.moderator.updateActive", {
                moderator: data.id,
            }),
            { is_active: is_active },
            {
                onSuccess: callback,
                preserveScroll: true,
            }
        );
        // callback
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
                            <button
                                onClick={() => {
                                    setShowDialog({
                                        ...showDialog,
                                        edit: true,
                                    });
                                    setFormData({
                                        ...formData,
                                        id: cell.row.original.id,
                                        name: cell.row.original.name,
                                        username: cell.row.original.username,
                                        email: cell.row.original.email,
                                        phone_number:
                                            cell.row.original.profile
                                                .phone_number,
                                        university:
                                            cell.row.original.profile
                                                .university,
                                        major: cell.row.original.profile.major,
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <button>
                                <FiEye
                                    className="text-[1.2vw] text-gray-400"
                                    onClick={() => {
                                        setShowDialog({
                                            ...showDialog,
                                            show: true,
                                        });
                                        setFormData({
                                            ...formData,
                                            id: cell.row.original.id,
                                            name: cell.row.original.name,
                                            username:
                                                cell.row.original.username,
                                            email: cell.row.original.email,
                                            phone_number:
                                                cell.row.original.profile
                                                    .phone_number,
                                            university:
                                                cell.row.original.profile
                                                    .university,
                                            major: cell.row.original.profile
                                                .major,
                                        });
                                    }}
                                />
                            </button>
                        </li>
                        <li>
                            <GoalsCupertinoButton
                                className="text-[1vw]"
                                enabledClassName="bg-blue-600"
                                label=""
                                size="sm"
                                isEnabled={cell.row.original.profile?.is_active}
                                setIsEnabled={() =>
                                    updateActive(cell.row.original)
                                }
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
            subtitle="Moderator"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Moderator">
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
                        Add Moderator
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
                    isSortable
                    columns={columns}
                    data={moderators.data}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={(i) => {
                        onSearchCallback(i);
                    }}
                />
                <BottomPaginationTable
                    {...{
                        from,
                        to,
                        total,
                        pages,
                        per_page,
                        current_page,
                        keyword,
                    }}
                />
            </div>
        </DashboardLayout>
    );
}
