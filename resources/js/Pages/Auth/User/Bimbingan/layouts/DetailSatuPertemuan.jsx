import FileMediaItemBackdrop from "@/Components/fragments/FileMediaItemBackdrop";

function getFieldData(data) {
    let title = {};
    let desc = {};

    if (
        data.products.contact_type === "offline" ||
        data.products.contact_type === "hybrid"
    ) {
        title = {
            ...title,
            city: "Kota Pelaksanaan",
            place: "Lokasi Pelaksanaan",
        };
        desc = {
            ...desc,
            city: data?.location?.city?.city ?? "Kota Belum Diatur",
            place: data?.place?.place ?? "Lokasi Belum Diatur",
        };
    } else if (data.products.contact_type === "online") {
        title = {
            ...title,
            link: "Link Meet",
        };
        desc = {
            ...desc,
            link: data?.location ?? "Link Meet Belum Diatur",
        };
    }

    return { title, desc };
}

const DetailSatuPertemuan = ({ data, className = "" }) => {
    const gapSize = 1;

    const form_field = {
        schedule: "Jadwal Pelaksanaan",
        time: "Jam Pelaksanaan",
        topic: "Topik Bimbingan",
        ...getFieldData(data).title,
        // add_on: "Add On",
        // document: "Lampiran Dokumen",
    };
    const form_result = {
        schedule:
            new Date(data?.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
            }) ?? "Jadwal Belum Diatur",
        time: data?.time ?? "Jam Belum Diatur",
        topic: data?.topic?.topic ?? "Topik Belum Diatur",
        ...getFieldData(data).desc,
        // add_on:
        //     data?.add_ons?.map((item) => item["name"]).join(", ") != ""
        //         ? data?.add_ons?.map((item) => item["name"]).join(", ")
        //         : "Tidak Ada Add Ons",
        // document: "Lampiran Dokumen",
    };

    return (
        <div className={`md:flex gap-[${gapSize}vw] ${className}`}>
            {/* Informasi detil pembelajaran */}
            <div className="md:border border-neutral-20 w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                <h2 className="font-medium h4 text-secondary">
                    Pelaksanaan Pembelajaran
                </h2>
                <ul className="text-black space-y-[1.8vw] md:space-y-[1.25vw]">
                    {Object.keys(form_field).map((key) => (
                        <li
                            key={key}
                            className="grid space-y-[.9vw] md:space-y-[.2vw]"
                        >
                            <label className="text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50">
                                {form_field[key]}
                            </label>
                            {key == "link" && form_result[key] != 'Link Meet Belum Diatur' ? (
                                <a
                                    href={form_result[key]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[3.7vw] md:text-[1.25vw] text-info-40 font-medium"
                                >
                                    {form_result[key]}
                                </a>
                            ) : (
                                <p className="text-[3.7vw] md:text-[1.25vw] text-neutral-80 font-medium">
                                    {form_result[key]}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full space-y-[1vw]">
                {/* Informasi Tutor */}
                <div
                    className="w-full md:border border-neutral-20 rounded-[.8vw] py-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]"
                    style={{
                        height: `calc(50% - ${gapSize * 0.5}vw)`,
                    }}
                >
                    <h2 className="font-medium h4 text-secondary">
                        Informasi Tutor
                    </h2>
                    <ul className="text-black space-y-[1.8vw] md:space-y-[1.25vw]">
                        {/* <li className="space-y-[.9vw] md:space-y-[.2vw]">
                            <h3 className="text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50">
                                Lampiran Dokumen Hasil
                            </h3>
                            <button className="text-[3.7vw] md:text-[1.25vw] text-neutral-80 font-medium">
                                Ludi-Revisi.pdf
                            </button>
                        </li> */}
                        <li className="space-y-[.9vw] md:space-y-[.2vw]">
                            <h3 className="text-[2.8vw] md:text-[.8vw] font-normal text-neutral-50">
                                Catatan Dari Tutor
                            </h3>
                            <p className="text-[3.7vw] md:text-[1.25vw] text-neutral-80 font-medium">
                                {data.note ?? "Tidak ada catatan dari tutor"}
                            </p>
                        </li>
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

                    <div className="space-y-[.8vw] md:space-y-[.2vw]">
                        {data.file_uploads.length != 0 ? (
                            data.file_uploads.map((item, index) => {
                                return (
                                    <FileMediaItemBackdrop
                                        isBackdropVisible={false}
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
        </div>
    );
};

export default DetailSatuPertemuan;
