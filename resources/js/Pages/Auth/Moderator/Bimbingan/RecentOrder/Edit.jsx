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
import toast from "react-hot-toast";
import { FaWhatsappSquare } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import FileMediaPopup from "../components/FileMediaPopup";
import { canSubmitFormCheckerRecentOrder } from "../utils";
import moment from "moment";

export default function Edit({ auth, order, places, tutors }) {
    const [isShow, setIsShow] = useState(false);
    const [showPlaces, setShowPlaces] = useState(false);
    const {
        data: formData,
        setData: setFormData,
        patch,
    } = useForm({
        id: "",
        place: `${order?.course?.place?.place} | ${order?.course?.place?.city.city}`,
        place_id: order?.course?.place?.id,
        location: order?.courser?.location,
        tutor: order?.course?.tutor?.name,
        tutor_id: order?.course?.tutor?.id,
        tutor_phone: order?.course?.tutor?.profile?.phone_number,
        date: order?.course?.date ?? "",
        time: order?.course?.time ?? "",
    });

    const GetLocationForm = () => {
        if (order.products?.total_meet == 1) {
            switch (order.products?.contact_type) {
                case "online":
                    return (
                        <GoalsTextInput
                            label="Meeting URL"
                            placeholder="Meeting URL"
                            data={formData.location}
                            setData={(i) => setFormData("location", i)}
                            labelClassName="font-medium"
                            required
                        />
                    );
                case "offline":
                    return (
                        <SelectInput
                            label="Meeting Location"
                            placeholder="Meeting Location"
                            value={formData.place}
                            labelClassName="font-medium"
                            required
                        >
                            {places.map((option, i) => (
                                <SelectInputItem
                                    key={i}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            place: `${option.place} | ${option.city.city}`,
                                            place_id: option.id,
                                        })
                                    }
                                >
                                    {`${option.place} | ${option.city.city}`}
                                </SelectInputItem>
                            ))}
                        </SelectInput>
                    );
                case "hybrid":
                    return (
                        <>
                            <GoalsTextInput
                                label="Meeting URL"
                                placeholder="Meeting URL"
                                data={formData.location}
                                setData={(i) => setFormData("location", i)}
                                labelClassName="font-medium"
                            />
                            <SelectInput
                                label="Meeting Location"
                                placeholder="Meeting Location"
                                value={formData.place}
                                labelClassName="font-medium"
                            >
                                {places.map((option, i) => (
                                    <SelectInputItem
                                        key={i}
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                place: `${option.place} | ${option.city.city}`,
                                                place_id: option.id,
                                            })
                                        }
                                    >
                                        {`${option.place} | ${option.city.city}`}
                                    </SelectInputItem>
                                ))}
                            </SelectInput>
                        </>
                    );
                default:
                    return <></>;
            }
        }
    };

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
                            disabled={
                                canSubmitFormCheckerRecentOrder(order, formData)
                            }
                            onClick={() =>
                                patch(
                                    route("moderator.bimbingan.order.update", {
                                        order: order.order_code,
                                    }),
                                    {
                                        data: formData,
                                        onSuccess: () =>
                                            toast.success(
                                                "Order berhasil diupdate"
                                            ),
                                        onError: () =>
                                            toast.error("Order gagal diupdate"),
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
                        files={order.course?.file_uploads}
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
                                disabled
                                data={
                                    order.user?.profile?.phone_number ??
                                    "Belum Ada Nomor Telepon"
                                }
                            />
                            <a
                                href={`https://wa.me/62${order.user.profile.phone_number ? order.user.profile.phone_number.substring(1) : ""}`}
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
                                href={`https://wa.me/62${formData.tutor_phone ? formData.tutor_phone.substring(1) : ""}`}
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
                            data={
                                order.course?.topic?.topic ??
                                "Topic belum diset"
                            }
                        />
                        {(order.products.total_meet == 1 & order.products.contact_type != "other") == true && (
                            <>
                                {GetLocationForm()}
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
                                                time: moment(e).format("HH:mm"),
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
