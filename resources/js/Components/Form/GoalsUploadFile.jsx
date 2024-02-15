import { useDropzone } from "react-dropzone";
import FileIcon from "/resources/img/icon/file.svg";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function GoalsUploadFile({ data, setData, removeFile }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            accept: {
                "application/pdf": [],
                "application/msword": [],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [],
            },
            maxFiles: 3,
            maxSize: 10000000,
            onDrop: (acceptedFiles) => {
                setData(acceptedFiles);
            },
        });

    const acceptedFileItems =
        data["document"] &&
        data["document"].map((file) => {
            return (
                <li
                    key={file.path}
                    className="h-[8vw] md:h-[2.5vw] rounded-md flex"
                >
                    <img
                        src={FileIcon}
                        alt="file-icon"
                        className="bg-primary-40 rounded-l p-1 aspect-square"
                    />

                    <div className="flex items-center justify-between w-full pl-[1vw] py-[1vw] pr-[.5vw] border border-l-0 border-neutral-40 rounded-r">
                        <p className="flex-1">{file.path}</p>

                        <button
                            type="button"
                            onClick={() => removeFile(file)}
                            className="flex items-center justify-center aspect-square text-neutral-40"
                        >
                            <FiX className="text-[1.3vw]" />
                        </button>
                    </div>
                </li>
            );
        });

    return (
        <form
        // onSubmit={(e) => {
        //     e.preventDefault();
        //     alert("Lamaran anda telah terkirim!!");
        //     closeDialog();
        // }}
        >
            <div className="flex flex-col w-full gap-2">
                <p>Berkas Pendukung (Opsional)</p>
                <div
                    {...getRootProps()}
                    className="rounded-xl border border-dashed border-neutral-40 p-4 text-black/40 w-full"
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
                    <ul className="space-y-[.4vw]">{acceptedFileItems}</ul>
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
