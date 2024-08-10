import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaWhatsappSquare } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import FileMediaPopup from "../components/FileMediaPopup";

const View = ({ tipe = "bimbingan", detailOrder }) => {
    const [isShow, setIsShow] = useState(false);
    const GetLocationData = () => {
        if (detailOrder.products?.total_meet == 1) {
            switch (detailOrder.products?.contact_type) {
                case "online":
                    return <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={detailOrder.course.location} labelClassName="font-medium" />
                case "offline":
                    return <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${detailOrder.course.place?.place} | ${detailOrder.course.place?.city.city}`} labelClassName="font-medium" />
                case "hybrid":
                    return (
                        <>
                            <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={detailOrder.course.location} labelClassName="font-medium" />
                            <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${detailOrder.course.place?.place} | ${detailOrder.course.place?.city.city}`} labelClassName="font-medium" />
                        </>
                    )
                default:
                    return <></>
            }
        }
    }

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
                    data={detailOrder?.user?.username ?? ''}
                    placeholder="Belum Diset"
                />
                <GoalsTextInput
                    label="University"
                    disabled
                    data={detailOrder?.user?.profile?.university ?? ''}
                    placeholder="Belum Diset"
                />
                <GoalsTextInput
                    label="Major"
                    disabled
                    data={detailOrder.user?.profile?.major ?? ''}
                    placeholder="Belum Diset"
                />
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput
                        label="Number"
                        grow
                        disabled
                        data={detailOrder.user?.profile?.phone_number ?? ''}
                        placeholder="Belum Diset"
                    />
                    <a href={`https://wa.me/62${detailOrder.user?.profile?.phone_number.slice(1) ?? ''}`} target="_blank">
                        <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                    </a>
                </div>
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput
                        label="Tutor  Number"
                        grow
                        disabled
                        data={detailOrder.course?.tutor?.profile?.phone_number ?? ''}
                    />
                    <a
                        href={`https://wa.me/62${detailOrder.course?.tutor?.profile?.phone_number.slice(1) ?? ''}`}
                        target="_blank"
                    >
                        <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                    </a>
                </div>
            </FormSection>
            <FormSection
                title="Order Details"
                titleAction={
                    <a
                        role="button"
                        onClick={() => setIsShow(!isShow)}
                        className="flex items-center gap-[.4vw] text-[.8vw] text-primary"
                    >
                        File & Media <RxFileText className="md:text-[1vw]" />
                    </a>
                }
                className="border"
            >
                <GoalsTextInput
                    label="Order Id"
                    disabled
                    data={detailOrder.order_code ?? ''}
                />
                <GoalsTextInput
                    label="Product"
                    disabled
                    data={detailOrder.products?.name ?? ''}
                />
                <GoalsTextInput
                    label="Topic"
                    disabled
                    data={detailOrder.course?.topic?.topic ?? ''}
                />
                {GetLocationData()}
                <div className="flex gap-[.4vw]">
                    <GoalsTextInput
                        label="Date"
                        grow
                        disabled
                        data={detailOrder.course?.date ?? ''}
                    />
                    <GoalsTextInput
                        label="Time"
                        grow
                        disabled
                        data={detailOrder.course?.time ?? ''}
                    />
                </div>
            </FormSection>
        </>
    );
};

export default View;
