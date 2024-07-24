import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
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
    const status = showDialog.create ? 'Tambah' : showDialog.edit ? 'Ubah' : showDialog.show ? 'Detail' : ('')
    return (
        <div>
            {createPortal(
                <GoalsPopup
                    show={Object.values(showDialog).includes(true)}
                    setShow={() => setShowDialog({ create: false, edit: false, show: false, delete: false })}
                    className="max-w-[20.8vw]"
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (showDialog.create) {
                                post(route("admin.bimbingan.category.store"), {
                                    onFinish: () => callback('create')
                                });
                            } else if (showDialog.edit) {
                                put(route("admin.bimbingan.category.update", formData.id), {
                                    onFinish: () => callback('edit')
                                });
                            }
                            setShowDialog({ create: false, edit: false, show: false, delete: false });
                        }}
                        className="space-y-[1.2vw] w-full"
                    >
                        <h2 className="text-[1.25vw] text-center">
                            {status} Kategori
                        </h2>
                        <div className="grid w-full gap-[.8vw]">
                            <GoalsTextInput
                                label="Name"
                                required
                                data={formData.name}
                                placeholder=""
                                onChange={(e) => setFormData("name", e.target.value)}
                                disabled={showDialog.show}
                            />
                            <GoalsTextInput
                                label="Slug"
                                data={(formData.slug = toSlug(formData.name))}
                                placeholder=""
                                onChange={() =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        slug: toSlug(prevData.name),
                                    }))
                                }
                                disabled
                            />
                            <GoalsCupertinoButton
                                className="text-[1vw] gap-[.4vw]"
                                label="Visibilitas"
                                size="lg"
                                isEnabled={formData.is_visible == true}
                                setIsEnabled={(i) => setFormData("is_visible", i)}
                                disabled={formData.show == false}
                            />
                        </div>
                        {showDialog.show ? (<></>) : (
                            (
                                <div className="flex gap-[.8vw]">
                                    <GoalsButton
                                        size="sm"
                                        variant="success-bordered"
                                        className="w-full h-full text-[1vw]"
                                        onClick={() =>
                                            setShowDialog({ create: false, edit: false, show: false, delete: false })
                                        }
                                    >
                                        Batal
                                    </GoalsButton>
                                    <GoalsButton
                                        size="sm"
                                        variant="success"
                                        type="submit"
                                        className="w-full h-full text-[1vw]"
                                        disabled={formData.name == ""}
                                    >
                                        {status}
                                    </GoalsButton>
                                </div>
                            )
                        )}
                    </form>
                </GoalsPopup>,
                document.body
            )}
        </div>
    );
};

export default Dialog;
