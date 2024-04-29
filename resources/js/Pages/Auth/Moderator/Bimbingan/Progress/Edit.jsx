import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import GoalsButton from "@/Components/elements/GoalsButton";
import React from "react";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import SliderButton from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SliderButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { FaWhatsappSquare } from "react-icons/fa";
import {
    SelectInput,
    SelectInputItem,
} from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SelectInput";
import StarRating from "@/Pages/Auth/User/Components/StarRating";
import { RxFileText } from "react-icons/rx";

export default function Edit({ auth, progress }) {
    console.log(progress);

    const type = "tuntas";

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <div className="flex justify-between items-center">
                    <Breadcrumb level={2} isSlug />

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            variant="success-bordered"
                            size="sm"
                            onClick={() =>
                                router.replace(
                                    route("moderator.bimbingan.progress.index")
                                )
                            }
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            variant="success"
                            size="sm"
                            onClick={() =>
                                post(
                                    "moderator.bimbingan.progress.updateOnline",
                                    {
                                        data: data,
                                    }
                                )
                            }
                        >
                            Simpan
                        </GoalsButton>
                    </div>
                </div>

                <div className=" gap-[1.2vw] grid grid-cols-2">
                    <div className="grid gap-[1.2vw]">
                        <FormSection
                            title="User Information"
                            titleAction={
                                <SliderButton label="Moderator confirmation" />
                            }
                        >
                            <GoalsTextInput label="Username" disabled />
                            <GoalsTextInput label="University" disabled />
                            <GoalsTextInput label="Major" disabled />
                            <div className="flex gap-[.4vw] w-full items-end">
                                <GoalsTextInput label="Number" grow />
                                <a href="wa.me/6289123456789" target="_blank">
                                    <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                                </a>
                            </div>
                            <div className="flex gap-[.4vw] w-full items-end">
                                <SelectInput label="Tutor" className="w-full">
                                    <SelectInputItem>s</SelectInputItem>
                                </SelectInput>
                                <a href="wa.me/6289123456789" target="_blank">
                                    <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                                </a>
                            </div>
                        </FormSection>
                        <FormSection
                            title="Review"
                            titleAction={
                                <StarRating totalStars={5} size="sm" />
                            }
                        >
                            <textarea
                                id="deskripsi"
                                placeholder="Deskripsi singkat tentang program ini"
                                disabled
                                className="disabled:bg-gray-100 disabled:border-gray-300 w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                            ></textarea>
                        </FormSection>
                    </div>
                    <div className="grid gap-[1.2vw]">
                        <FormSection
                            title="Order Details"
                            titleAction={
                                <button className="flex items-center gap-[.4vw] text-[.8vw] text-primary">
                                    File & Media{" "}
                                    <RxFileText className="md:text-[1vw]" />
                                </button>
                            }
                        >
                            <GoalsTextInput label="Order Id" disabled />
                            <GoalsTextInput label="Product" disabled />
                            <GoalsTextInput label="Topic" disabled />
                            <GoalsTextInput label="Add-on" disabled />

                            {type === "tuntas" && (
                                <GoalsTextInput label="Session" disabled />
                            )}

                            <GoalsTextInput
                                label="Location (Link Zoom)"
                                disabled
                            />
                            <div className="flex gap-[.8vw]">
                                <GoalsTextInput label="Date" disabled grow />
                                <GoalsTextInput label="Time" disabled grow />
                            </div>

                            <input type="file" className="" />
                        </FormSection>
                        <FormSection
                            title="Tutor Information"
                            titleAction={
                                <button className="flex items-center gap-[.4vw] text-[.8vw] text-primary">
                                    File & Media{" "}
                                    <RxFileText className="md:text-[1vw]" />
                                </button>
                            }
                        >
                            <textarea
                                id="deskripsi"
                                placeholder="Deskripsi singkat tentang program ini"
                                disabled
                                className="disabled:bg-gray-100 disabled:border-gray-300 w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                            ></textarea>
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
