import React from "react";
import { useState } from "react";

const GoalsCupertinoButton = ({ className, isEnabled=false, setIsEnabled, label = "Goals Button", size='sm', enabledClassName="bg-primary-40", disabled, ...rest }) => {
    function getSizeClassName () {
        switch (size) {
            case 'sm':
                return "w-[2.5vw] h-[1.4vw] p-[.15vw]"
            case 'lg':
                return "w-[3vw] h-[1.7vw] p-[.22vw]"
        }
    }

    return (
        <div className={`flex items-center gap-[.8vw] text-[.8vw] ${className}`}>
            <a
                role={disabled ? "" : "button"}
                onClick={() => disabled ? false : setIsEnabled(!isEnabled)}
                className={`relative flex items-center rounded-full ${getSizeClassName()} ${
                    isEnabled ? enabledClassName : "bg-neutral-60"
                } transition-all`}
                {...rest}
            >
                <div
                    className={`${
                        isEnabled ? "translate-x-full" : "translate-x-0"
                    } h-full aspect-square bg-white rounded-full transition-all`}
                />
            </a>

            {label}
        </div>
    );
};

export default GoalsCupertinoButton;
