import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import { GoalsSelectInput, GoalsSelectInputItem } from "@/Components/elements/GoalsSelectInput";
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
    dataCity,
}) => {
    const status = showDialog.create ? 'Tambah' : showDialog.edit ? 'Ubah' : showDialog.show ? 'Detail' : ('')
    const [showCityForm, setShowCityForm] = useState(false);
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
                            {status} {formData.target == 'city' ? 'Kota' : 'Lokasi'}
                        </h2>
                        <div className="grid w-full gap-[.8vw]">
                            <GoalsTextInput
                                label={formData.target == 'city' ? 'Kota' : 'Lokasi'}
                                required
                                data={formData.target == 'city' ? formData.city : formData.location}
                                placeholder=""
                                onChange={(e) => setFormData("name", e.target.value)}
                                disabled={showDialog.show}
                            />
                            {formData.target == 'location' ? (
                                <GoalsSelectInput
                                    show={showCityForm}
                                    setShow={setShowCityForm}
                                    label="Kota"
                                    placeholder="Pilih Kota"
                                    data={formData.city}
                                >
                                    {dataCity.map(i => (
                                        <GoalsSelectInputItem
                                            onClick={() => setFormData('city', i.city)}
                                        >
                                            {i.city}
                                        </GoalsSelectInputItem>
                                    ))}
                                </GoalsSelectInput>
                            ) : (<></>)}
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
