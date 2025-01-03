import React from "react";
import { FiX } from "react-icons/fi";

const GoalsTextArea = ({
    type = "text",
    label = "",
    name,
    placeholder = "Goals Input",
    className = "",
    labelClassName,
    messageClassName,
    rows=5,
    cols,
    error = "",
    success = "",
    data,
    setData,
    cancelButton = false,
    required = false,
    grow = false,
    disabled = false,
    resize = false,
    ...rest
}) => {
    return (
        <div
            className={`flex flex-col ${
                grow ? "w-full" : ""
            } gap-[2vw] md:gap-[.4vw]`}
        >
            {label !== "" && (
                <label htmlFor={name} className={labelClassName}>
                    {label}
                    {required ? <span className="text-red-600">*</span> : <></>}
                </label>
            )}
            <div>
                <div className="relative flex">
                    <textarea
                        id={name}
                        name={name}
                        required={required}
                        // type={type}
                        placeholder={placeholder}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className={`w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 p-[3vw] md:p-[1vw] rounded-md text-dark border placeholder:text-light-grey ${
                            disabled ? "bg-gray-100 border-gray-300" : "border-neutral-50 focus:border-neutral-50"
                        } ${
                            cancelButton ? "pe-[9vw] md:pe-[2.6vw]" : ""
                        } ${className}`}
                        disabled={disabled}
                        style={{ resize: resize ? "" : "none"}}
                        rows={rows}
                        cols={cols}
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

export default GoalsTextArea;
