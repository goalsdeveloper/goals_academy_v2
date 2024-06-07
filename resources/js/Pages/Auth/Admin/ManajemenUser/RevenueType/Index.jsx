import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import SubHeading from "../../components/SubHeading";
import { useMemo } from "react";

export default function RevenueType({ auth, revenue_types }) {
    revenue_types = revenue_types.data ?? [];

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
        reset,
        delete: destroy,
    } = useForm({
        type: "",
    });
    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        view: false,
    });

    const callback = () =>
        router.visit(route("admin.manajemen_user.revenue_type.index"), {
            only: ["revenue_types"],
        });

    function createRevenueType() {
        setShowDialog({});
        post(route("admin.manajemen_user.revenue_type.store"), {
            onSuccess: () => {
                toast.success("Create Revenue Type Success");
                callback();
            },
        });
    }

    function editRevenueType() {
        setShowDialog({});
        put(
            route("admin.manajemen_user.revenue_type.update", {
                revenue_type: formData.id,
            }),
            {
                onSuccess: () => {
                    toast.success("Edit Revenue Type Success");
                    callback();
                },
            }
        );
    }

    function deleteRevenueType(id) {
        setShowDialog({});
        destroy(route("admin.manajemen_user.revenue_type.destroy", id), {
            onSuccess: () => {
                toast.success("Delete Revenue Type Success");
                callback();
            },
        });
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "type",
                header: "Revenue Type",
                Cell: ({ row }) => (
                    <div className="text-[.8vw] text-gray-800">
                        {row.original.type + "%"}
                    </div>
                ),
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ row }) => {
                    return (
                        <div className="flex gap-4 w-fit">
                            <button
                                onClick={() => {
                                    setShowDialog({ edit: true });
                                    setFormData({
                                        type: row.original.type,
                                        id: row.original.id,
                                    });
                                    console.log(row.original);
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                            <button
                                onClick={() => {
                                    setShowDialog({ view: true });
                                    setFormData("type", row.original.type);
                                }}
                            >
                                <FiEye className="text-[1.2vw] text-gray-400" />
                            </button>
                            <button
                                onClick={() =>
                                    deleteRevenueType(row.original.id)
                                }
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Manajemen User"
            subtitle="Revenue Type"
            role="admin"
            auth={auth}
        >
            <SubHeading title="Revenue Type">
                <GoalsButton
                    className="flex items-center gap-[.5vw] py-[.6vw] px-[1vw] rounded-[.4vw] !text-[.8vw]"
                    onClick={() => {
                        setShowDialog({ create: true });
                        reset();
                    }}
                >
                    <FiPlus className="text-[1vw]" />
                    Add Revenue Type
                </GoalsButton>
            </SubHeading>

            {createPortal(
                <>
                    <RevenueTypeDialog
                        type="edit"
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={() => editRevenueType(formData.id)}
                    />
                    <RevenueTypeDialog
                        type="view"
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <RevenueTypeDialog
                        type="create"
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={() => createRevenueType()}
                    />
                </>,
                document.getElementById("modal-root")
            )}

            <div className="mt-10">
                <GoalsDashboardTable
                    isSearchable={false}
                    isHeadVisible
                    isSortable
                    columns={columns}
                    data={revenue_types}
                    // keyword={keyword}
                    // setKeyword={setKeyword}
                    // onSearch={(i) => {
                    //     onSearchCallback(i);
                    // }}
                />
            </div>
        </DashboardLayout>
    );
}

function RevenueTypeDialog({
    showDialog,
    setShowDialog,
    type,
    formData,
    setFormData,
    handleSubmit,
}) {
    return (
        <GoalsPopup
            show={showDialog[type]}
            setShow={() => setShowDialog({ ...showDialog, [type]: false })}
            className="max-w-[20.8vw]"
            header={"Revenue Type"}
        >
            <form
                className="grid w-full gap-[.8vw]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <GoalsTextInput
                    required
                    disabled={type === "view"}
                    type="number"
                    label="Revenue Type"
                    min="0"
                    max="100"
                    data={formData.type}
                    onChange={(e) => setFormData("type", e.target.value)}
                />
                {type != "view" && (
                    <GoalsButton type="submit" disabled={formData.type == ''}>
                        {type === "edit" ? "Edit" : "Create"} Revenue Type
                    </GoalsButton>
                )}
            </form>
        </GoalsPopup>
    );
}
