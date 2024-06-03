import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { useMediaQuery } from "react-responsive";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import { FiChevronLeft, FiFileText } from "react-icons/fi";
import GoalsUploadFile from "@/Components/elements/GoalsUploadFile";
import GoalsStarRating from "@/Components/elements/GoalsStarRating";

export default function Show ({ auth, course }) {
    const {data: formData, setData: setFormData} = useForm({
        username: course.user.username,
        university: course.user?.profile?.university,
        major: course.user?.profile?.major,
        topic: course?.topic?.topic,
        location: course.location,
        place: course.place?.place,
        city: course.place?.city?.city,
        note: course.note,
        add_on: course.add_ons,
        tutor_rating: course?.productReview?.rate_tutor,
        user_note: course?.productReview?.note_tutor,
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

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const GetLocationData = () => {
        switch (course.products.contact_type) {
            case "online":
                return <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={formData.location} labelClassName="font-medium" />
            case "offline":
                return <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${formData.place} | ${formData.city}`} labelClassName="font-medium" />
            case "hybrid":
                return (
                    <>
                        <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={formData.location} labelClassName="font-medium" />
                        <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${formData.place} | ${formData.city}`} labelClassName="font-medium" />
                    </>
                )
            default:
                return <></>
        }
    }


    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="History"
            role="tutor"
            auth={auth}
        >
            <div className="md:space-y-[1.6vw]">
                {isMobile ? (
                    <button className="flex items-center py-[5.6vw] px-[7.4vw] text-[4vw] font-medium border w-full" onClick={() => history.back()}>
                        <FiChevronLeft />
                        <p>Show Detail</p>
                    </button>
                ) : (
                    <Breadcrumb level={2} />
                )}

                <div className="md:grid grid-cols-2 gap-[1.2vw]">
                    <FormSection
                        className="p-[7.4vw] md:!p-[2vw] h-fit"
                        wrapperClassName="space-y-[4.8vw]"
                        titleClassName="!font-semibold !text-[4vw] md:!text-[1.1vw]"
                        title="Order Details"
                        titleAction={
                            <a 
                                href="#" 
                                className="text-secondary text-[3.6vw] md:text-[.9vw] font-medium flex items-center gap-[1vw] md:gap-[.2vw]"
                            >
                                File & Media <FiFileText />
                            </a>
                        }
                        bordered={isMobile}
                    >
                        <GoalsTextInput
                            disabled
                            label="Username"
                            placeholder="Username"
                            data={formData.username ?? ""}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="University"
                            placeholder="University"
                            data={formData.university ?? ""}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Major"
                            placeholder="Major"
                            data={formData.major ?? ""}
                            labelClassName="font-medium"
                        />
                        {GetLocationData()}
                        <GoalsTextInput
                            disabled
                            label="Topic"
                            placeholder="Topic"
                            data={formData.topic ?? ""}
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
                    <div className="md:space-y-[1.2vw]">
                        <FormSection className="pt-[0vw] pb-[2vw] px-[7.4vw] md:!p-[2vw] md:!pt-[.5vw]" bordered={isMobile}>
                            <GoalsTextArea
                                disabled
                                label="Note for User"
                                placeholder="Note for User"
                                data={formData.note ?? ""}
                                labelClassName="font-medium"
                            />
                        </FormSection>
                        <FormSection className="pt-[0vw] pb-[2vw] px-[7.4vw] md:!p-[2vw] md:!pt-[.5vw]" bordered={isMobile}>
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
                        <FormSection className="pt-[0vw] pb-[2vw] px-[7.4vw] md:!p-[2vw] md:!pt-[.5vw]" bordered={isMobile}>
                            <div className="flex items-center justify-between mb-[2vw] md:mb-0">
                                <p className="font-medium">Review</p>
                                <GoalsStarRating
                                    disabled
                                    className="text-right"
                                    starClassName="text-[8vw] md:!text-[2vw]"
                                    totalStars={5}
                                    data={formData.tutor_rating ?? 0}
                                    // setData={(i) => setFormData("tutor_rating", i)}
                                />
                            </div>
                            <GoalsTextArea
                                disabled
                                data={formData.user_note ?? ""}
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
