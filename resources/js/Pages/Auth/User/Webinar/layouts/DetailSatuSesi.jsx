import FileMediaItemBackdrop from "@/Components/fragments/FileMediaItemBackdrop";
import React from "react";

const DetailSatuSesi = ({ data, className = "" }) => {
    const gapSize = 1;
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
        <div
            className={`flex md:flex-row flex-col gap-[${gapSize}vw] ${className}`}
        >
            {/* Informasi */}
            <div
                className="w-full md:border border-neutral-20 rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]"
                style={{
                    height: `calc(50% - ${gapSize * 0.5}vw)`,
                }}
            >
                <h2 className="font-medium h4 text-secondary">Informasi</h2>
                <ul className="text-black space-y-[1.25vw]">
                    {Object.keys(form_field).map((key) => (
                        <li key={key} className="space-y-[.2vw]">
                            <h3 className="text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50">
                                {form_field[key]}
                            </h3>
                            <p className="text-[3.7vw] md:text-[1.25vw] text-neutral-80 font-medium">
                                {form_result[key]}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Lampiran */}
            <div
                className="w-full md:border border-neutral-20 rounded-[.8vw] py-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]"
                style={{
                    height: `calc(50% - ${gapSize * 0.5}vw)`,
                }}
            >
                <h2 className="font-medium h4 text-secondary">
                    File dan media
                </h2>

                <div className="space-y-[.2vw]">
                    {webinar_properties.files.length != 0 ? (
                        webinar_properties.files.map((item, index) => {
                            return (

                                <FileMediaItemBackdrop
                                    key={index}
                                    item={item}
                                />
                            );
                        })
                    ) : (
                        <div className="w-full text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50 h-full">
                            Tidak ada file yang diupload
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailSatuSesi;
