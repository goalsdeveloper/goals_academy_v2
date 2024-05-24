import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import Dialog from "./Topic/Dialog";
import toast, { Toaster } from "react-hot-toast";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";

export default function Topic({ auth, topics }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        topics;

    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(route("admin.bimbingan.topic.index", { search: search }), {
            only: ["topics"],
        });
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
        topic: "",
        slug: "",
        description: "N/A",
    });

    const callback = (method) => {
        router.visit(route("admin.bimbingan.topic.index"), {
            only: ["topics"],
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
                accessorKey: "topic",
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
                                    setShowDialog({
                                        ...showDialog,
                                        edit: true,
                                    });
                                    setFormData({
                                        ...formData,
                                        id: cell.row.original.id,
                                        topic: cell.row.original.topic,
                                        slug: cell.row.original.slug,
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <GoalsCupertinoButton
                                className="text-[1vw] gap-[.4vw] cursor-pointer"
                                label=""
                                size="lg"
                                isEnabled={cell.row.original.is_visible}
                                disabled={cell.row.original.is_visible}
                                onClick={() => {
                                    router.put(
                                        route(
                                            "admin.bimbingan.topic.updateVisible",
                                            { topic: cell.row.original.id }
                                        ),
                                        {
                                            is_visible:
                                                !cell.row.original.is_visible,
                                        },
                                        {
                                            onSuccess: () => callback("edit"),
                                        }
                                    );
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
                                topic: "",
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
                    isSortable
                    columns={columns}
                    data={data}
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
