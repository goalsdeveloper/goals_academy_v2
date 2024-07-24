import FileMediaItemBackdrop from "@/Components/fragments/FileMediaItemBackdrop";

function FileMediaPopup({ show, setShow, files }) {
    return (
        <div
            className={`${
                show ? "" : "opacity-0 pointer-events-none"
            } z-[999] fixed w-full h-full top-0 overflow-auto bg-dark focus:bg-red-400 bg-opacity-50 transition-all duration-300`}
            onClick={() => setShow()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    show
                        ? "md:top-0 md:bottom-0 scale-100"
                        : "md:top-full md:-bottom-full scale-0"
                } inset-0 mx-auto grid text-center gap-[6.4vw] md:gap-[1.6vw] w-[92vw] md:w-[23vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-[4vw] md:rounded-[1vw] p-[8vw] md:p-[1.6vw] z-50 mt-[36vh] md:my-[8vh] `}
            >
                <h2 className="text-[4vw] md:text-[1vw] font-medium text-start">
                    File & Media
                </h2>

                {files?.length > 0 ? (
                    (files ?? []).map((file, i) => (
                        <FileMediaItemBackdrop item={file} key={i} />
                    ))
                ) : (
                    <div className="text-center">
                        <p className="text-gray-400 text-[4vw] md:text-[1vw]">Belum ada file media</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileMediaPopup;
