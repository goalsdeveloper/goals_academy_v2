import React from "react";
import { useState } from "react";

const GoalsCupertinoButton = ({ label = "Goals Button" }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <div className="flex gap-[.8vw] text-[.8vw]">
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative flex rounded-full w-[2.5vw] h-[1.4vw] p-[.15vw] ${
                    isEnabled ? "bg-primary-40" : "bg-neutral-60"
                } transition-all`}
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

export default GoalsCupertinoButton;
