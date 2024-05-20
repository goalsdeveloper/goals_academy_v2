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
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";

export default function Tutor({ auth, tutors }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        tutors;
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("admin.manajemen_user.tutor.index", { search: search }),
            {
                only: ["tutors"],
            }
        );
    };

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
        router.visit(route("admin.manajemen_user.tutor.index"), {
            only: ["data"],
            onSuccess: () => {
                console.log("berhasil");
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
        console.log("sedang fetching");
        const is_active = !data.profile.is_active;
        // console.log("is_active = ", is_active);
        router.put(
            route("admin.manajemen_user.tutor.updateActive", {
                tutor: data.id,
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
                    isSortable
                    columns={columns}
                    data={tutors.data}
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
