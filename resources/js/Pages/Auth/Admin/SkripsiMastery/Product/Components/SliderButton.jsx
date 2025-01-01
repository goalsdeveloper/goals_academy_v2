import React from "react";
import { useState } from "react";

const SliderButton = ({
    className,
    label = "Goals Button",
    isOn = false,
    size = "sm",
    type = "button",
    onClick = () => {},
    ...rest
}) => {
    const [isEnabled, setIsEnabled] = useState(isOn);

    function getSizeClassName() {
        switch (size) {
            case "sm":
                return "w-[2.5vw] h-[1.4vw] p-[.15vw]";
            case "lg":
                return "w-[3vw] h-[1.7vw] p-[.22vw]";
        }
    }

    return (
        <div
            className={`flex items-center gap-[.8vw] text-[.8vw] ${className}`}
        >
            <button
                onClick={() => {
                    setIsEnabled(!isEnabled);
                    onClick && onClick();
                }}
                className={`relative flex items-center rounded-full ${getSizeClassName()} ${
                    isEnabled ? "bg-primary-40" : "bg-neutral-60"
                } transition-all`}
                type={type}
                {...rest}
            >
                <div
                    className={`${
                        isEnabled ? "translate-x-full" : "translate-x-0"
                    } h-full aspect-square bg-white rounded-full transition-all`}
                />
            </button>

            {label}
        </div>
    );
};

export default SliderButton;
