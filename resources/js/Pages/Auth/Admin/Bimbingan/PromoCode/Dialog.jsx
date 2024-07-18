import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { toSlug } from "@/script/utils";
import SelectInput from "@mui/material/Select/SelectInput";
import { createPortal } from "react-dom";
import { SelectInputItem } from "../Product/Components/SelectInput";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import { useState } from "react";

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

    return (
        <div>
            {createPortal(
                <>
                    <PromoDialog
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

const PromoDialog = ({
    type,
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    submitAction,
    callback,
}) => {
    const [show, setShow] = useState(0);
    const isCreate = type === "create";
    const promoType = [
        {
            type: "Persentase",
            value: 0,
        },
        {
            type: "Harga",
            value: 1,
        },
    ];

    return (
        <GoalsPopup
            show={showDialog[type]}
            setShow={() => setShowDialog({ ...showDialog, [type]: false })}
            className="max-w-[50.8vw] !top-[-2vw]"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitAction(
                        route(
                            `admin.bimbingan.promo-code.${
                                isCreate ? "store" : "update"
                            }`,
                            isCreate ? undefined : formData.id
                        ),
                        {
                            onSuccess: () =>
                                callback(isCreate ? "create" : "edit"),
                        }
                    );
                    setShowDialog({ ...showDialog, [type]: false });
                }}
                className="relative space-y-[1.2vw] w-full"
            >
                <h2 className="text-[1.25vw] text-center">
                    {isCreate ? "Tambah" : "Edit"} Kode Promo
                </h2>
                <div className="grid w-full gap-[.8vw]">
                    <GoalsTextInput
                        label="Kode Promo"
                        required
                        disabled={showDialog.show}
                        data={formData.promo_code}
                        onChange={(e) =>
                            setFormData("promo_code", e.target.value)
                        }
                    />
                    <GoalsTextArea
                        label="Deskripsi"
                        placeholder="Deskripsi Promo"
                        disabled={showDialog.show}
                        data={formData.description}
                        setData={(i) => setFormData("description", i)}
                        required
                    />
                    {showDialog.show ? (
                        <GoalsTextInput
                            label="Tipe Promo"
                            placeholder="Tipe Promo"
                            data={promoType[formData.is_price].type}
                            disabled={showDialog.show}
                            labelClassName="font-medium"
                        />
                    ) : (
                        <GoalsSelectInput
                            show={show}
                            setShow={setShow}
                            label="Tipe Promo"
                            placeholder="Tipe Promo"
                            data={promoType[formData.is_price].type}
                            disabled={showDialog.show}
                            required
                        >
                            {promoType.map((option, i) => (
                                <GoalsSelectInputItem
                                    key={i}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            is_price: option.value,
                                            is_price_title: option.type,
                                        })
                                    }
                                >
                                    {option.type}
                                </GoalsSelectInputItem>
                            ))}
                        </GoalsSelectInput>
                    )}
                    <GoalsTextInput
                        label="Harga / Prosentase"
                        required
                        data={formData.value}
                        onChange={(e) => setFormData("value", e.target.value)}
                        type="number"
                        disabled={showDialog.show}
                    />
                    <div className="flex gap-3">
                        <GoalsTextInput
                            label="Tanggal Mulai"
                            type="date"
                            grow
                            data={formData.date_start}
                            setData={(i) => setFormData("date_start", i)}
                            disabled={showDialog.show}
                            required
                        />
                        <GoalsTextInput
                            label="Tanggal Selesai"
                            type="date"
                            grow
                            data={formData.date_end}
                            setData={(i) => setFormData("date_end", i)}
                            required
                            disabled={showDialog.show}
                        />
                    </div>
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
                            disabled={!formData.promo_code || !formData.value}
                        >
                            {isCreate ? "Tambah" : "Edit"}
                        </GoalsButton>
                    </div>
                )}
            </form>
        </GoalsPopup>
    );
};
