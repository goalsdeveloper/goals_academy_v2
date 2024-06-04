import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { useState } from "react";
import { createPortal } from "react-dom";

const Dialog = ({
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    post,
    put,
    callback,
    revenue_types,
}) => {
    const [showRevenueForm, setShowRevenueForm] = useState(false);

    const status = showDialog.create
        ? "Tambah"
        : showDialog.edit
        ? "Ubah"
        : showDialog.show
        ? "Detail"
        : "";
    return (
        <div>
            {createPortal(
                <GoalsPopup
                    show={Object.values(showDialog).includes(true)}
                    setShow={() =>
                        setShowDialog({
                            create: false,
                            edit: false,
                            show: false,
                            delete: false,
                        })
                    }
                    className="max-w-[20.8vw]"
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (showDialog.create) {
                                post(
                                    route("admin.manajemen_user.tutor.store"),
                                    {
                                        onFinish: () => callback("create"),
                                    }
                                );
                            } else if (showDialog.edit) {
                                put(
                                    route(
                                        "admin.manajemen_user.tutor.update",
                                        formData.id
                                    ),
                                    {
                                        onFinish: () => callback("edit"),
                                    }
                                );
                            }
                            setShowDialog({
                                create: false,
                                edit: false,
                                show: false,
                                delete: false,
                            });
                        }}
                        className="space-y-[1.2vw] w-full"
                    >
                        <h2 className="text-[1.25vw] text-center">
                            {status} Tutor Profile
                        </h2>
                        <div className="grid w-full gap-[.8vw]">
                            <GoalsTextInput
                                label="Name"
                                required
                                data={formData.name}
                                placeholder=""
                                onChange={(e) =>
                                    setFormData("name", e.target.value)
                                }
                                disabled={showDialog.show}
                            />
                            <GoalsTextInput
                                label="Email"
                                required
                                data={formData.email}
                                placeholder=""
                                onChange={(e) =>
                                    setFormData("email", e.target.value)
                                }
                                disabled={showDialog.show}
                            />
                            <GoalsSelectInput
                                required
                                show={showRevenueForm}
                                setShow={setShowRevenueForm}
                                data={
                                    formData.revenue_type_type
                                        ? formData.revenue_type_type + "%"
                                        : ""
                                }
                                label="Revenue Type"
                                placeholderClassName="font-normal"
                            >
                                {revenue_types.map((item, index) => (
                                    <GoalsSelectInputItem
                                        key={index}
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                revenue_type_id: item.id,
                                                revenue_type_type: item.type,
                                            })
                                        }
                                    >
                                        {item.type}%
                                    </GoalsSelectInputItem>
                                ))}
                            </GoalsSelectInput>
                        </div>
                        {showDialog.show ? (
                            <></>
                        ) : (
                            <div className="flex gap-[.8vw]">
                                <GoalsButton
                                    size="sm"
                                    variant="success-bordered"
                                    className="w-full h-full text-[1vw]"
                                    onClick={() =>
                                        setShowDialog({
                                            create: false,
                                            edit: false,
                                            show: false,
                                            delete: false,
                                        })
                                    }
                                >
                                    Batal
                                </GoalsButton>
                                <GoalsButton
                                    size="sm"
                                    variant="success"
                                    type="submit"
                                    className="w-full h-full text-[1vw]"
                                    disabled={!formData.name || !formData.email}
                                >
                                    {status}
                                </GoalsButton>
                            </div>
                        )}
                    </form>
                </GoalsPopup>,
                document.body
            )}
        </div>
    );
};

export default Dialog;
