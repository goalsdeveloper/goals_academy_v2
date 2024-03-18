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
}) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [],
        },
        maxFiles: fileLimit,
        maxSize: 10000000,
        onDrop: (acceptedFiles) => {
            console.log(data["document"].length);
            if (
                acceptedFiles.length > fileLimit ||
                data["document"].length > fileLimit - 1
            ) {
                alert("Maksimal 3 file");
                return;
            }

            const totalSize = acceptedFiles.reduce(
                (acc, file) => acc + file.size,
                0
            );

            if (totalSize > 10000000) {
                alert("Maksimal ukuran file adalah 10MB");
                return;
            }

            setData(acceptedFiles);
        },
    });

    const acceptedFileItems =
        data["document"] &&
        data["document"].map((file, i) => {
            return (
                <li key={i} className="h-[10vw] md:h-[2.5vw] rounded-md flex">
                    <img
                        src={FileIcon}
                        alt="file-icon"
                        className="bg-primary-40 rounded-l p-[.8vw] md:p-[.2vw] aspect-square"
                    />

                    <div className="flex items-center justify-between w-full pl-[4vw] py-[4vw] pr-[4vw] md:pl-[1vw] md:py-[1vw] md:pr-[.5vw] border border-l-0 border-neutral-40 rounded-r">
                        <p className="flex-1 line-clamp-1">{file.path}</p>

                        <button
                            type="button"
                            onClick={() => removeFile(file)}
                            className="flex items-center justify-center aspect-square text-neutral-40"
                        >
                            <FiX className="text-[5.2vw] md:text-[1.3vw]" />
                        </button>
                    </div>
                </li>
            );
        });

    return (
        <form
            className="cursor-pointer"
        // onSubmit={(e) => {
        //     e.preventDefault();
        //     alert("Lamaran anda telah terkirim!!");
        //     closeDialog();
        // }}
        >
            <div className="flex flex-col w-full gap-2">
                <p>Berkas Pendukung<sup className={`${required ? "" : "hidden"} text-red-600`}>*</sup></p>
                <GoalsButton
                    {...getRootProps()}
                    className="md:hidden w-6/12 rounded-[2vw]"
                    activeClassName="bg-skin hover:bg-skin text-secondary"
                >
                    Pilih File
                </GoalsButton>
                <div
                    {...getRootProps()}
                    className="hidden md:block rounded-xl border border-dashed border-neutral-40 p-4 text-black/40 w-full"
                >
                    <input {...getInputProps()} required />
                    {isDragActive ? (
                        <div className="flex flex-col justify-center items-center gap-4 text-center h-[14vw] ">
                            <FiUploadCloud className="text-[3vw]" />

                            <p className="text-black">Lepas di sini</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-[1vw] text-center  h-[14vw]">
                            <FiUploadCloud className="text-[3vw]" />

                            <p className="text-black">
                                Pilih file skripsi mu atau <br /> seret dan
                                lepas di sini
                            </p>

                            <p>pdf, docx ukuran file tidak lebih dari 10MB</p>

                            <ButtonDropzone className="rounded px-[1vw] bg-primary-10">
                                Pilih File
                            </ButtonDropzone>
                        </div>
                    )}
                </div>

                <div>
                    <ul className="space-y-[1.6vw] md:space-y-[.4vw]">{acceptedFileItems}</ul>
                </div>
            </div>
        </form>
    );
}

const ButtonDropzone = ({ className }) => {
    return (
        <button
            className={`bg-primary-10 py-1 px-2 rounded text-primary-40 ${className}`}
        >
            Pilih File
        </button>
    );
};
