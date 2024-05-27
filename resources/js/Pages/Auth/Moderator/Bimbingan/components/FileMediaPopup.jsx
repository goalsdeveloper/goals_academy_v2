ssimport FileMediaItemBackdrop from "@/Components/fragments/FileMediaItemBackdrop";

function FileMediaPopup({ show, setShow, files }) {
    return (
        <div
            className={`${
                show ? "" : "opacity-0 pointer-events-none"
            } z-50 fixed w-full h-full top-0 overflow-auto bg-dark focus:bg-red-400 bg-opacity-50 transition-all duration-300`}
            onClick={() => setShow()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    show
                        ? "md:top-0 bottom-0 scale-100"
                        : "md:top-full -bottom-full scale-0"
                } inset-0 mx-auto grid text-center gap-[1.6vw] w-[23vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.6vw] z-50 my-[8vh] `}
            >
                <h2 className="text-[1vw] font-medium text-start">
                    File & Media
                </h2>

                {files?.length > 0 ? (
                    (files ?? []).map((file, i) => (
                        <FileMediaItemBackdrop item={file} key={i} />
                    ))
                ) : (
                    <div className="text-center">
                        <p className="text-gray-400 ">Belum ada file media</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileMediaPopup;
