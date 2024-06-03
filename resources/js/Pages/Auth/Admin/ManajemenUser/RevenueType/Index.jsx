import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import SubHeading from "../../components/SubHeading";
import GoalsButton from "@/Components/elements/GoalsButton";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { useMemo } from "react";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import { useForm } from "@inertiajs/react";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function RevenueType({ auth, revenueType }) {
    const { data: formData, setData: setFormData } = useForm({
        type: "",
    });
    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        view: false,
    });

    revenueType = revenueType
        ? revenueType
        : [
              {
                  type: 90,
              },
              {
                  type: 80,
              },
              {
                  type: 70,
              },
          ];

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
                Cell: () => {
                    return (
                        <div className="flex gap-4 w-fit">
                            <button
                                onClick={() => setShowDialog({ edit: true })}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                            <button
                                onClick={() => setShowDialog({ view: true })}
                            >
                                <FiEye className="text-[1.2vw] text-gray-400" />
                            </button>
                            <button onClick={() => {}}>
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
                    className="flex items-center gap-4 py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                    onClick={() => setShowDialog({ create: true })}
                >
                    <FiPlus className="text-[1vw]" />
                    Add Revenue Type
                </GoalsButton>
            </SubHeading>

            {createPortal(
                <>
                    <RevenueTypeDialog
                        type="edit"
                        formData={formData}
                        setFormData={setFormData}
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                    />
                    <RevenueTypeDialog
                        type="view"
                        formData={formData}
                        setFormData={setFormData}
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                    />
                    <RevenueTypeDialog
                        type="create"
                        formData={formData}
                        setFormData={setFormData}
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                    />
                </>,
                document.getElementById("modal-root")
            )}

            <GoalsDashboardTable
                isHeadVisible
                isSortable
                columns={columns}
                data={revenueType}
                // keyword={keyword}
                // setKeyword={setKeyword}
                // onSearch={(i) => {
                //     onSearchCallback(i);
                // }}
            />
        </DashboardLayout>
    );
}

function RevenueTypeDialog({
    formData,
    setFormData,
    showDialog,
    setShowDialog,
    type,
}) {
    return (
        <GoalsPopup
            show={showDialog[type]}
            setShow={() => setShowDialog({ ...showDialog, [type]: false })}
            className="max-w-[20.8vw]"
            header={type === "edit" ? "Edit Revenue Type" : "View Revenue Type"}
        >
            <form
                className="grid w-full gap-[.8vw]"
                onSubmit={(e) => e.preventDefault()}
            >
                <GoalsTextInput
                    type="number"
                    label="Revenue Type"
                    data={formData.type}
                    onChange={(e) => setFormData("type", e.target.value)}
                />
                {type != "view" && (
                    <GoalsButton type="submit">
                        {type === "edit" ? "Edit" : "Create"} Revenue Type
                    </GoalsButton>
                )}
            </form>
        </GoalsPopup>
    );
}
