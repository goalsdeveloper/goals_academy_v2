import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import React from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";

const View = ({ tipe = "bimbingan" }) => {
    return (
        <>
            <FormSection title="User Information" className="border">
                <GoalsTextInput label="Username" disabled />
                <GoalsTextInput label="University" disabled />
                <GoalsTextInput label="Major" disabled />
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput label="Number" grow disabled />
                    <a href="wa.me/6289123456789" target="_blank">
                        <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                    </a>
                </div>
                <div className="flex gap-[.4vw] w-full items-end">
                    <GoalsTextInput label="Tutor  Number" grow disabled />
                    <a href="wa.me/6289123456789" target="_blank">
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
                <GoalsTextInput label="Order Id" disabled />
                <GoalsTextInput label="Product" disabled />
                <GoalsTextInput label="Topic" disabled />
                <GoalsTextInput
                    label={`Location ${
                        tipe == "Webinar" ? "Link Zoom" : "Offline"
                    }`}
                    disabled
                />
                <div className="flex gap-[.4vw]">
                    <GoalsTextInput label="Date" grow disabled />
                    <GoalsTextInput label="Time" grow disabled />
                </div>
            </FormSection>
        </>
    );
};

export default View;
