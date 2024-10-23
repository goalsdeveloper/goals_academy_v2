import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import moment from "moment";
import Dialog from "./Category/Dialog";
import toast, { Toaster } from "react-hot-toast";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";

export default function Category({ auth, categories, message }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        categories;

    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(
            route("admin.webinar.category.index", { search: search }),
            {
                only: ["categories"],
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
        slug: "",
        description: "N/A",
        is_visible: 0,
    });

    const callback = (method) => {
        router.visit(route("admin.webinar.category.index"), {
            only: ["categories"],
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
                header: "Nama Kategori",
                size: 400,
            },
            {
                accessorKey: "is_visible",
                header: "Visibilitas",
                size: 50,
                Cell: ({ cell }) => (
                    <GoalsCupertinoButton
                        className="text-[1vw] gap-[.4vw] cursor-pointer"
                        label=""
                        size="lg"
                        isEnabled={cell.row.original.is_visible}
                        setIsEnabled={() => {
                            router.put(
                                route(
                                    "admin.webinar.category.updateVisible",
                                    { category: cell.row.original.id }
                                ),
                                { is_visible: !cell.row.original.is_visible },
                                {
                                    onSuccess: () => callback("edit"),
                                }
                            );
                        }}
                    />
                ),
            },
            {
                accessorFn: (row) =>
                    moment(row.updated_at).format("DD/MM/YYYY"),
                header: "Tangal Update",
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
                                <FiEdit2
                                    className="text-[1.2vw] text-secondary"
                                    onClick={() => {
                                        setShowDialog({
                                            ...showDialog,
                                            edit: true,
                                        });
                                        setFormData({
                                            ...formData,
                                            id: cell.row.original.id,
                                            name: cell.row.original.name,
                                            slug: cell.row.original.slug,
                                            is_visible:
                                                cell.row.original.is_visible,
                                        });
                                    }}
                                />
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
                                            slug: cell.row.original.slug,
                                            is_visible:
                                                cell.row.original.is_visible,
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
            title="Webinar"
            subtitle="Category"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="space-y-[1.6vw]">
                <SubHeading title="Kategori">
                    <GoalsButton
                        className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                        onClick={() => {
                            setShowDialog({ ...showDialog, create: true });
                            setFormData({
                                ...formData,
                                id: "",
                                name: "",
                                slug: "",
                                is_visible: 0,
                            });
                        }}
                    >
                        <FiPlus className="text-[1vw]" />
                        Tambah Kategori
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
                    columns={columns}
                    data={data}
                    isHeadVisible
                    isSortable
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={(i) => {
                        onSearchCallback(i);
                    }}
                />
                <div>
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
            </div>
        </DashboardLayout>
    );
}
