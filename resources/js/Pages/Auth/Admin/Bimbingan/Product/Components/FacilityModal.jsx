import GoalsPopup from "@/Components/elements/GoalsPopup";
import React from "react";
import { SelectInput, SelectInputItem } from "./SelectInput";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";

const FacilityModal = ({ show, setShow, data, setData }) => {
    const [iconData, setIconData] = useState({
        class: "",
        text: "",
    });
    const iconClassname = [
        "fa-solid fa-location-dot",
        "fa-regular fa-calendar",
    ];

    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => {
                    setShow(false);
                }}
            />
            <div
                className={`${
                    show ? "top-0 scale-100" : "top-full scale-0"
                } fixed inset-0 mx-auto grid gap-[1.6vw] w-fit h-fit transition-all duration-500 bg-white shadow-md  rounded-[1vw] p-[1.75vw] z-50 mt-[8vh]`}
            >
                <h2 className="text-center">Add Facility</h2>

                <div className="flex gap-[.5vw]">
                    <SelectInput
                        placeholder="&emsp;"
                        value={<i className={`${iconData.class}`}></i>}
                    >
                        {iconClassname.map((icon) => (
                            <SelectInputItem
                                onClick={() =>
                                    setIconData({ ...iconData, class: icon })
                                }
                                key={icon}
                            >
                                <i className={icon}></i>
                            </SelectInputItem>
                        ))}
                    </SelectInput>

                    <GoalsTextInput
                        type="text"
                        label="Title"
                        data={iconData.text}
                        onChange={(e) =>
                            setIconData({ ...iconData, text: e.target.value })
                        }
                    />
                </div>

                <div className="inline-flex gap-[.8vw]">
                    <GoalsButton
                        size="sm"
                        variant="success-bordered"
                        className="w-full"
                        onClick={() => setShow(false)}
                    >
                        Batal
                    </GoalsButton>
                    <GoalsButton
                        size="sm"
                        variant="success"
                        className="w-full"
                        onClick={() => {
                            setData({
                                ...data,
                                facilities: [
                                    ...data.facilities,
                                    {
                                        icon: iconData.class,
                                        text: iconData.text,
                                    },
                                ],
                            });

                            setShow(false);
                            setIconData({
                                class: "",
                                text: "",
                            });
                        }}
                    >
                        Tambah
                    </GoalsButton>
                </div>
            </div>
        </>
    );
};

export default FacilityModal;