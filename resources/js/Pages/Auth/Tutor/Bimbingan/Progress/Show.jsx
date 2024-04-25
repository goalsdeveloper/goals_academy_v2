import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import { FiFileText } from "react-icons/fi";
import GoalsUploadFile from "@/Components/elements/GoalsUploadFile";

export default function Show ({ auth }) {
    // console.log(data);
    const {data: formData, setData: setFormData} = useForm({
        username: 'hafizpemberani',
        university: 'UIN Brawijaya',
        major: 'Sistem Informasi',
        topic: 'Bab 6',
        note: 'Good job',
        add_on: [
            {name: 'king'},
            {name: 'queen'},
            {name: 'jack'},
        ],
        document: [],
        document_meta: [
            {
                path: 'asdf.pdf',
                lastModified: '2024-12-02',
                lastModifiedDate: '2024-12-02',
                name: 'asdf.pdf',
                size: 1000000,
                type: 'document/pdf',
                id: 1,
            },
            {
                path: 'asdf1324.docx',
                lastModified: '2024-12-02',
                lastModifiedDate: '2024-12-02',
                name: 'asdf1324.docx',
                size: 3000000,
                type: 'document/docx',
                id: 2,
            },
        ],
        document_deleted: [],
    });

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="tutor"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <Breadcrumb level={2} />

                <div className="grid grid-cols-2 gap-[1.2vw]">
                    <FormSection
                        className="md:!p-[2vw] h-fit"
                        titleClassName="!font-semibold md:text-[1.1vw]"
                        title="Order Details"
                        titleAction={
                            <a href="#" className="text-secondary text-[.9vw] font-medium flex items-center gap-[.2vw]">File & Media <FiFileText /></a>
                        }
                    >
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
                        <GoalsTextInput
                            disabled
                            label="Topic"
                            placeholder="Topic"
                            data={formData.topic}
                            labelClassName="font-medium"
                        />
                        <div className="space-y-[.3vw]">
                            <label className="font-medium">Add-On</label>
                            <div className="flex items-center gap-[.5vw] bg-gray-100 border border-gray-300 rounded-md h-[12vw] md:h-[3vw] p-[1vw] text-[.8vw]">
                                {formData.add_on.map((item, index) => {
                                    return (
                                        <span className="text-white bg-neutral-400 rounded-[.3vw] p-[.9vw] py-[.2vw]">{item.name}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </FormSection>
                    <div className="space-y-[1.2vw] ">
                        <FormSection
                            className="md:!p-[2vw]"
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
                            className="md:!p-[2vw]"
                        >
                            <GoalsUploadFile
                                disabled
                                displayInput={false}
                                label="File & Media"
                                labelClassName="font-medium te"
                                data={formData.document_meta}
                                setData={(i) => {
                                    const meta = [{
                                        ...i[0],
                                        lastModified: i[0].lastModified,
                                        lastModifiedDate: i[0].lastModifiedDate,
                                        name: i[0].name,
                                        size: i[0].size,
                                        type: i[0].type,
                                        id: "auto",
                                    }]
                                    setFormData({
                                        ...formData,
                                        document: formData.document.concat(i),
                                        document_meta: formData.document_meta.concat(meta),
                                    }
                                )}}
                                removeFile={(i) => {
                                    if (i.id != "auto") {
                                        setFormData({
                                            ...formData,
                                            document: formData.document.filter((j) => j.name != i.name && j.size != i.size),
                                            document_meta: formData.document_meta.filter((j) => j != i),
                                            document_deleted: formData.document_deleted.concat([i.id]),
                                        });
                                    } else {
                                        setFormData({
                                            ...formData,
                                            document: formData.document.filter((j) => j.name != i.name && j.size != i.size),
                                            document_meta: formData.document_meta.filter((j) => j != i),
                                        });
                                    }
                                }}
                                placeholder={
                                    <p className="text-black">
                                        Pilih file referensimu atau <br /> seret dan
                                        lepas di sini
                                    </p>
                                }
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
