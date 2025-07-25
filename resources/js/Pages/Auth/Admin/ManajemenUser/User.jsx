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
import { getPaginationPages, phoneNumberFormat } from "@/script/utils";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useEffect } from "react";

export default function User({ auth, users }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        users;
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("admin.manajemen_user.user.index", { search: search }),
            {
                only: ["users"],
            }
        );
    };

    const onDownload = () => {
        axios.get("/admin/export-users", {
            params: {
                user_role: "user",
            }
        }).then((res) => {
            if (res.status == 200) {
                const url = res.data.download_url;
                const link = document.createElement("a");
                link.href = url;
                document.body.appendChild(link);
                link.click();
            }
        });
    }

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
        router.visit(route("admin.bimbingan.user.index"), {
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
                Cell: ({ cell}) => {
                    return (
                        <a
                            href={`mailto:${cell.getValue()}`}
                            className="text-blue-500"
                        >
                                {cell.getValue()}
                        </a>
                    );
                }
            },
            {
                accessorKey: "profile.phone_number",
                header: "Telepon",
                size: 100,
                Cell: ({ cell }) => {
                    return (
                        <a
                            href={`https://wa.me/${phoneNumberFormat(cell.getValue())}`}
                            target="_blank"
                            className="text-blue-500"
                        >
                            {cell.getValue()}
                        </a>
                    );
                }
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
                    isSortable
                    isDownloadable
                    columns={columns}
                    data={users.data}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={(i) => {
                        onSearchCallback(i);
                    }}
                    onDownload={onDownload}
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
