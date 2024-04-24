import { useDropzone } from "react-dropzone";
import FileIcon from "/resources/img/icon/file.svg";
import { FiUploadCloud, FiX } from "react-icons/fi";
import GoalsButton from "../GoalsButton";

export default function GoalsUploadFile({
    data,
    setData,
    removeFile,
    fileLimit = 3,
    required=false,
    disabled=false,
    displayInput=true,
    label,
    placeholder,
    labelClassName,
    maxSize=10000000,
}) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [],
        },
        maxFiles: fileLimit,
        maxSize: maxSize,
        disabled: disabled,
        onDrop: (acceptedFiles) => {
            if (disabled) {
                return false
            } else {
                if (
                    acceptedFiles.length > fileLimit ||
                    data.length > fileLimit - 1
                ) {
                    alert(`Maksimal ${fileLimit} file`);
                    return;
                }

                const totalSize = acceptedFiles.reduce(
                    (acc, file) => acc + file.size,
                    0
                );

                if (totalSize > maxSize) {
                    alert(`Maksimal ukuran file adalah ${maxSize/1000000}MB`);
                    return;
                }

                setData(acceptedFiles);
            }
        },
    });

    const acceptedFileItems =
        data &&
        data.map((file, i) => {
            return (
                <li key={i} className="h-[10vw] md:h-[2.5vw] rounded-md flex">
                    <img
                        src={FileIcon}
                        alt="file-icon"
                        className="bg-primary-40 rounded-l p-[.8vw] md:p-[.2vw] aspect-square"
                    />

                    <div className="flex items-center justify-between w-full pl-[4vw] py-[4vw] pr-[4vw] md:pl-[1vw] md:py-[1vw] md:pr-[.5vw] border border-l-0 border-neutral-40 rounded-r">
                        <p className="flex-1 line-clamp-1">{file.name}</p>
                        {displayInput && (
                            <button
                                type="button"
                                onClick={() => !disabled && removeFile(file)}
                                className={`${disabled && 'hidden'} flex items-center justify-center aspect-square text-neutral-40`}
                            >
                                <FiX className="text-[5.2vw] md:text-[1.3vw]" />
                            </button>
                        )}
                    </div>
                </li>
            );
        });

    return (
        <form
            className={`${!disabled && "cursor-pointer"} select-none`}
        // onSubmit={(e) => {
        //     e.preventDefault();
        //     alert("Lamaran anda telah terkirim!!");
        //     closeDialog();
        // }}
        >
            <div className="flex flex-col w-full gap-2">
                <p className={labelClassName}>{label}{required && <span className="text-red-600">*</span>}</p>
                {displayInput && (
                    <>
                        <GoalsButton
                            {...getRootProps()}
                            className="md:hidden w-6/12 rounded-[2vw]"
                            isActive={!disabled}
                            activeClassName="bg-skin hover:bg-skin text-secondary"
                        >
                            Pilih File
                        </GoalsButton>
                        <div
                            {...getRootProps()}
                            className={`hidden md:block rounded-xl border border-dashed border-neutral-40 p-4 text-black/40 w-full ${disabled && "bg-gray-50"}`}
                        >
                            <input disabled={disabled} className="disabled:bg-gray-300" {...getInputProps()} required />
                            {isDragActive ? (
                                <div className="flex flex-col justify-center items-center gap-4 text-center h-[14vw] ">
                                    <FiUploadCloud className="text-[3vw]" />

                                    <p className="text-black">Lepas di sini</p>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center gap-[1vw] text-center  h-[14vw]">
                                    <FiUploadCloud className="text-[3vw]" />
                                    {placeholder}

                                    <p>pdf, docx ukuran file tidak lebih dari {maxSize/1000000}MB</p>

                                    <ButtonDropzone disabled={disabled} className="rounded px-[1vw]">
                                        Pilih File
                                    </ButtonDropzone>
                                </div>
                            )}
                        </div>
                    </>
                )}
                <div>
                    <ul className="space-y-[1.6vw] md:space-y-[.4vw]">{acceptedFileItems}</ul>
                </div>
            </div>
        </form>
    );
}

const ButtonDropzone = ({ className, ...rest }) => {
    return (
        <button
            className={`py-1 px-2 rounded ${rest.disabled ? "bg-gray-300 text-gray-500" : "bg-primary-10 text-primary-40"} ${className}`}
            {...rest}
        >
            Pilih File
        </button>
    );
};
