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
                                post(route("admin.bimbingan.topic.store"), {
                                    onFinish: () => callback('create')
                                });
                            } else if (showDialog.edit) {
                                put(route("admin.bimbingan.topic.update", formData.id), {
                                    onFinish: () => callback('edit')
                                });
                            }
                            setShowDialog({ create: false, edit: false, show: false, delete: false });
                        }}
                        className="space-y-[1.2vw] w-full"
                    >
                        <h2 className="text-[1.25vw] text-center">
                            {status} Topik
                        </h2>
                        <div className="grid w-full gap-[.8vw]">
                            <GoalsTextInput
                                label="Name"
                                required
                                data={formData.topic}
                                placeholder=""
                                onChange={(e) => setFormData("topic", e.target.value)}
                                disabled={showDialog.show}
                            />
                            <GoalsTextInput
                                label="Slug"
                                data={(formData.slug = toSlug(formData.topic))}
                                placeholder=""
                                onChange={() =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        slug: toSlug(prevData.topic),
                                    }))
                                }
                                disabled
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
