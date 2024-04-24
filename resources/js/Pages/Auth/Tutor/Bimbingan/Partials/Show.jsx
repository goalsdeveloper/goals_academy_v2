import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import { FiFileText } from "react-icons/fi";
import GoalsUploadFile from "@/Components/elements/GoalsUploadFile";

export default function Show ({ auth }) {
    // console.log(data);
    const {data: formData, setData: setFormData, post} = useForm({
        username: '',
        email: '',
        document: []
    })

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="History"
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
                            data={"hafiztampan"}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="University"
                            placeholder="University"
                            data={"Universitas Brawijaya"}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Major"
                            placeholder="Major"
                            data={"Sistem Informasi"}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Topic"
                            placeholder="Topic"
                            data={"Perancangan Bab 1-3"}
                            labelClassName="font-medium"
                        />
                        <div className="space-y-[.3vw]">
                            <label className="font-medium">Add-On</label>
                            <div className="flex gap-[.5vw] bg-gray-100 border border-gray-300 rounded-md p-[1vw] py-[.6vw] text-[.8vw]">
                                <span className="text-white bg-neutral-400 rounded-[.3vw] p-[.9vw] py-[.2vw]">asdf</span>
                                <span className="text-white bg-neutral-400 rounded-[.3vw] p-[.9vw] py-[.2vw]">asdfasdf</span>
                                <span className="text-white bg-neutral-400 rounded-[.3vw] p-[.9vw] py-[.2vw]">asdfasdfasdf</span>
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
                                // data={"Perancangan Bab 1-3"}
                                labelClassName="font-medium"
                                value="asdfasdf"
                            />
                        </FormSection>
                        <FormSection
                            className="md:!p-[2vw]"
                        >
                            <GoalsUploadFile
                                disabled
                                displayInput={true}
                                label="File & Media"
                                labelClassName="font-medium te"
                                data={formData.document}
                                setData={(i) =>
                                    setFormData({
                                        ...formData,
                                        document: formData.document.concat(i),
                                    }
                                )}
                                removeFile={(i) => {
                                    setFormData(
                                        "document",
                                        formData.document.filter((j) => j != i)
                                    );
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
