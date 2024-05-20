import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import GoalsButton from "@/Components/elements/GoalsButton";
import React from "react";
import { router, useForm } from "@inertiajs/react";
import FormSection from "@/Pages/Auth/Admin/components/layouts/FormSection";
import { FaWhatsappSquare } from "react-icons/fa";
import {
    SelectInput,
    SelectInputItem,
} from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SelectInput";
import StarRating from "@/Pages/Auth/User/Components/StarRating";
import {
    SelectMultiTag,
    SelectMultiTagItem,
} from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SelectMultiTag";
import SliderButton from "@/Pages/Auth/Admin/Bimbingan/Product/Components/SliderButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { phoneNumberFormat } from "@/script/utils";
import { RxFileText } from "react-icons/rx";
import { createPortal } from "react-dom";
import FileMediaPopup from "../components/FileMediaPopup";

export default function View({ auth, progress, tutors }) {
    const item = [
        {
            url: "https://www.google.com",
            name: "File Name",
        },
    ];

    const [isShow, setIsShow] = React.useState({
        orderDetails: false,
        tutorDetails: false,
    });
    const { data, setData, post } = useForm({
        _method: "put",
        add_on: progress.add_ons ?? undefined,
        username: progress.user.username,
        university: progress.user.profile.university ?? "",
        major: progress.user.profile.major ?? "",
        order_code: progress.order.order_code,
        product: progress.products.name,
        topic: progress.topic?.topic ?? "",
        session: progress.session ?? "",
        date: progress.date ?? "",
        time: progress.time ?? "",
        location: progress.locationv ?? "",
        place: progress.place?.place ?? "",
        city: progress.place?.city.city ?? "",
        number: progress.user.profile.phone_number ?? "",
        tutor: tutors?.find((item) => item.id == progress.tutor_id),
        rate_product: progress.product_review?.rate_product,
        note_product: progress.product_review?.note_product,
        note: progress.note,
        is_moderator: progress.is_moderator,
        record: "",
        tutor_id: progress.tutor_id,
    });

    const GetLocationData = () => {
        switch (progress.products.contact_type) {
            case "online":
                return <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={data.location} labelClassName="font-medium" />
            case "offline":
                return <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${data.place} | ${data.city}`} labelClassName="font-medium" />
            case "hybrid":
                return (
                    <>
                        <GoalsTextInput disabled label="Meeting URL" placeholder="Meeting URL" data={data.location} labelClassName="font-medium" />
                        <GoalsTextInput disabled label="Meeting Location" placeholder="Meeting Location" data={`${data.place} | ${data.city}`} labelClassName="font-medium" />
                    </>
                )
            default:
                return <></>
        }
    }

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <div className="flex items-center justify-between">
                    <Breadcrumb level={2} overrideLast="View" />
                </div>

                {/* Popup Area  */}
                {createPortal(
                    <FileMediaPopup
                        show={isShow.orderDetails || isShow.tutorDetails}
                        setShow={() =>
                            setIsShow({
                                orderDetails: false,
                                tutorDetails: false,
                            })
                        }
                        // files={isShow.orderDetails ? progress.order.files : progress.tutor.files}
                        files={progress.file_uploads}
                    />,
                    document.body
                )}

                {/* Popup Area  */}

                <div className=" gap-[1.2vw] grid grid-cols-2">
                    <div className="flex flex-col gap-[1.2vw]">
                        <FormSection
                            title="User Information"
                            titleAction={
                                <SliderButton
                                    label="Moderator confirmation"
                                    disabled
                                />
                            }
                            className="h-fit"
                        >
                            <GoalsTextInput
                                label="Username"
                                data={data.username}
                                setData={(i) => setData("username", i)}
                                disabled
                            />
                            <GoalsTextInput
                                label="University"
                                disabled
                                data={data.university}
                                setData={(i) => setData("university", i)}
                            />
                            <GoalsTextInput
                                label="Major"
                                disabled
                                data={data.major}
                                setData={(i) => setData("major", i)}
                            />
                            <div className="flex gap-[.4vw] w-full items-end">
                                <GoalsTextInput
                                    label="Number"
                                    grow
                                    disabled
                                    data={data.number}
                                    setData={(i) => setData("number", i)}
                                />
                                <a
                                    href={`https://wa.me/${phoneNumberFormat(
                                        data.number
                                    )}`}
                                    target="_blank"
                                >
                                    <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                                </a>
                            </div>
                            <div className="flex gap-[.4vw] w-full items-end">
                                <SelectInput
                                    label="Tutor"
                                    disabled
                                    value={
                                        (tutors ?? [])?.find(
                                            (item) => item.id == data.tutor.id
                                        ).name
                                    }
                                    className="w-full"
                                >
                                    {(tutors ?? [])?.map((item, index) => {
                                        return (
                                            <SelectInputItem
                                                key={item.id}
                                                onClick={() => {
                                                    setData("tutor", item);
                                                    setData(
                                                        "tutor_id",
                                                        item.id
                                                    );
                                                }}
                                            >
                                                {item.name}
                                            </SelectInputItem>
                                        );
                                    })}
                                </SelectInput>
                                <a
                                    href={`https://wa.me/${phoneNumberFormat(
                                        data?.tutor?.profile?.phone_number
                                    )}`}
                                    target="_blank"
                                >
                                    <FaWhatsappSquare className="text-[#00D95F] text-[3.5vw] -m-[5px]" />
                                </a>
                            </div>
                        </FormSection>
                        <FormSection
                            title="Review"
                            titleAction={
                                <StarRating
                                    totalStars={5}
                                    rating={data.rate_product}
                                    size="sm"
                                />
                            }
                        >
                            <textarea
                                id="deskripsi"
                                placeholder="Deskripsi singkat tentang program ini"
                                disabled
                                className="disabled:bg-gray-100 disabled:border-gray-300 w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                            >
                                {data.note_product}
                            </textarea>
                        </FormSection>
                    </div>
                    <div className="flex flex-col gap-[1.2vw]">
                        <FormSection
                            title="Order Details"
                            titleAction={
                                <button
                                    onClick={() =>
                                        setIsShow({ orderDetails: true })
                                    }
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
                                data={data.order_code}
                                setData={(i) => setData("order_code", i)}
                            />
                            <GoalsTextInput
                                label="Product"
                                disabled
                                data={data.product}
                                setData={(i) => setData("product", i)}
                            />
                            <GoalsTextInput
                                label="Topic"
                                disabled
                                data={data.topic}
                                setData={(i) => setData("topic", i)}
                            />
                            {/* <GoalsTextInput label="Add-on" disabled /> */}
                            <SelectMultiTag
                                disabled
                                value={data.add_on}
                                label="Add on"
                                handleClearTag={() =>
                                    setData({ ...data, add_on: [] })
                                }
                            >
                                {(data.add_on ?? []).map((option, i) => {
                                    return (
                                        <SelectMultiTagItem
                                            key={i}
                                            onClick={() => {
                                                if (
                                                    !data.add_on.some(
                                                        (item) =>
                                                            item === option
                                                    )
                                                ) {
                                                    setData({
                                                        ...data,
                                                        add_on: [
                                                            ...data.add_on,
                                                            option,
                                                        ],
                                                    });
                                                }
                                            }}
                                        >
                                            {option.name}
                                        </SelectMultiTagItem>
                                    );
                                })}
                            </SelectMultiTag>
                            {data.session && (
                                <GoalsTextInput
                                    label="Session"
                                    disabled
                                    data={data.session}
                                    setData={(i) => setData("session", i)}
                                />
                            )}
                            {GetLocationData()}
                            <div className="flex gap-[.8vw]">
                                <GoalsTextInput
                                    label="Date"
                                    grow
                                    disabled
                                    data={data.date}
                                    setData={(i) => setData("date", i)}
                                />
                                <GoalsTextInput
                                    label="Time"
                                    grow
                                    disabled
                                    data={data.time}
                                    setData={(i) => setData("time", i)}
                                />
                            </div>

                            <input
                                type="file"
                                className=""
                                accept="application/pdf"
                                disabled
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        record: e.target.files[0],
                                    })
                                }
                            />
                        </FormSection>
                        <FormSection
                            title="Tutor Information"
                            titleAction={
                                <button
                                    onClick={() =>
                                        setIsShow({ tutorDetails: true })
                                    }
                                    className="flex items-center gap-[.4vw] text-[.8vw] text-primary"
                                >
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
                            >
                                {data.note}
                            </textarea>
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
