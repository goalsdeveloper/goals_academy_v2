import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import { FiChevronLeft, FiFileText } from "react-icons/fi";
import GoalsUploadFile from "@/Components/elements/GoalsUploadFile";
import FileMediaPopup from "@/Pages/Auth/Moderator/Bimbingan/components/FileMediaPopup";
import { SelectMultiTag, SelectMultiTagItem } from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SelectMultiTag";

export default function Show({ auth, order, files }) {
    const tutor_id = auth?.user?.profile?.user_id ?? 0;
    const tutor_documents = order?.file_uploads.filter(
        (file) => file.user_id == tutor_id
    );

    const { data: formData, setData: setFormData } = useForm({
        username: order?.user?.username,
        university: order?.user?.profile?.university,
        major: order?.user?.profile?.major,
        topic: order?.topic?.topic,
        location: order.location,
        place: order.place?.place,
        city: order.place?.city?.city,
        note: order?.note,
        add_on: order?.order?.form_result?.add_on,
        document: order?.file_uploads,
        document_meta: tutor_documents,
        document_deleted: [],
    });

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const [showDocuments, setShowDocuments] = useState(false);

    const GetLocationData = () => {
        switch (order.products.contact_type) {
            case "online":
                return (
                    <GoalsTextInput
                        disabled
                        label="Meeting URL"
                        placeholder="Meeting URL"
                        data={formData.location}
                        labelClassName="font-medium"
                    />
                );
            case "offline":
                return (
                    <GoalsTextInput
                        disabled
                        label="Meeting Location"
                        placeholder="Meeting Location"
                        data={`${formData.place} | ${formData.city}`}
                        labelClassName="font-medium"
                    />
                );
            case "hybrid":
                return (
                    <>
                        <GoalsTextInput
                            disabled
                            label="Meeting URL"
                            placeholder="Meeting URL"
                            data={formData.location}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Meeting Location"
                            placeholder="Meeting Location"
                            data={`${formData.place} | ${formData.city}`}
                            labelClassName="font-medium"
                        />
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="tutor"
            auth={auth}
        >
            <div className="md:space-y-[1.6vw]">
                {isMobile ? (
                    <button
                        className="flex items-center py-[5.6vw] px-[7.4vw] text-[4vw] font-medium border w-full"
                        onClick={() => history.back()}
                    >
                        <FiChevronLeft />
                        <p>Show Detail</p>
                    </button>
                ) : (
                    <Breadcrumb level={2} />
                )}

                {createPortal(
                    <FileMediaPopup
                        show={showDocuments}
                        setShow={setShowDocuments}
                        files={formData.document}
                    />,
                    document.body
                )}

                <div className="md:grid grid-cols-2 gap-[1.2vw]">
                    <FormSection
                        className="p-[7.4vw] md:!p-[2vw] h-fit"
                        wrapperClassName="space-y-[4.8vw]"
                        titleClassName="!font-semibold !text-[4vw] md:!text-[1.1vw]"
                        title="Order Details"
                        titleAction={
                            <a
                                role="button"
                                className="text-secondary text-[3.6vw] md:text-[.9vw] font-medium flex items-center gap-[1vw] md:gap-[.2vw]"
                                onClick={() => setShowDocuments(true)}
                            >
                                File & Media <FiFileText />
                            </a>
                        }
                        bordered={isMobile}
                    >
                        <GoalsTextInput
                            disabled
                            label="Products Name"
                            placeholder="Products Name"
                            data={order.products.name}
                            labelClassName="font-medium"
                        />
                        {order.products.contact_type != "other" && (
                            <GoalsTextInput
                                disabled
                                label="Duration"
                                placeholder="Duration"
                                data={order.products.duration + " menit"}
                                labelClassName="font-medium"
                            />
                        )}
                        <GoalsTextInput
                            disabled
                            label="Username"
                            placeholder="Username"
                            data={formData.username}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="University"
                            placeholder="University"
                            data={formData.university}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Major"
                            placeholder="Major"
                            data={formData.major}
                            labelClassName="font-medium"
                        />
                        {GetLocationData()}
                        <GoalsTextInput
                            disabled
                            label="Topic"
                            placeholder="Topic"
                            data={formData.topic}
                            labelClassName="font-medium"
                        />
                        <SelectMultiTag
                            disabled
                            value={formData.add_on}
                            label="Add-On"
                            labelClassName="font-medium"
                            handleClearTag={() =>
                                setData({ ...formData, add_on: [] })
                            }
                        >
                            {(formData.add_on ?? []).map((option, i) => {
                                return (
                                    <SelectMultiTagItem
                                        key={i}
                                        onClick={() => {
                                            if (
                                                !formData.add_on.some(
                                                    (item) =>
                                                        item === option
                                                )
                                            ) {
                                                setData({
                                                    ...data,
                                                    add_on: [
                                                        ...formData.add_on,
                                                        option,
                                                    ],
                                                });
                                            }
                                        }}
                                    >
                                        {option.name}
                                    </SelectMultiTagItem>
                                );
                            })}
                        </SelectMultiTag>
                    </FormSection>
                    <div className="md:space-y-[1.2vw]">
                        <FormSection
                            className="pt-[0vw] pb-[2vw] px-[7.4vw] md:!p-[2vw] md:!pt-[1vw]"
                            bordered={isMobile}
                        >
                            <GoalsTextArea
                                disabled
                                label="Note for User"
                                placeholder="Note for User"
                                data={formData.note}
                                labelClassName="font-medium"
                            />
                        </FormSection>
                        <FormSection
                            className="pt-[0vw] pb-[2vw] px-[7.4vw] md:!p-[2vw] md:!pt-[1vw]"
                            bordered={isMobile}
                        >
                            <GoalsUploadFile
                                disabled
                                displayInput={false}
                                label="File & Media"
                                labelClassName="font-medium te"
                                data={formData.document_meta}
                                setData={(i) => {
                                    const meta = [
                                        {
                                            ...i[0],
                                            lastModified: i[0].lastModified,
                                            lastModifiedDate:
                                                i[0].lastModifiedDate,
                                            name: i[0].name,
                                            size: i[0].size,
                                            type: i[0].type,
                                            id: "auto",
                                        },
                                    ];
                                    setFormData({
                                        ...formData,
                                        document: formData.document.concat(i),
                                        document_meta:
                                            formData.document_meta.concat(meta),
                                    });
                                }}
                                removeFile={(i) => {
                                    if (i.id != "auto") {
                                        setFormData({
                                            ...formData,
                                            document: formData.document.filter(
                                                (j) =>
                                                    j.name != i.name &&
                                                    j.size != i.size
                                            ),
                                            document_meta:
                                                formData.document_meta.filter(
                                                    (j) => j != i
                                                ),
                                            document_deleted:
                                                formData.document_deleted.concat(
                                                    [i.id]
                                                ),
                                        });
                                    } else {
                                        setFormData({
                                            ...formData,
                                            document: formData.document.filter(
                                                (j) =>
                                                    j.name != i.name &&
                                                    j.size != i.size
                                            ),
                                            document_meta:
                                                formData.document_meta.filter(
                                                    (j) => j != i
                                                ),
                                        });
                                    }
                                }}
                                placeholder={
                                    <p className="text-black">
                                        Pilih file referensimu atau <br /> seret
                                        dan lepas di sini
                                    </p>
                                }
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
