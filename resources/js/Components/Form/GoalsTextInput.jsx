import React from "react";
import { FiX } from "react-icons/fi";

const GoalsTextInput = ({
    type = "text",
    label = "",
    placeholder = "Goals Input",
    className = "",
    error = "",
    success = "",
    data,
    setData,
    cancelButton=false,
    ...rest
}) => {
    return (
        <div className="flex flex-col gap-[2vw] md:gap-[.4vw]">
            {label != "" ? (
                <label>{label}</label>
            ) : (<></>)}
            <div>
                <div className="relative flex">
                    <input
                        {...rest}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full flex justify-between items-center px-[3vw] md:px-[1vw] rounded-md border border-neutral-50 focus:outline-0 text-dark h-[12vw] md:h-[3vw] placeholder:text-light-grey ${className}`}
                    />
                    {cancelButton ? (
                        data != "" ? (
                            <FiX className="absolute right-0 me-[1vw] h-full text-[1.25vw] cursor-pointer" onClick={() => setData("")} />
                        ) : (<></>)
                    ) : (<></>)}
                </div>
                {error != "" ? (
                    <p className="text-red-500 text-[.8vw]">{error}</p>
                ) : (<></>)}
                {success != "" ? (
                    <p className="text-green-500 text-[.8vw]">{success}</p>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default GoalsTextInput;
