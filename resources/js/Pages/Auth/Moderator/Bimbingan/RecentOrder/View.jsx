import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaWhatsappSquare } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import FileMediaPopup from "../components/FileMediaPopup";

const View = ({ tipe = "bimbingan", detailOrder }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            {createPortal(
                <FileMediaPopup
                    show={isShow}
                    setShow={() => setIsShow(!isShow)}
                    files={detailOrder?.course?.file_uploads}
                />,
                document.body
            )}
            <FormSection title="User Information" className="border">
                <GoalsTextInput
                    label="Username"
                    disabled
                    data={detailOrder?.user?.name}
                    placeholder="Belum Diset"
                />
                <GoalsTextInput
                    label="University"
                    disabled
                    data={detailOrder?.user?.profile?.university}
                    placeholder="Belum Diset"
                />
                <GoalsTextInput
                    label="Major"
                    disabled
                    data={detailOrder.user?.profile?.major}
                    placeholder="Belum Diset"
                />
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput
                        label="Number"
                        grow
                        disabled
                        data={detailOrder.user?.profile?.phone_number}
                        placeholder="Belum Diset"
                    />
                    <a href="wa.me/" target="_blank">
                        <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                    </a>
                </div>
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput
                        label="Tutor  Number"
                        grow
                        disabled
                        data={detailOrder.course?.tutor?.profile?.phone_number}
                    />
                    <a
                        href={`wa.me/${detailOrder.course?.tutor?.profile?.phone_number}`}
                        target="_blank"
                    >
                        <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                    </a>
                </div>
            </FormSection>
            <FormSection
                title="Order Details"
                titleAction={
                    <button
                        onClick={() => setIsShow(!isShow)}
                        className="flex items-center gap-[.4vw] text-[.8vw] text-primary"
                    >
                        File & Media <RxFileText className="md:text-[1vw]" />
                    </button>
                }
                className="border"
            >
                <GoalsTextInput
                    label="Order Id"
                    disabled
                    data={detailOrder.order_code}
                />
                <GoalsTextInput
                    label="Product"
                    disabled
                    data={detailOrder.products?.name}
                />
                <GoalsTextInput
                    label="Topic"
                    disabled
                    data={detailOrder.course?.topic?.topic}
                />
                <GoalsTextInput
                    label={`Location ${
                        tipe == "Webinar" ? "Link Zoom" : "Offline"
                    }`}
                    disabled
                    data={detailOrder.course?.place?.place}
                />
                <div className="flex gap-[.4vw]">
                    <GoalsTextInput
                        label="Date"
                        grow
                        disabled
                        data={detailOrder.course?.date}
                    />
                    <GoalsTextInput
                        label="Time"
                        grow
                        disabled
                        data={detailOrder.course?.time}
                    />
                </div>
            </FormSection>
        </>
    );
};

export default View;
