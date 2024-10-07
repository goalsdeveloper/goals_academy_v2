import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import MainLayout from "@/Layouts/MainLayout";
import "@/script/momentCustomLocale";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import GoalsBadge from "@/Components/elements/GoalsBadge";

// import { detailData as dataBimbingan } from "./data";
import { createPortal } from "react-dom";
import DetailBanyakPertemuan, {
    AturJadwalPopup,
} from "./layouts/DetailBanyakPertemuan";
import DetailSatuPertemuan from "./layouts/DetailSatuPertemuan";
import toast from "react-hot-toast";

export default function DetailPesanan({
    auth,
    courseDetail: dataBimbingan,
    cities,
    date,
    topics,
}) {
    const [showPopUp, setShowPopUp] = useState({
        ulasanTutor: false,
        ulasanProgram: false,
        selesaiProgram: false,
        aturJadwalPopup: false,
    });

    const {
        data: dataRating,
        setData: setDataRating,
        post,
    } = useForm({
        rate_tutor: 0,
        rate_product: 0,
        note_product: "",
        note_tutor: "",
    });

    const statusObject = [
        {
            text: "Menunggu",
            desc: "Bimbingan masih dalam proses konfirmasi, untuk info lebih lanjut bisa menghubungi admin"
        },
        {
            text: "Berjalan",
            desc: "Bimbingan anda sedang berjalan, jika ada kendala selama bimbingan silakan hubungi admin"
        }
    ]
    const isWaiting = dataBimbingan.map(i => i.ongoing).includes('menunggu');
    const isOngoing = dataBimbingan.map(i => i.ongoing).includes('berjalan');
    const isFinished = dataBimbingan.map(i => i.ongoing).every(i => i == 'selesai');

    function handleSubmit() {
        post(`/bimbingan/${dataBimbingan[0].order.order_code}/review`, {
            onSuccess: () => {
                toast.success("Ulasan berhasil disimpan");
            },
            onError: () => {
                toast.error("Ulasan gagal disimpan");
            },
        });
    }

    const dataAturJadwalComp = { cities, date, topics };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    return (
        <MainLayout
            withFooter={false}
            auth={auth}
            title="Detail Pembelajaran"
            className="pb-[16vw] md:pb-0"
        >
            <div className="container mx-auto md:space-y-[2.5vw] text-secondary mb-[5.2vw]">
                {createPortal(
                    <>
                        <SelesaiProgram
                            show={showPopUp.selesaiProgram}
                            order_code={dataBimbingan[0].order.order_code}
                            setShow={() =>
                                setShowPopUp({
                                    selesaiProgram: false,
                                })
                            }
                        />
                        <UlasanTutor
                            data={dataRating}
                            setData={setDataRating}
                            show={showPopUp.ulasanTutor}
                            setShow={() =>
                                setShowPopUp({
                                    ulasanTutor: false,
                                    ulasanProgram: true,
                                })
                            }
                        />
                        <UlasanProgram
                            data={dataRating}
                            setData={setDataRating}
                            handleSubmit={handleSubmit}
                            show={showPopUp.ulasanProgram}
                            setShow={() =>
                                setShowPopUp({
                                    ulasanProgram: false,
                                })
                            }
                        />
                        <AturJadwalPopup
                            order_code={dataBimbingan[0].order.order_code}
                            purchased_date={dataBimbingan[0].order.created_at}
                            active_period={Number(dataBimbingan[0].products.active_period) - 1}
                            {...dataAturJadwalComp}
                            show={showPopUp.aturJadwalPopup}
                            setShow={() =>
                                setShowPopUp({
                                    AturJadwalPopup: false,
                                })
                            }
                        />
                    </>,
                    document.body
                )}

                {/* Header */}
                <Link
                    href="/bimbingan"
                    className="text-secondary hidden md:flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>

                <div className="flex items-center justify-between">
                    {/* Header */}
                    {isMobile ? (
                        <>
                            <Link
                                href="/bimbingan"
                                className="w-full flex items-center gap-[1.5vw] text-black"
                            >
                                <FiChevronLeft className="md:hidden text-[4vw]" />
                                <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                                    Detail Pembelajaran
                                </h1>
                            </Link>
                            {isWaiting ? (
                                <StatusBadge {...statusObject[0]} />
                            ) : isOngoing ? (
                                <StatusBadge {...statusObject[1]} />
                            ) : <></>}
                        </>
                    ) : (
                        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                            Detail Pembelajaran
                        </h1>
                    )}

                    {/* Action Button */}
                    {isMobile &&
                    !!dataBimbingan.find((item) => item.date == null) &&
                    dataBimbingan.length > 1 ? (
                        <div
                            className={`
                    fixed md:relative w-full md:w-auto bottom-0 left-0 flex gap-[1vw] md:gap-[.5vw] justify-center items-center pb-[3.7vw] pt-[3.4vw] bg-white md:p-0 z-[40] md:z-0 px-[6vw]`}
                        >
                            <GoalsButton
                                variant="info"
                                onClick={() =>
                                    setShowPopUp({ aturJadwalPopup: true })
                                }
                                className="w-full whitespace-nowrap "
                            >
                                Atur jadwal sesi berikutnya
                            </GoalsButton>
                        </div>
                    ) : (
                        <div
                            className={`
                    fixed md:relative w-full md:w-auto bottom-0 left-0 flex gap-[1vw] md:gap-[.5vw] justify-center items-center pb-[3.7vw] pt-[3.4vw] bg-white md:p-0 z-[40] md:z-0 px-[6vw]`}
                        >
                            <GoalsButton
                                disabled={
                                    (dataBimbingan.length > 1 &&
                                        !!dataBimbingan.find(
                                            (item) => item.date == null
                                        )) ||
                                    dataBimbingan[0].ongoing != "selesai" ||
                                    dataBimbingan[0].product_review != null
                                }
                                variant="bordered"
                                onClick={() =>
                                    setShowPopUp({
                                        ulasanTutor: true,
                                    })
                                }
                                className="w-full scale-y-95 whitespace-nowrap"
                            >
                                Beri Ulasan
                            </GoalsButton>
                            <GoalsButton
                                disabled={
                                    (dataBimbingan.length > 1 &&
                                        !!dataBimbingan.find(
                                            (item) => item.date == null
                                        )) ||
                                    // dataBimbingan[0].ongoing != "berjalan"
                                    dataBimbingan[0].is_user
                                }
                                onClick={() =>
                                    setShowPopUp({
                                        selesaiProgram: true,
                                    })
                                }
                                className="w-full whitespace-nowrap "
                            >
                                Selesaikan
                            </GoalsButton>
                        </div>
                    )}
                </div>

                {/* Detail */}
                {dataBimbingan.length > 1 ? (
                    <DetailBanyakPertemuan
                        data={dataBimbingan}
                        setIsAturJadwalShow={(prev) => {
                            setShowPopUp({
                                ...prev,
                                aturJadwalPopup: !prev,
                            });
                        }}
                    />
                ) : (
                    <DetailSatuPertemuan data={dataBimbingan[0]} />
                )}
            </div>
        </MainLayout>
    );
}

const SelesaiProgram = ({ show, setShow, order_code }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="h-fit md:max-w-[23.5vw]"
            header="Selesaikan Bimbingan"
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Apakah kamu ingin menyelesaikan bimbingan?
                </p>

                <div className="grid space-y-[2vw] md:space-y-[.8vw] w-full">
                    <GoalsButton
                        onClick={() => {
                            setShow();
                            router.put(
                                `/bimbingan/${order_code}/selesai-bimbingan`,
                                {},
                                {
                                    onSuccess: () => {
                                        toast.success("Bimbingan selesai");
                                    },
                                }
                            );
                        }}
                        className="w-full"
                    >
                        Selesaikan
                    </GoalsButton>
                    <GoalsButton
                        variant="bordered"
                        onClick={() => setShow()}
                        className="w-full"
                    >
                        Kembali
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

const UlasanTutor = ({ show, setShow, data, setData }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="md:max-w-[23.5vw]"
            header="Beri Ulasan Tutor"
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Bagaimana kepuasan kamu setelah
                    <br />
                    melakukan bimbingan bersama tutor?
                </p>

                <div className="grid space-y-[7.4vw] md:space-y-[.8vw] w-full">
                    <StarRating
                        totalStars={5}
                        rating={data.rate_tutor}
                        setRating={(x) => setData({ ...data, rate_tutor: x })}
                    />
                    <textarea
                        placeholder="Ketik ulasan kamu disini"
                        className="h-[37vw] md:h-[8.3vw] px-[4vw] py-[2.5vw] md:px-[.8vw] md:py-[.5vw]  rounded-md border border-neutral-50 focus:outline-0 text-dark text-[4.6vw] md:text-[1vw]"
                        style={{ resize: "none" }}
                        value={data.note_tutor}
                        onChange={(e) => setData("note_tutor", e.target.value)}
                    />
                    <GoalsButton onClick={setShow} className="w-full">
                        Lanjutkan Ulasan
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

const UlasanProgram = ({ show, setShow, data, setData, handleSubmit }) => {
    function checkFieldRequired() {
        if (
            data.rate_product == 0
        ) {
            return true;
        }

        return false;
    }

    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="md:max-w-[23.5vw]"
            header="Beri Ulasan Program"
        >
            <div className="flex flex-col items-center gap-[4vw] md:gap-[2vw]">
                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Bagaimana perasaan kamu setelah <br />
                    melakukan bimbingan?
                </p>

                <div className="grid space-y-[4vw] md:space-y-[.8vw] w-full">
                    <StarRating
                        totalStars={5}
                        rating={data.rate_product}
                        setRating={(x) => setData({ ...data, rate_product: x })}
                    />
                    <textarea
                        className="h-[37vw] md:h-[8.3vw] px-[4vw] py-[2.5vw] md:px-[.8vw] md:py-[.5vw]  rounded-md border border-neutral-50 focus:outline-0 text-dark text-[4.6vw] md:text-[1vw]"
                        placeholder="Ketik ulasan kamu disini"
                        style={{ resize: "none" }}
                        value={data.note_product}
                        onChange={(e) =>
                            setData("note_product", e.target.value)
                        }
                    />
                    <GoalsButton
                        disabled={checkFieldRequired()}
                        onClick={() => {
                            handleSubmit();
                            setShow();
                        }}
                        className="w-full"
                    >
                        Simpan
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

const StarRating = ({ totalStars, rating, setRating }) => {
    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    return (
        <div className="w-full text-center">
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className="leading-none text-[10vw] md:text-[3.5vw] cursor-pointer"
                    style={{
                        color: index < rating ? "gold" : "gray",
                    }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

function StatusBadge ({ text, desc }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <GoalsBadge
                title={<span className="flex items-center gap-[2vw] text-[3.7vw]">{text} <div className="flex items-center justify-center text-blue-500 border-1 border-blue-500 rounded-full text-[3vw] md:text-[.83vw] h-[4vw] w-[4vw] md:w-[1vw] md:h-[1vw]">!</div></span>}
                className="text-blue-500 bg-blue-100 cursor-pointer"
                onClick={() => setShow(true)}
            />
            {createPortal(<StatusBadgeDescription {...{show, setShow, desc}} />, document.body)}
        </div>
    )
}

const StatusBadgeDescription = ({ show, setShow, desc }) => {
    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="h-fit md:max-w-[23.5vw]"
            header="Informasi Bimbingan"
        >
            <div className="flex flex-col items-center gap-[7.4vw] md:gap-[2vw]">
                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    {desc}
                </p>

                <div className="grid space-y-[2vw] md:space-y-[.8vw] w-full">
                    <GoalsButton
                        onClick={() => open(`https://api.whatsapp.com/send?phone=6282147638286`, '_blank')}
                        className="w-full"
                    >
                        Hubungi Admin
                    </GoalsButton>
                    <GoalsButton
                        variant="bordered"
                        onClick={() => setShow(false)}
                        className="w-full"
                    >
                        Kembali
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};