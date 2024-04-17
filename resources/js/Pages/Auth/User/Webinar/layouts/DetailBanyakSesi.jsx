import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { templateDataDetailBanyakSesi as template } from "../data";
import { FileMediaItemBackdrop } from "../../Bimbingan/layouts/DetailSatuPertemuan";
import { getValue } from "@/script/utils";
import DetailSatuSesi from "./DetailSatuSesi";

const DetailBanyakSesi = ({ data }) => {
    const [showDetail, setShowDetail] = React.useState(null);
    const gapSize = 1;

    const sessions = data.webinar_properties.session;
    const webinar_properties = data.webinar_properties;

    const form_field = {
        title: "Judul",
        pemateri: "Pemateri",
    };

    const form_result = {
        title: data.name,
        pemateri: webinar_properties.pemateri,
    };

    return (
        <div className="relative space-y-[2vw]">
            <div className="space-y-[.8vw]">
                {sessions.map((session, index) => {
                    return (
                        <React.Fragment key={index}>
                            <button
                                onClick={() => {
                                    showDetail == session.title
                                        ? setShowDetail(null)
                                        : setShowDetail(session.title);
                                }}
                                className="relative w-full flex md:border border-neutral-20 p-[3.7vw] md:p-[1.2vw] gap-[2.9vw] rounded-[.8vw] shadow md:shadow-none justify-between items-center"
                            >
                                <h3 className="font-medium text-[3.7vw] md:text-[1.2vw]">
                                    {session.title}
                                </h3>

                                <span className="flex items-center gap-[.5vw] font-medium text-[3.25vw] md:text-[1vw]">
                                    <FiChevronDown
                                        className={`pt-[.4vw] md:pt-[.2vw] text-[4vw] md:text-[1.5vw] transition-all duration-300 ${
                                            showDetail == session.title
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                    Lihat Detail
                                </span>
                            </button>

                            {showDetail === session.title && (
                                <div
                                    className={`flex md:flex-row flex-col gap-[${gapSize}vw]`}
                                >
                                    {/* Informasi */}
                                    <div
                                        className="w-full md:border border-neutral-20 rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]"
                                        style={{
                                            height: `calc(50% - ${
                                                gapSize * 0.5
                                            }vw)`,
                                        }}
                                    >
                                        <h2 className="h4 font-medium text-secondary">
                                            Informasi
                                        </h2>
                                        <ul className="text-black space-y-[1.25vw]">
                                            {Object.keys(form_field).map(
                                                (key) => (
                                                    <li
                                                        key={key}
                                                        className="space-y-[.2vw]"
                                                    >
                                                        <h3 className="text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50">
                                                            {form_field[key]}
                                                        </h3>
                                                        <p className="text-[3.7vw] md:text-[1.25vw] text-neutral-80 font-medium">
                                                            {form_result[key]}
                                                        </p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* Lampiran */}
                                    <div
                                        className="w-full md:border border-neutral-20 rounded-[.8vw] py-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]"
                                        style={{
                                            height: `calc(50% - ${
                                                gapSize * 0.5
                                            }vw)`,
                                        }}
                                    >
                                        <h2 className="h4 font-medium text-secondary">
                                            File dan media
                                        </h2>

                                        <div className="space-y-[.2vw]">
                                            {session.files.length != 0 ? (
                                                session.files.map(
                                                    (item, index) => {
                                                        return (
                                                            <FileMediaItemBackdrop
                                                                key={index}
                                                                item={item}
                                                            />
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div className="w-full text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50 h-full">
                                                    Tidak ada file yang diupload
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailBanyakSesi;
