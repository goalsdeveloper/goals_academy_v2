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
    callback
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
                            callback
                        }}
                    />
                    <CreateDialog
                        {...{
                            showDialog,
                            setShowDialog,
                            formData,
                            setFormData,
                            post,
                            callback
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
    callback
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
                    post(route("admin.bimbingan.addon.store"), {
                        onFinish: () => callback('create')
                    });
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
                        className="w-full h-full text-[1vw]"
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
                        className="w-full h-full text-[1vw]"
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
    callback
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
                    put(route("admin.bimbingan.addon.update", formData.id), {
                        onFinish: () => callback('edit')
                    });
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
                        className="w-full h-full text-[1vw]"
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="success"
                        type="submit"
                        className="w-full h-full text-[1vw]"
                    >
                        Edit
                    </GoalsButton>
                </div>
            </form>
        </GoalsPopup>
    );
};
