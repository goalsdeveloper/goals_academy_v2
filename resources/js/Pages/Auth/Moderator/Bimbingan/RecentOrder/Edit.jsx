import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    SelectInput,
    SelectInputItem,
} from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SelectInput";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaWhatsappSquare } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import FileMediaPopup from "../components/FileMediaPopup";

export default function Edit({
    auth,
    tipe = "bimbingan",
    order,
    places,
    tutors,
}) {
    const [isShow, setIsShow] = useState(false);
    const [showPlaces, setShowPlaces] = useState(false);
    const {
        data: formData,
        setData: setFormData,
        patch,
    } = useForm({
        id: "",
        place: order?.course?.place?.place,
        place_id: order?.course?.place?.id,
        tutor: order?.course?.tutor?.name,
        tutor_id: order?.course?.tutor?.id,
        tutor_phone: order?.course?.tutor?.profile?.phone_number,
        date: order?.course?.date ?? "",
        time: order?.course?.time ?? "",
    });
    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Recent Order"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <div className="flex items-center justify-between">
                    <Breadcrumb level={3} isLastHidden />

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            variant="success-bordered"
                            size="sm"
                            onClick={() =>
                                router.replace(
                                    route("moderator.bimbingan.order.index")
                                )
                            }
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            variant="success"
                            size="sm"
                            onClick={() =>
                                patch(
                                    route("moderator.bimbingan.order.update", {
                                        order: order.order_code,
                                    }),
                                    {
                                        data: formData,
                                    }
                                )
                            }
                        >
                            Simpan
                        </GoalsButton>
                    </div>
                </div>

                {createPortal(
                    <FileMediaPopup
                        show={isShow}
                        setShow={() => setIsShow(!isShow)}
                        items={order.file_uploads}
                    />,
                    document.body
                )}
                <div className="flex gap-[1.2vw]">
                    <FormSection title="User Information">
                        <GoalsTextInput
                            label="Username"
                            disabled
                            data={order.user?.username}
                        />
                        <GoalsTextInput
                            label="University"
                            disabled
                            data={
                                order.user?.profile?.university ??
                                "Universitas Belum Diset"
                            }
                        />
                        <GoalsTextInput
                            label="Major"
                            disabled
                            data={
                                order.user?.profile?.major ??
                                "Jurusan Belum Diset"
                            }
                        />
                        <div className="flex gap-[.4vw] w-full items-end">
                            <GoalsTextInput
                                label="Number"
                                grow
                                data={
                                    order.user?.profile?.phone_number ??
                                    "Belum Ada Nomor Telephone"
                                }
                            />
                            <a
                                href={`wa.me/${
                                    order.user.profile.phone_number ??
                                    "6285672771772"
                                }`}
                                target="_blank"
                            >
                                <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[.3vw]" />
                            </a>
                        </div>
                        <div className="flex gap-[.4vw] w-full items-end">
                            <SelectInput
                                value={formData.tutor}
                                label="Tutor"
                                required
                            >
                                {tutors.map((option, i) => (
                                    <SelectInputItem
                                        key={i}
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                tutor_id: option.id,
                                                tutor: option.name,
                                                tutor_phone:
                                                    option.profile
                                                        ?.phone_number ?? "",
                                            })
                                        }
                                    >
                                        {option.name}
                                    </SelectInputItem>
                                ))}
                            </SelectInput>
                            <a
                                href={`wa.me/${formData.tutor_phone}`}
                                target="_blank"
                            >
                                <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[.3vw]" />
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
                                File & Media{" "}
                                <RxFileText className="md:text-[1vw]" />
                            </button>
                        }
                    >
                        <GoalsTextInput
                            label="Order Id"
                            disabled
                            data={order.order_code}
                        />
                        <GoalsTextInput
                            label="Product"
                            disabled
                            data={order.products.name}
                        />
                        <GoalsTextInput
                            label="Topic"
                            disabled
                            data={order.course?.topic ?? "Topic belum diset"}
                        />
                        {order.products.total_meet == 1 && (
                            <>
                                <SelectInput
                                    value={formData.place}
                                    placeholder="Pilih Lokasi"
                                    label={`Location ${
                                        tipe == "Webinar"
                                            ? "Link Zoom"
                                            : "Offline"
                                    }`}
                                    required
                                >
                                    {places.map((option, i) => (
                                        <SelectInputItem
                                            key={i}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    place: option.place,
                                                    place_id: option.id,
                                                })
                                            }
                                        >
                                            {option.place +
                                                " | " +
                                                option.city.city}
                                        </SelectInputItem>
                                    ))}
                                </SelectInput>
                                <div className="flex gap-[.4vw]">
                                    <GoalsTextInput
                                        type="date"
                                        label="Date"
                                        data={formData.date}
                                        grow
                                        required
                                        setData={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e,
                                            })
                                        }
                                    />
                                    <GoalsTextInput
                                        type="time"
                                        label="Time"
                                        data={formData.time}
                                        setData={(e) =>
                                            setFormData({
                                                ...formData,
                                                time: e,
                                            })
                                        }
                                        grow
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </FormSection>
                </div>
            </div>
        </DashboardLayout>
    );
}
