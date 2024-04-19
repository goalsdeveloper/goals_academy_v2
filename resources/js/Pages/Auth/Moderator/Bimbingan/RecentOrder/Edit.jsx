import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import { FaWhatsappSquare } from "react-icons/fa";
import React from "react";

export default function Edit({ auth }) {
    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Recent Order"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div>
                <Breadcrumb level={3} isLastHidden />

                <form className="flex gap-[1.2vw]">
                    <FormSection title="User Information">
                        <GoalsTextInput label="Username" />
                        <GoalsTextInput label="University" />
                        <GoalsTextInput label="Major" />
                        <div className="flex gap-[.4vw] w-full items-end">
                            <GoalsTextInput label="Number" grow />
                            <a href="wa.me/6289123456789" target="_blank">
                                <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                            </a>
                        </div>
                        <div className="flex gap-[.4vw] w-full items-end">
                            <GoalsTextInput label="Tutor  Number" grow />
                            <a href="wa.me/6289123456789" target="_blank">
                                <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                            </a>
                        </div>
                    </FormSection>
                    <FormSection title="Order Details">
                        <GoalsTextInput label="Order Id" />
                        <GoalsTextInput label="Product" />
                        <GoalsTextInput label="Topic" />
                        <GoalsTextInput label="Lokasi (Offline)" />
                        <div className="flex gap-[.4vw]">
                            <GoalsTextInput label="Date" grow />
                            <GoalsTextInput label="Time" grow />
                        </div>
                    </FormSection>
                </form>
            </div>
        </DashboardLayout>
    );
}
