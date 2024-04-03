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
}) => {
    return (
        <div>
            {createPortal(
                <>
                    <EditDialog
                        {...{
                            showDialog,
                            setShowDialog,
                            formData,
                            setFormData,
                            put,
                        }}
                    />
                    <CreateDialog
                        {...{
                            showDialog,
                            setShowDialog,
                            formData,
                            setFormData,
                            post,
                        }}
                    />
                </>,
                document.body
            )}
        </div>
    );
};

export default Dialog;

const CreateDialog = ({
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    post,
}) => {
    return (
        <GoalsPopup
            show={showDialog.create}
            setShow={() => setShowDialog({ ...showDialog, create: false })}
            className="max-w-[20.8vw]"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("admin.bimbingan.addon.store"));
                    setShowDialog({ ...showDialog, create: false });
                }}
                className="space-y-[1.2vw] w-full"
            >
                <h2 className="text-[1.25vw] text-center">Tambah Add-on</h2>
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
                        className=" w-full h-full"
                        onClick={() =>
                            setShowDialog({ ...showDialog, create: false })
                        }
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="success"
                        type="submit"
                        className="w-full h-full"
                    >
                        Tambah
                    </GoalsButton>
                </div>
            </form>
        </GoalsPopup>
    );
};

const EditDialog = ({
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    put,
}) => {
    return (
        <GoalsPopup
            show={showDialog.edit}
            setShow={() => setShowDialog({ ...showDialog, edit: false })}
            className="max-w-[20.8vw]"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    put(route("admin.bimbingan.addon.update", formData.id));
                    setShowDialog({ ...showDialog, edit: false });
                }}
                className="space-y-[1.2vw] w-full"
            >
                <h2 className="text-[1.25vw] text-center">Edit Add-on</h2>
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
                        onClick={() =>
                            setShowDialog({ ...showDialog, edit: false })
                        }
                        className=" w-full h-full"
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="success"
                        type="submit"
                        className=" w-full h-full"
                    >
                        Edit
                    </GoalsButton>
                </div>
            </form>
        </GoalsPopup>
    );
};
