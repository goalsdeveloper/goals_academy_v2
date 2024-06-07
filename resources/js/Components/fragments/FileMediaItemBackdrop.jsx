import { useState } from "react";
import useScrollBlock from "@/Hooks/useScrollBlock";
import { truncateWithEllipsis } from "@/script/utils";
import { router } from "@inertiajs/react";
import { BsThreeDots } from "react-icons/bs";
import { RxFileText } from "react-icons/rx";

const FileMediaItemBackdrop = ({ item, isBackdropVisible = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [blockScroll, allowScroll] = useScrollBlock();

    const handleToggle = () => {
        if (isVisible) {
            setIsVisible(false);
            allowScroll();
        } else {
            setIsVisible(true);
            blockScroll();
        }
    };

    const downloadHandler = (filename) => {
        // router.get(route('file.course.download', {fileName : filename}));
        window.location = route('file.course.download', {fileName : filename})
        handleToggle();
    };

    return (
        <div className="w-full relative flex items-center gap-[1.8vw] md:gap-[.5vw] bg-white shadow p-[1vw] md:p-[.2vw] rounded-[.8vw] md:rounded-[.4vw]">
            <div className="bg-primary-10 w-[11vw] md:w-[2.5vw] aspect-square flex items-center justify-center rounded-[.6vw] md:rounded-[.3vw]">
                <RxFileText className="text-[4.8vw] md:text-[1.3vw] text-primary" />
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-[2.8vw] md:text-[.8vw] text-neutral-80 w-[80%] text-start">
                    {truncateWithEllipsis(item?.name) ||
                        truncateWithEllipsis(item?.title)}
                </p>

                <button onClick={handleToggle}>
                    <BsThreeDots className="text-[2.8vw] md:text-[1vw] text-neutral-40 mr-[.8vw]" />
                </button>
            </div>

            {isVisible && (
                <>
                    <button
                        onClick={(e) =>
                            downloadHandler(item?.filename)
                        }
                        className={`text-[.8vw] font-medium text-neutral-80 px-[5.5vw] py-[3.7vw] md:py-[.8vw] md:px-[1vw] rounded-[1.8vw] md:rounded-[.4vw] shadow-centered-spread absolute -bottom-[70%] right-0 z-[60] bg-white transition-all ${
                            isVisible ? "translate-x-0" : "translate-x-5"
                        }`}
                    >
                        Unduh
                    </button>
                    <div
                        className={`${
                            isBackdropVisible
                                ? "bg-black/20 "
                                : "bg-transparent"
                        } inset-0 fixed top-0 left-0 w-auto h-auto z-[55]`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggle();
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default FileMediaItemBackdrop;
