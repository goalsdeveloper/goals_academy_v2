import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { useMemo } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import SubHeading from "../components/SubHeading";
import Dialog from "./AddOn/Dialog";
import { useState } from "react";
import GoalsButton from "@/Components/elements/GoalsButton";
import toast, { Toaster } from "react-hot-toast";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { getPaginationPages } from "@/script/utils";
import { useEffect } from "react";

export default function AddOn({ auth, addons }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        addons;

    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);

    const onSearchCallback = (search) => {
        router.visit(route("admin.bimbingan.addon.index", { search: search }), {
            only: ["addons"],
        });
    };
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

    const callback = (method) => {
        router.visit(route("admin.bimbingan.addon.index"), {
            only: ["addons"],
            onSuccess: () => {
                toast.success(
                    `Add-On berhasil di ${
                        method.charAt(0).toUpperCase() + method.slice(1)
                    }`
                );
            },
        });
    };

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
                            <GoalsCupertinoButton
                                className="text-[1vw] gap-[.4vw] cursor-pointer"
                                label=""
                                size="lg"
                                isEnabled={cell.row.original.is_visible}
                                setIsEnabled={() => {
                                    router.put(
                                        route(
                                            "admin.bimbingan.addon.updateVisible",
                                            { addon: cell.row.original.id }
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
        [addons]
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
