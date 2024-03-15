import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import MainLayout from "@/Layouts/MainLayout";
import "@/script/momentCustomLocale";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

// import { detailData as dataBimbingan } from "./data";
import DetailSatuPertemuan from "./layouts/DetailSatuPertemuan";
import DetailBanyakPertemuan from "./layouts/DetailBanyakPertemuan";

export default function DetailPesanan({ auth, courseDetail, cities, date }) {
    const dataBimbingan = courseDetail;
    const data = {
        status: "Selesai",
    };

    const [showPopUp, setShowPopUp] = useState({
        ulasanTutor: false,
        ulasanProgram: false,
        selesaiProgram: false,
    });

    const dataAturJadwalComp = { cities, date };

    console.log(dataAturJadwalComp)

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <MainLayout
            withFooter={false}
            auth={auth}
            title="Detail Pembelajaran"
            className="pb-[16vw] md:pb-0"
        >
            <div className="container mx-auto md:space-y-[2.5vw] text-secondary mb-[5.2vw]">
                <Link
                    href="/bimbingan"
                    className="hidden md:flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>

                <div className="flex justify-between items-center">
                    <SelesaiProgram
                        show={showPopUp.selesaiProgram}
                        setShow={(prev) =>
                            setShowPopUp({
                                ...prev,
                                selesaiProgram: false,
                            })
                        }
                    />
                    <UlasanTutor
                        show={showPopUp.ulasanTutor}
                        setShow={(prev) =>
                            setShowPopUp({
                                ...prev,
                                ulasanTutor: false,
                                ulasanProgram: true,
                            })
                        }
                    />
                    <UlasanProgram
                        show={showPopUp.ulasanProgram}
                        setShow={(prev) =>
                            setShowPopUp({
                                ...prev,
                                ulasanProgram: false,
                            })
                        }
                    />

                    {isMobile ? (
                        <Link
                            href="/bimbingan"
                            className="flex items-center gap-[1.5vw] text-black"
                        >
                            <FiChevronLeft className="md:hidden text-[4vw]" />
                            <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                                Detail Pembelajaran
                            </h1>
                        </Link>
                    ) : (
                        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                            Detail Pembelajaran
                        </h1>
                    )}

                    <div className="fixed md:relative w-full md:w-auto bottom-0 left-0 flex gap-[1vw] md:gap-[.5vw] justify-center pb-[3.7vw] pt-[3.4vw] bg-white md:p-0 z-[40] md:z-0">
                        <GoalsButton
                            variant="bordered"
                            onClick={(prev) =>
                                setShowPopUp({
                                    ...prev,
                                    ulasanTutor: true,
                                })
                            }
                            className="px-[6.1vw]"
                        >
                            Beri Ulasan
                        </GoalsButton>

                        <GoalsButton
                            onClick={(prev) =>
                                setShowPopUp({
                                    ...prev,
                                    selesaiProgram: true,
                                })
                            }
                            className="px-[6.1vw]"
                        >
                            Selesaikan Pembelajaran
                        </GoalsButton>
                    </div>
                </div>

                {dataBimbingan.length > 1 ? (
                    <DetailBanyakPertemuan
                        data={dataBimbingan}
                        dataAturJadwalComp={dataAturJadwalComp}
                    />
                ) : (
                    <DetailSatuPertemuan data={dataBimbingan[0]} />
                )}
            </div>
        </MainLayout>
    );
}

const SelesaiProgram = ({ show, setShow }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="h-fit md:max-w-[23.5vw]"
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <h3 className="h4 font-semibold">Selesaikan Bimbingan</h3>

                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Apakah kamu ingin menyelesaikan bimbingan?
                </p>

                <div className="grid space-y-[2vw] md:space-y-[.8vw] w-full">
                    <GoalsButton onClick={() => setShow()}>
                        Selesaikan
                    </GoalsButton>
                    <GoalsButton variant="bordered" onClick={() => setShow()}>
                        Kembali
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

const UlasanTutor = ({ show, setShow }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="md:max-w-[23.5vw]"
            isBgClickDisabled
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <h3 className="h4 font-medium md:font-semibold">
                    Beri Ulasan Tutor
                </h3>

                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Bagaimana kepuasan kamu setelah
                    <br />
                    melakukan bimbingan bersama tutor?
                </p>

                <div className="grid space-y-[7.4vw] md:space-y-[.8vw] w-full">
                    <textarea
                        placeholder="Ketik ulasan kamu disini"
                        className="h-[37vw] md:h-[8.3vw] px-[4vw] py-[2.5vw] md:px-[.8vw] md:py-[.5vw]  rounded-md border border-neutral-50 focus:outline-0 text-dark text-[4.6vw] md:text-[1vw]"
                        style={{ resize: "none" }}
                    />
                    <GoalsButton onClick={setShow}>
                        Lanjutkan Ulasan
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

const UlasanProgram = ({ show, setShow }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="md:max-w-[23.5vw]"
            isBgClickDisabled
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <h3 className="h4 font-semibold">Beri Ulasan Program</h3>

                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Bagaimana perasaan kamu setelah <br />
                    melakukan bimbingan?
                </p>

                <div className="grid space-y-[7.4vw] md:space-y-[.8vw] w-full">
                    <textarea
                        className="h-[37vw] md:h-[8.3vw] px-[4vw] py-[2.5vw] md:px-[.8vw] md:py-[.5vw]  rounded-md border border-neutral-50 focus:outline-0 text-dark text-[4.6vw] md:text-[1vw]"
                        placeholder="Ketik ulasan kamu disini"
                        style={{ resize: "none" }}
                    />
                    <GoalsButton onClick={setShow}>Simpan</GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};
