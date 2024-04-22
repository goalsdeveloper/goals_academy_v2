import React from "react";
import { FiX } from "react-icons/fi";

const GoalsTextInput = ({
    type = "text",
    label = "",
    placeholder = "Goals Input",
    className = "",
    labelClassName,
    messageClassName,
    error = "",
    success = "",
    data,
    setData,
    cancelButton = false,
    required = false,
    grow = false,
    disabled = false,
    ...rest
}) => {
    return (
        <div
            className={`flex flex-col ${
                grow ? "w-full" : ""
            } gap-[2vw] md:gap-[.4vw]`}
        >
            {label !== "" && (
                <label className={labelClassName}>
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <div>
                <div className="relative flex">
                    <input
                        required={required}
                        type={type}
                        placeholder={placeholder}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className={`w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[3vw] border placeholder:text-light-grey ${
                            disabled ? "bg-gray-100 border-gray-300" : "border-neutral-50 focus:border-neutral-50"
                        } ${
                            cancelButton ? "pe-[9vw] md:pe-[2.6vw]" : ""
                        } ${className}`}
                        disabled={disabled}
                        {...rest}
                    />
                    {cancelButton && data !== "" && (
                        <div className="absolute right-0 top-[5%] me-[2.4vw] md:me-[.8vw] h-[90%] cursor-pointer bg-white flex items-center">
                            <FiX
                                className="text-[4.5vw] md:text-[1.25vw]"
                                onClick={() => setData("")}
                            />
                        </div>
                    )}
                </div>
                {error !== "" && (
                    <p className={`text-red-500 text-[3.6vw] md:text-[.9vw] ${messageClassName}`}>
                        {error}
                    </p>
                )}
                {success !== "" && (
                    <p className={`text-green-500 text-[3.6vw] md:text-[.9vw] ${messageClassName}`}>
                        {success}
                    </p>
                )}
            </div>
        </div>
    );
};

export default GoalsTextInput;
