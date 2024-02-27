import useScrollBlock from "@/Hooks/useScrollBlock";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RxFileText } from "react-icons/rx";

const DetailSatuPertemuan = ({ data, className = "" }) => {
    const gapSize = 1;

    return (
        <div className={`flex gap-[${gapSize}vw] ${className}`}>
            {/* Informasi detil pembelajaran */}
            <div className="border border-neutral-20 w-full rounded-[.8vw] p-[3.3vw] space-y-[1.6vw]">
                <h2 className="h4 font-medium text-secondary">
                    Pelaksanaan Pembelajaran
                </h2>
                <ul className="text-black space-y-[1.25vw]">
                    {data.detailPelaksanaan.map((item, index) => {
                        return (
                            <li key={index} className="space-y-[.2vw]">
                                <h3 className="h6 font-normal text-neutral-50">
                                    {item.title}
                                </h3>
                                <p className="text-[1.25vw] text-neutral-80 font-medium">
                                    {item.value}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="w-full space-y-[1vw]">
                {/* Informasi Tutor */}
                <div
                    className="w-full border border-neutral-20 rounded-[.8vw] p-[3.3vw] space-y-[1.6vw]"
                    style={{
                        height: `calc(50% - ${gapSize * 0.5}vw)`,
                    }}
                >
                    <h2 className="h4 font-medium text-secondary">
                        Informasi Tutor
                    </h2>
                    <ul className="text-black space-y-[1.25vw]">
                        {data.detailTutor.map((item, index) => {
                            return (
                                <li key={index} className="space-y-[.2vw]">
                                    <h3 className="h6 font-normal text-neutral-50">
                                        {item.title}
                                    </h3>
                                    <p className="text-[1.25vw] text-neutral-80 font-medium">
                                        {item.value}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* Lampiran */}
                <div
                    className="w-full border border-neutral-20 rounded-[.8vw] p-[3.3vw] space-y-[1.6vw]"
                    style={{
                        height: `calc(50% - ${gapSize * 0.5}vw)`,
                    }}
                >
                    <h2 className="h4 font-medium text-secondary">
                        File dan media
                    </h2>

                    <div className="space-y-[.2vw]">
                        {data.fileMedia.map((item, index) => {
                            return (
                                <FileMediaItemBackdrop
                                    key={index}
                                    item={item}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailSatuPertemuan;

export const FileMediaItemBackdrop = ({ item }) => {
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

    const downloadHandler = () => {
        handleToggle();
    };

    return (
        <div className="relative flex items-center gap-[.5vw] bg-white shadow-sm p-[.2vw] rounded-[.4vw] ">
            <div className="bg-primary-10 w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-[.3vw]">
                <RxFileText className="text-[1.3vw]" />
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-[.8vw] text-neutral-80">{item.title}</p>

                <button onClick={handleToggle}>
                    <BsThreeDots className="text-[1vw] text-neutral-40 mr-[.8vw]" />
                </button>
            </div>

            {/* {isVisible &&
                ReactDOM.createPortal(
                    <div
                        className="bg-black/20 inset-0 fixed -z-[55]"
                        onClick={downloadHandler}
                    />,
                    document.body
                )} */}

            {isVisible && (
                <>
                    <button
                        onClick={downloadHandler}
                        className={`h6 font-medium text-neutral-80 py-[.8vw] px-[1vw] rounded-[.4vw] shadow-centered-spread absolute -bottom-[70%] right-0 z-[60] bg-white transition-all ${
                            isVisible ? "translate-x-0" : "translate-x-5"
                        }`}
                    >
                        Unduh
                    </button>
                    <div
                        className="bg-black/20 inset-0 fixed z-[55]"
                        onClick={downloadHandler}
                    />
                </>
            )}
        </div>
    );
};
