import GoalsButton from "@/Components/elements/GoalsButton";
import useScrollBlock from "@/Hooks/useScrollBlock";
import MainLayout from "@/Layouts/MainLayout";
import "@/script/momentCustomLocale";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { RxFileText } from "react-icons/rx";
import DetailBanyakPertemuan from "./DetailBanyakPertemuan";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import { detailData as dataBimbingan } from "./data";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { useMediaQuery } from "react-responsive";

export default function DetailPesanan({ auth, courseDetail }) {
    // console.log(courseDetail[0].time);
    // const data = courseDetail[0];

    // const {
    //     data: reviewData,
    //     setData: setReviewData,
    //     post,
    // } = useForm({
    //     review: data.review,
    //     rate: data.rate,
    // });

    // const { data: tempReviewData, setData: setTempReviewData } = useForm({
    //     review: data.review,
    //     rate: data.rate,
    // });

    const data = {
        status: "Selesai",
    };

    const [showPopUp, setShowPopUp] = useState({
        ulasanTutor: false,
        ulasanProgram: false,
        selesaiProgram: false,
    });

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <MainLayout auth={auth} title="Detail Pembelajaran">
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

                    <div className="hidden md:block space-x-[.5vw]">
                        <GoalsButton
                            variant="bordered"
                            onClick={(prev) =>
                                setShowPopUp({
                                    ...prev,
                                    ulasanTutor: true,
                                })
                            }
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
                        >
                            Selesaikan Pembelajaran
                        </GoalsButton>
                    </div>
                </div>

                <DetailSatuPertemuan data={dataBimbingan[0].detail} />
                <DetailBanyakPertemuan data={dataBimbingan} />
            </div>
        </MainLayout>
    );
}

const SelesaiProgram = ({ show, setShow }) => {
    return (
        <GoalsPopup show={show} setShow={setShow} className="max-w-[23.5vw]">
            <div className="flex flex-col items-center gap-[2vw]">
                <h3 className="h4 font-semibold">Selesaikan Bimbingan</h3>

                <p className="text-[1vw] text-black text-center">
                    Apakah kamu ingin menyelesaikan bimbingan?
                </p>

                <div className="grid space-y-[.8vw] w-full">
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
            className="max-w-[23.5vw]"
            isBgClickDisabled
        >
            <div className="flex flex-col items-center gap-[2vw]">
                <h3 className="h4 font-semibold">Beri Ulasan Tutor</h3>

                <p className="text-[1vw] text-black text-center">
                    Bagaimana kepuasan kamu setelah
                    <br />
                    melakukan bimbingan bersama tutor?
                </p>

                <div className="grid space-y-[.8vw] w-full">
                    <textarea
                        placeholder="Ketik ulasan kamu disini"
                        className="h-[8.3vw] px-[.8vw] rounded-md border border-neutral-50 focus:outline-0 text-dark py-[.5vw]"
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
            className="max-w-[23.5vw]"
            isBgClickDisabled
        >
            <div className="flex flex-col items-center gap-[2vw]">
                <h3 className="h4 font-semibold">Beri Ulasan Program</h3>

                <p className="text-[1vw] text-black text-center">
                    Bagaimana perasaan kamu setelah <br />
                    melakukan bimbingan?
                </p>

                <div className="grid space-y-[.8vw] w-full">
                    <textarea
                        className="h-[8.3vw] px-[.8vw] rounded-md border border-neutral-50 focus:outline-0 text-dark py-[.5vw]"
                        placeholder="Ketik ulasan kamu disini"
                        style={{ resize: "none" }}
                    />
                    <GoalsButton onClick={setShow}>Simpan</GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};
