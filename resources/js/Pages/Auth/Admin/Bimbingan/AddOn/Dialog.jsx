import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { toSlug } from "@/script/utils";
import { createPortal } from "react-dom";

const Dialog = ({
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    post,
    put,
    callback,
}) => {
    const type = Object.keys(showDialog).find((key) => showDialog[key]);
    const submitAction = type === "create" ? post : put;

    console.log(type)
    return (
        <div>
            {createPortal(
                <>
                    <AddonDialog
                        {...{
                            type,
                            showDialog,
                            setShowDialog,
                            formData,
                            setFormData,
                            submitAction,
                            callback,
                        }}
                    />
                </>,
                document.body
            )}
        </div>
    );
};

export default Dialog;

const AddonDialog = ({
    type,
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    submitAction,
    callback,
}) => {
    const isCreate = type === "create";

    return (
        <GoalsPopup
            show={showDialog[type]}
            setShow={() => setShowDialog({ ...showDialog, [type]: false })}
            className="max-w-[20.8vw]"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitAction(
                        route(
                            `admin.bimbingan.addon.${
                                isCreate ? "store" : "update"
                            }`,
                            isCreate ? undefined : formData.id
                        ),
                        {
                            onSuccess: () => callback(isCreate ? "create" : "edit"),
                        }
                    );
                    setShowDialog({ ...showDialog, [type]: false });
                }}
                className="space-y-[1.2vw] w-full"
            >
                <h2 className="text-[1.25vw] text-center">
                    {isCreate ? "Tambah Add-on" : "Edit Add-on"}
                </h2>
                <div className="grid w-full gap-[.8vw]">
                    <GoalsTextInput
                        label="Name"
                        required
                        data={formData.name}
                        onChange={(e) => setFormData("name", e.target.value)}
                    />
                    <GoalsTextInput
                        label="Slug"
                        data={(formData.slug = toSlug(formData.name))}
                        disabled
                        onChange={() =>
                            setFormData((prevData) => ({
                                ...prevData,
                                slug: toSlug(prevData.name),
                            }))
                        }
                    />
                    <GoalsTextInput
                        label="Harga"
                        required
                        data={formData.price}
                        onChange={(e) => setFormData("price", e.target.value)}
                        type="number"
                    />
                </div>
                <div className="flex gap-[.8vw]">
                    <GoalsButton
                        size="sm"
                        variant="success-bordered"
                        className="w-full h-full text-[1vw]"
                        onClick={() =>
                            setShowDialog({ ...showDialog, [type]: false })
                        }
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="success"
                        type="submit"
                        className="w-full h-full text-[1vw]"
                        disabled={!formData.name || !formData.price}
                    >
                        {isCreate ? "Tambah" : "Edit"}
                    </GoalsButton>
                </div>
            </form>
        </GoalsPopup>
    );
};
